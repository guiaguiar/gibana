"use client";

import { useEffect } from "react";

export default function StripePricingTable() {
  const pricingTableId = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID || "";
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

  useEffect(() => {
    // Load Stripe.js script for pricing table
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!pricingTableId || !publishableKey) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <p className="text-yellow-800">
          Por favor, configure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY e NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID no arquivo .env.local
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-8">
      {/* @ts-ignore - Stripe Pricing Table web component */}
      <stripe-pricing-table
        pricing-table-id={pricingTableId}
        publishable-key={publishableKey}
      />
    </div>
  );
}

