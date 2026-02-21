"use server";

import Stripe from "stripe";

// Initialize Stripe with secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

export interface StripeProduct {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  default_price: string | null;
  price_amount: number | null;
  price_currency: string | null;
  price_interval: string | null;
  metadata: Record<string, string>;
}

export interface StripePrice {
  id: string;
  unit_amount: number | null;
  currency: string;
  recurring: {
    interval: string;
    interval_count: number;
  } | null;
}

/**
 * Server action to fetch all active products from Stripe
 * @returns Array of products with their prices
 */
export async function getStripeProducts(): Promise<StripeProduct[]> {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
    }

    // Fetch all active products
    const products = await stripe.products.list({
      active: true,
      expand: ["data.default_price"],
    });

    // Transform Stripe products to our format
    const formattedProducts: StripeProduct[] = await Promise.all(
      products.data.map(async (product) => {
        const priceId =
          typeof product.default_price === "string"
            ? product.default_price
            : product.default_price?.id || null;

        let price_amount: number | null = null;
        let price_currency: string | null = null;
        let price_interval: string | null = null;

        if (priceId) {
          try {
            const price = await stripe.prices.retrieve(priceId);
            price_amount = price.unit_amount;
            price_currency = price.currency;
            price_interval = price.recurring?.interval || null;
          } catch (error) {
            console.error(`Failed to fetch price ${priceId}:`, error);
          }
        }

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          images: product.images,
          default_price: priceId,
          price_amount,
          price_currency,
          price_interval,
          metadata: product.metadata,
        };
      })
    );

    return formattedProducts;
  } catch (error) {
    console.error("Error fetching Stripe products:", error);
    throw new Error("Failed to fetch products from Stripe");
  }
}

/**
 * Server action to fetch a specific product by ID
 * @param productId - The Stripe product ID
 * @returns Product details with price information
 */
export async function getStripeProduct(
  productId: string
): Promise<StripeProduct | null> {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
    }

    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });

    const priceId =
      typeof product.default_price === "string"
        ? product.default_price
        : product.default_price?.id || null;

    let price_amount: number | null = null;
    let price_currency: string | null = null;
    let price_interval: string | null = null;

    if (priceId) {
      try {
        const price = await stripe.prices.retrieve(priceId);
        price_amount = price.unit_amount;
        price_currency = price.currency;
        price_interval = price.recurring?.interval || null;
      } catch (error) {
        console.error(`Failed to fetch price ${priceId}:`, error);
      }
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      default_price: priceId,
      price_amount,
      price_currency,
      price_interval,
      metadata: product.metadata,
    };
  } catch (error) {
    console.error("Error fetching Stripe product:", error);
    return null;
  }
}

/**
 * Server action to fetch price details
 * @param priceId - The Stripe price ID
 * @returns Price information
 */
export async function getStripePrice(
  priceId: string
): Promise<StripePrice | null> {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
    }

    const price = await stripe.prices.retrieve(priceId);

    return {
      id: price.id,
      unit_amount: price.unit_amount,
      currency: price.currency,
      recurring: price.recurring
        ? {
            interval: price.recurring.interval,
            interval_count: price.recurring.interval_count,
          }
        : null,
    };
  } catch (error) {
    console.error("Error fetching Stripe price:", error);
    return null;
  }
}

/**
 * Server action to create a Stripe Checkout session
 * @param priceId - The Stripe price ID
 * @param customerId - Optional Stripe customer ID (if user is logged in)
 * @returns Checkout session URL
 */
export async function createCheckoutSession(
  priceId: string,
  customerId?: string | null
): Promise<{ url: string | null; error: string | null }> {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Fetch price to determine if it's recurring or one-time
    const price = await stripe.prices.retrieve(priceId);
    const isRecurring = !!price.recurring;
    const mode: "subscription" | "payment" = isRecurring
      ? "subscription"
      : "payment";

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      // ✅ Force full billing address + name collection
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["BR"],
      },
      success_url: `${baseUrl}/minha-conta?success=true`,
      cancel_url: `${baseUrl}?canceled=true`,
      locale: "pt-BR",
    };

    // Associate session with existing Stripe customer (if provided)
    if (customerId) {
      sessionParams.customer = customerId;

      // Automatically update customer address with collected data
      sessionParams.customer_update = {
        address: "auto",
        name: "auto",
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      url: session.url,
      error: null,
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      url: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create checkout session",
    };
  }
}

/**
 * Server action to handle subscription management via Stripe Customer Portal
 * Uses email lookup to find customer in Stripe (Stripe is the source of truth)
 * @param email - User's email address
 * @returns Portal session URL or error message
 */
export async function handleManageSubscription(
  email: string
): Promise<{ url: string | null; error: string | null }> {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Validate email format
    if (!email || !email.includes("@")) {
      return {
        url: null,
        error: "Por favor, insira um email válido.",
      };
    }

    // Search for customer by email (Stripe is our only database)
    const customers = await stripe.customers.list({
      email: email.trim().toLowerCase(),
      limit: 1,
    });

    if (customers.data.length === 0) {
      return {
        url: null,
        error:
          "Nenhum cliente encontrado. Você precisa ter uma assinatura ativa para gerenciar sua conta. Por favor, assine primeiro!",
      };
    }

    const customer = customers.data[0];

    // Create billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${baseUrl}/minha-conta`,
    });

    return {
      url: portalSession.url,
      error: null,
    };
  } catch (error) {
    console.error("Error creating billing portal session:", error);
    return {
      url: null,
      error:
        error instanceof Error
          ? error.message
          : "Falha ao criar sessão do portal. Tente novamente.",
    };
  }
}
