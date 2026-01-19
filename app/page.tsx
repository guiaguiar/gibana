"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import background1 from "@/public/background-1.jpg";
import background2 from "@/public/background-2.jpg";
import background3 from "@/public/background-3.jpg";
import ImageCard from "@/app/components/ImageCard";
import ExplanationCard from "@/app/components/ExplanationCard";
import TypewriterText from "@/app/components/TypewriterText";
import IconButton from "@/app/components/IconButton";
import {
  getStripeProducts,
  getStripePrice,
  createCheckoutSession,
  type StripeProduct,
} from "@/app/actions/stripe";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [firstTextComplete, setFirstTextComplete] = useState(false);
  const [secondTextComplete, setSecondTextComplete] = useState(false);
  const [showFirstCard, setShowFirstCard] = useState(false);
  const [showSecondCard, setShowSecondCard] = useState(false);
  const [showDateSection, setShowDateSection] = useState(false);
  const [showThirdCard, setShowThirdCard] = useState(false);
  const [showExplanationCard, setShowExplanationCard] = useState(false);
  const [stripeProducts, setStripeProducts] = useState<StripeProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const isTypingComplete = firstTextComplete && secondTextComplete;

  // Disable scrolling during typing animation
  useEffect(() => {
    if (!isTypingComplete) {
      // Disable scrolling while typing
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when typing is complete
      document.body.style.overflow = "";
    }

    // Cleanup: re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isTypingComplete]);

  // Fetch Stripe products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getStripeProducts();
        console.log("📦 Stripe Products fetched:", products);
        console.log("📦 Number of products:", products.length);
        products.forEach((product, index) => {
          console.log(`\n📦 Product ${index + 1}:`, {
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images,
            price_amount: product.price_amount,
            price_currency: product.price_currency,
            price_interval: product.price_interval,
            metadata: product.metadata,
          });
        });
        setStripeProducts(products);
      } catch (error) {
        console.error("Failed to fetch Stripe products:", error);
        // Continue with hardcoded products if Stripe fetch fails
      } finally {
        setProductsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleCheckout = async (product: StripeProduct) => {
    if (!product.default_price) {
      alert("Produto sem preço configurado");
      return;
    }

    try {
      // No customer ID needed - Stripe will handle customer creation during checkout
      const result = await createCheckoutSession(product.default_price, null);

      if (result.error) {
        alert(`Erro: ${result.error}`);
        return;
      }

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      alert("Erro ao processar checkout. Tente novamente.");
    }
  };

  // Helper function to format price from product
  const formatPrice = (product: StripeProduct): string => {
    if (!product.price_amount) return "";
    const amount = product.price_amount / 100; // Convert from cents
    if (product.price_interval === "month") {
      return `Assinar por R$${amount.toFixed(2)}/mês`;
    } else {
      // One-time payment
      return `Comprar por R$${amount.toFixed(2)}`;
    }
  };

  // Filter products by type
  const singleProducts = stripeProducts.filter(
    (p) => p.metadata.type === "single"
  );
  const multiProduct = stripeProducts.find((p) => p.metadata.type === "multi");

  // Helper to extract short text from product name (e.g., "FILLER" from "Filer Print Club")
  const getShortText = (name: string): string => {
    // Remove common suffixes like "(PRÉ-VENDA)"
    const cleanName = name.replace(/\s*\([^)]*\)\s*/g, "").trim();
    // Extract first word or key word
    if (cleanName.toLowerCase().includes("filler")) return "FILLER";
    if (cleanName.toLowerCase().includes("subtext")) return "SUBTEXT";
    // Fallback: use first word in uppercase
    return cleanName.split(" ")[0].toUpperCase();
  };

  useEffect(() => {
    if (isTypingComplete) {
      // First card appears after 300ms
      const timer1 = setTimeout(() => setShowFirstCard(true), 300);
      // Second card appears after 600ms
      const timer2 = setTimeout(() => setShowSecondCard(true), 600);
      // Date section appears after 900ms
      const timer3 = setTimeout(() => setShowDateSection(true), 900);
      // Third card appears after 1200ms
      const timer4 = setTimeout(() => setShowThirdCard(true), 1200);
      // Explanation card appears after 1500ms
      const timer5 = setTimeout(() => setShowExplanationCard(true), 1500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }
  }, [isTypingComplete]);

  return (
    <div className="px-8">
      <div className="flex items-center justify-between pb-10 pt-4">
        <IconButton
          icon="solar:user-broken"
          aria-label="Gerenciar assinatura"
          onClick={() => router.push("/minha-conta")}
        />
        <Image src={logo} alt="logo" width={100} height={100} />
        <div className="w-8" /> {/* Spacer for centering */}
      </div>

      <div className="flex flex-col items-center md:items-center gap-4 h-[104px]">
        <TypewriterText
          text="Algo feito à mão para você esperar todo mês."
          className="text-2xl font-bold"
          speed={50}
          delay={0}
          onComplete={() => setFirstTextComplete(true)}
        />

        <TypewriterText
          text="Com carinho, gibana."
          className="text-left md:text-center w-full md:w-auto"
          speed={50}
          delay={2000}
          onComplete={() => setSecondTextComplete(true)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 pt-8">
        {/* First Single Product Card */}
        {singleProducts[0] ? (
          <div
            className={`flex flex-col gap-8 flex-1 transition-all duration-700 ease-out ${
              showFirstCard
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <ImageCard
              image={
                singleProducts[0].images && singleProducts[0].images.length > 0
                  ? singleProducts[0].images[0]
                  : null
              }
              alt={singleProducts[0].metadata.title || ""}
              text={getShortText(singleProducts[0].metadata.title || "")}
              title={singleProducts[0].metadata.title || ""}
              description={singleProducts[0].description || undefined}
              kitInfo={singleProducts[0].metadata.kitInfo || undefined}
              buttonText={formatPrice(singleProducts[0])}
              onButtonClick={() => handleCheckout(singleProducts[0])}
            />
          </div>
        ) : (
          <div
            className={`flex flex-col gap-8 flex-1 transition-all duration-700 ease-out ${
              showFirstCard
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <ImageCard
              image={background1}
              alt="background1"
              text="FILLER"
              title="Filler Print Club"
              description="Um clube com pinturas dos seus animes favoritos em seus episódios fillers - fazendo coisas do dia a dia."
              kitInfo="Kit: print A5 + carta + cartela de adesivos"
              buttonText="Assinar por R$35/mês"
            />
          </div>
        )}

        {/* Second Single Product Card */}
        {singleProducts[1] ? (
          <div
            className={`flex flex-col gap-8 flex-1 transition-all duration-700 ease-out ${
              showSecondCard
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <ImageCard
              image={
                singleProducts[1].images && singleProducts[1].images.length > 0
                  ? singleProducts[1].images[0]
                  : null
              }
              alt={singleProducts[1].metadata.title || ""}
              text={getShortText(singleProducts[1].metadata.title || "")}
              title={singleProducts[1].metadata.title || ""}
              description={singleProducts[1].description || undefined}
              kitInfo={singleProducts[1].metadata.kitInfo || undefined}
              buttonText={formatPrice(singleProducts[1])}
              onButtonClick={() => handleCheckout(singleProducts[1])}
            />
          </div>
        ) : (
          <div
            className={`flex flex-col gap-8 flex-1 transition-all duration-700 ease-out ${
              showSecondCard
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <ImageCard
              image={background2}
              alt="background2"
              text="SUBTEXT"
              title="Subtext Print Club"
              description="Pinturas à oleo repletas de sentimentos."
              kitInfo="Kit: print A5 + carta + adesivo de vinil"
              buttonText="Assinar por R$35/mês"
            />
          </div>
        )}
      </div>

      <div className="py-6 md:py-14 flex justify-center">
        <div
          className={`text-center relative transition-all duration-700 ease-out ${
            showDateSection
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="py-10">
            <span className="text-gray-700 text-3xl font-medium">
              Próxima data de envio:{" "}
            </span>
            <span className="text-brown text-3xl font-extrabold">
              15 de fevereiro
            </span>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-700 ease-out ${
          showThirdCard
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {multiProduct ? (
          <ImageCard
            image={
              multiProduct.images && multiProduct.images.length > 0
                ? multiProduct.images[0]
                : null
            }
            alt={multiProduct.metadata.title || ""}
            text="O melhor dos dois mundos"
            title={multiProduct.metadata.title || ""}
            description={multiProduct.description || undefined}
            kitInfo={multiProduct.metadata.kitInfo || undefined}
            buttonText={formatPrice(multiProduct)}
            showPrintClub={false}
            onButtonClick={() => handleCheckout(multiProduct)}
          />
        ) : (
          <ImageCard
            image={background3}
            alt="background3"
            text="O melhor dos dois mundos"
            title="Subtext Print Club"
            description="Duas cartas todo mês, uma do Filler Print Club e uma do Subtext Print Club, para você que assim como eu gosta tanto de animes quanto da beleza ta tinta a óleo"
            buttonText="Assinar por R$65/mês"
            showPrintClub={false}
          />
        )}
      </div>

      <div
        className={`py-8 transition-all duration-700 ease-out ${
          showExplanationCard
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ExplanationCard />
      </div>
    </div>
  );
}
