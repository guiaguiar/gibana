import { getStripeProducts } from "@/app/actions/stripe";
import ExplanationCard from "./components/ExplanationCard";
import SubscriptionCardsSection from "./components/SubscriptionCardsSection";
import PresentationSection from "./components/PresentationSection";
import Hero from "./components/Hero";

// Enable ISR: revalidate every hour (3600 seconds)
// This allows Stripe data changes to be picked up without rebuilding the app
export const revalidate = 3600;

export default async function Home() {
  // Fetch products server-side
  const stripeProducts = await getStripeProducts();

  return (
    <div className="h-full">
      <Hero />

      <SubscriptionCardsSection products={stripeProducts} />

      <ExplanationCard />

      <PresentationSection />
    </div>
  );
}
