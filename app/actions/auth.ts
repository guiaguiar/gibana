"use server";

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import Stripe from "stripe";
import { getUserByEmail, createUser, type User } from "@/app/lib/users";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

const COOKIE_NAME = "gibana-session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

export interface AuthResult {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
    stripeCustomerId: string | null;
  };
}

/**
 * Create a JWT token for the user session
 */
async function createSession(userId: string, email: string): Promise<string> {
  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(secretKey);

  return token;
}

/**
 * Verify and decode the session token
 */
async function verifySession(token: string): Promise<{
  userId: string;
  email: string;
} | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Server action to sign up a new user
 * Creates a Stripe customer and stores user data
 */
export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<AuthResult> {
  try {
    // Validate input
    if (!email || !password || !name) {
      return {
        success: false,
        message: "Todos os campos são obrigatórios",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "A senha deve ter pelo menos 6 caracteres",
      };
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        success: false,
        message: "Este email já está cadastrado",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Stripe customer
    let stripeCustomerId: string | null = null;
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          source: "gibana-web",
        },
      });
      stripeCustomerId = customer.id;
    } catch (stripeError) {
      console.error("Error creating Stripe customer:", stripeError);
      // Continue with user creation even if Stripe fails
      // You might want to handle this differently based on your requirements
    }

    // Create user
    const user = await createUser({
      email,
      password: hashedPassword,
      name,
      stripeCustomerId,
    });

    // Create session
    const token = await createSession(user.id, user.email);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION,
      path: "/",
    });

    return {
      success: true,
      message: "Conta criada com sucesso!",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        stripeCustomerId: user.stripeCustomerId,
      },
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      success: false,
      message: "Erro ao criar conta. Tente novamente.",
    };
  }
}

/**
 * Server action to log in a user
 */
export async function signIn(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    // Validate input
    if (!email || !password) {
      return {
        success: false,
        message: "Email e senha são obrigatórios",
      };
    }

    // Get user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return {
        success: false,
        message: "Email ou senha incorretos",
      };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        success: false,
        message: "Email ou senha incorretos",
      };
    }

    // Create session
    const token = await createSession(user.id, user.email);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION,
      path: "/",
    });

    return {
      success: true,
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        stripeCustomerId: user.stripeCustomerId,
      },
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      success: false,
      message: "Erro ao fazer login. Tente novamente.",
    };
  }
}

/**
 * Server action to log out a user
 */
export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Server action to get the current authenticated user
 */
export async function getCurrentUser(): Promise<{
  id: string;
  email: string;
  name: string;
  stripeCustomerId: string | null;
} | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const session = await verifySession(token);
    if (!session) {
      return null;
    }

    const user = await getUserByEmail(session.email);
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      stripeCustomerId: user.stripeCustomerId,
    };
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

