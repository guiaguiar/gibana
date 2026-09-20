import { getStripeProducts } from "@/app/actions/stripe";
import ExplanationCard from "./components/ExplanationCard";
import SubscriptionShowcase from "./components/SubscriptionShowcase";
import PresentationSection from "./components/PresentationSection";
import Hero from "./components/Hero";

export const revalidate = 3600;

export default async function Home() {
  const stripeProducts = await getStripeProducts();
  const subscriptionProduct = stripeProducts.find(
    (p) => p.metadata.type === "single",
  );

  return (
    <div className="h-full">
      <Hero />

      {subscriptionProduct && (
        <SubscriptionShowcase product={subscriptionProduct} />
      )}

      <ExplanationCard />

      <PresentationSection />
    </div>
  );
}
