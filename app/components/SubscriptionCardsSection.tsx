"use client";

import SubscriptionCard from "@/app/components/SubscriptionCard";
import { type StripeProduct } from "@/app/actions/stripe";

interface SubscriptionCardsSectionProps {
  products: StripeProduct[];
}

export default function SubscriptionCardsSection({
  products,
}: SubscriptionCardsSectionProps) {
  // Get first 2 "single" products and the "multi" product as the last card
  const singleProducts = products.filter((p) => p.metadata.type === "single");
  const multiProduct = products.find((p) => p.metadata.type === "multi");

  const displayedProducts = [
    ...singleProducts.slice(0, 2),
    ...(multiProduct ? [multiProduct] : []),
  ].slice(0, 3);

  return (
    <div className="px-4 md:py-[100px] py-[50px] items-center bg-white">
      <div className="flex w-full items-center justify-center md:pb-18">
        <span className="text-2xl font-semibold text-center text-[40px] text-[#99623B]">
          Assinaturas
        </span>
      </div>
      <div className="flex w-full items-center justify-center flex-col pt-2 pb-6 md:hidden">
        <span className="font-thin text-center text-[24px]">
          Próxima data de envio:
        </span>
        <span className="font-medium text-[#99623B] text-[24px]">
          15 de Fevereiro
        </span>
      </div>
      <div className="flex flex-col min-[1070px]:flex-row gap-8 min-[1070px]:gap-4 max-w-7xl mx-auto items-center justify-center md:justify-between">
        {displayedProducts.map((product) => (
          <div key={product.id} className="w-full max-w-[416px] flex-1">
            <SubscriptionCard
              image={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : null
              }
              title={product.metadata.title || product.name}
              description={product.description || ""}
              price={product.price_amount ? product.price_amount / 100 : 0}
              kitInfo={product.metadata.kitInfo || ""}
              priceId={product.default_price}
            />
          </div>
        ))}
      </div>
      <div className="hidden md:flex w-full items-center justify-center pt-24">
        <span className="font-thin text-center text-[40px]">
          Próxima data de envio:{" "}
          <span className="font-medium text-[#99623B] text-[46px]">
            15 de Fevereiro
          </span>
        </span>
      </div>
    </div>
  );
}
