"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import background from "@/public/background.jpg";
import logo from "@/public/logo.png";
import SubscriptionCard from "@/app/components/SubscriptionCard";
import { getStripeProducts, type StripeProduct } from "@/app/actions/stripe";
import ExplanationCard from "./components/ExplanationCard";

export default function Home() {
  const [stripeProducts, setStripeProducts] = useState<StripeProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Fetch Stripe products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getStripeProducts();
        console.log("📦 Stripe Products fetched:", products);
        console.log("📦 Number of products:", products.length);
        setStripeProducts(products);
      } catch (error) {
        console.error("Failed to fetch Stripe products:", error);
      } finally {
        setProductsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Get first 2 "single" products and the "multi" product as the last card
  const singleProducts = stripeProducts.filter(
    (p) => p.metadata.type === "single"
  );
  const multiProduct = stripeProducts.find((p) => p.metadata.type === "multi");

  const displayedProducts = [
    ...singleProducts.slice(0, 2),
    ...(multiProduct ? [multiProduct] : []),
  ].slice(0, 3);

  return (
    <div className="h-full">
      <div className="w-full h-[646px] relative">
        <div className="absolute top-8 left-0 right-0 z-30 max-w-7xl mx-auto px-4">
          <Link
            href="/minha-conta"
            className="inline-flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Minha conta"
          >
            <Icon
              icon="mdi:account"
              width={32}
              height={32}
              className="text-[#99623B]"
            />
          </Link>
        </div>

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
          <span className="font-sans font-normal text-[52px] leading-[1.2] tracking-normal text-center text-[#99623B]">
            Algo feito à mão para
            <br />
            você esperar todo mês
          </span>
          <span className="font-normal text-[32px]">Com carinho, gibana.</span>
        </div>
      </div>

      <div className="px-4 py-[100px] items-center bg-white">
        <div className="flex w-full items-center justify-center pb-18">
          <span className="text-2xl font-semibold text-center text-[40px] text-[#99623B]">
            Assinaturas
          </span>
        </div>
        {productsLoading ? (
          <div className="flex justify-center">
            <span>Carregando...</span>
          </div>
        ) : (
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
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex w-full items-center justify-center pt-24">
          <span className="font-thin text-center md:text-[40px] text-[24px]">
            Próxima data de envio:
            <br className="md:hidden" />
            <span className="font-medium text-[#99623B] md:text-[46px] text-[24px]">
              15 de Fevereiro
            </span>
          </span>
        </div>
      </div>

      <ExplanationCard />
    </div>
  );
}
