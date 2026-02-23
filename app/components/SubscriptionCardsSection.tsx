"use client";

import { useEffect, useRef, useState } from "react";
import SubscriptionCard from "@/app/components/SubscriptionCard";
import { type StripeProduct } from "@/app/actions/stripe";

interface SubscriptionCardsSectionProps {
  products: StripeProduct[];
}

export default function SubscriptionCardsSection({
  products,
}: SubscriptionCardsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const singleProducts = products.filter((p) => p.metadata.type === "single");
  const multiProduct = products.find((p) => p.metadata.type === "multi");

  const displayedProducts = [
    ...singleProducts.slice(0, 2),
    ...(multiProduct ? [multiProduct] : []),
  ].slice(0, 3);

  return (
    <div className="px-4 md:py-[100px] py-[50px] bg-white">
      <div ref={contentRef} className="max-w-7xl mx-auto">
        {/* Title */}
        <div
          className={`flex w-full items-center justify-center md:pb-18 transition-all duration-1000 ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
        >
          <span className="text-2xl font-semibold text-center text-[40px] text-[#99623B]">
            Assinaturas
          </span>
        </div>

        {/* Mobile Shipping Date */}
        <div
          className={`flex w-full items-center justify-center flex-col pt-2 pb-6 md:hidden transition-all duration-1000 ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          style={{ transitionDelay: "150ms" }}
        >
          <span className="font-thin text-center text-[24px]">
            Próxima data de envio:
          </span>
          <span className="font-medium text-[#99623B] text-[24px]">
            15 de Fevereiro
          </span>
        </div>

        {/* Cards */}
        <div className="flex flex-col min-[1070px]:flex-row gap-8 min-[1070px]:gap-4 items-center justify-center md:justify-between">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className={`w-full max-w-[416px] flex-1 transition-all duration-1000 ease-out
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
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

        {/* Desktop Shipping Date */}
        <div
          className={`hidden md:flex w-full items-center justify-center pt-24 transition-all duration-1000 ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          style={{ transitionDelay: "800ms" }}
        >
          <span className="font-thin text-center text-[40px]">
            Próxima data de envio:{" "}
            <span className="font-medium text-[#99623B] text-[46px]">
              15 de Fevereiro
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
