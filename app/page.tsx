import { getStripeProducts } from "@/app/actions/stripe";
import ExplanationCard from "./components/ExplanationCard";
import SubscriptionCardsSection from "./components/SubscriptionCardsSection";
import PresentationSection from "./components/PresentationSection";
import Hero from "./components/Hero";

export const revalidate = 3600;

export default async function Home() {
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
