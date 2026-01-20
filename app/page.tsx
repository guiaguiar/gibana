import Image from "next/image";
import background from "@/public/background.jpg";
import logo from "@/public/logo.png";
import { getStripeProducts } from "@/app/actions/stripe";
import ExplanationCard from "./components/ExplanationCard";
import UserIcon from "./components/UserIcon";
import SubscriptionCardsSection from "./components/SubscriptionCardsSection";

export default async function Home() {
  // Fetch products server-side
  const stripeProducts = await getStripeProducts();
  console.log("📦 Stripe Products fetched:", stripeProducts);
  console.log("📦 Number of products:", stripeProducts.length);

  return (
    <div className="h-full">
      <div className="w-full h-screen md:h-[646px] relative">
        <UserIcon />

        <Image
          src={background}
          alt="background"
          fill
          className="object-cover"
        />

        <Image
          src={logo}
          alt="logo"
          className="absolute z-10 top-8 left-1/2 -translate-x-1/2"
          width={100}
          height={100}
        />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <span className="font-distrampler font-normal md:text-[52px] text-[32px] leading-[1.2] tracking-normal text-center text-[#99623B]">
            Algo feito à mão para
            <br />
            você esperar todo mês
          </span>
          <span
            className="font-normal text-[32px]"
            style={{ fontFamily: "var(--font-annie), sans-serif" }}
          >
            Com carinho, gibana.
          </span>
        </div>
      </div>

      <SubscriptionCardsSection products={stripeProducts} />

      <ExplanationCard />
    </div>
  );
}
