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
