import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export interface User {
  id: string;
  email: string;
  password: string; // hashed
  name: string;
  stripeCustomerId: string | null;
  createdAt: string;
}

// Use /tmp in serverless environments (Vercel), otherwise use project data directory
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const DATA_DIR = isServerless ? "/tmp/data" : join(process.cwd(), "data");
const USERS_FILE = join(DATA_DIR, "users.json");

/**
 * Ensure data directory exists
 */
async function ensureDataDir(): Promise<void> {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

/**
 * Read users from file
 */
async function readUsers(): Promise<User[]> {
  await ensureDataDir();
  try {
    if (!existsSync(USERS_FILE)) {
      return [];
    }
    const content = await readFile(USERS_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
}

/**
 * Write users to file
 */
async function writeUsers(users: User[]): Promise<void> {
  await ensureDataDir();
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readUsers();
  return (
    users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
  );
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  const users = await readUsers();
  return users.find((u) => u.id === id) || null;
}

/**
 * Create a new user
 */
export async function createUser(
  userData: Omit<User, "id" | "createdAt">
): Promise<User> {
  const users = await readUsers();

  // Check if user already exists
  const existing = users.find(
    (u) => u.email.toLowerCase() === userData.email.toLowerCase()
  );
  if (existing) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    ...userData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  return newUser;
}

/**
 * Update user
 */
export async function updateUser(
  id: string,
  updates: Partial<Omit<User, "id" | "createdAt">>
): Promise<User | null> {
  const users = await readUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return null;
  }

  users[index] = { ...users[index], ...updates };
  await writeUsers(users);

  return users[index];
}
