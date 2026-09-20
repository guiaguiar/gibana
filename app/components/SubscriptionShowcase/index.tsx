"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { type StripeProduct, createCheckoutSession } from "@/app/actions/stripe";
import AccordionItem from "@/app/components/AccordionItem";
import { getLastBusinessDayOfMonth, formatDateExtenso } from "@/lib/date";

interface SubscriptionShowcaseProps {
  product: StripeProduct;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

export default function SubscriptionShowcase({
  product,
}: SubscriptionShowcaseProps) {
  const images = product.images && product.images.length > 0 ? product.images : [];
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const title = product.metadata.title || product.name;
  const price = product.price_amount ? product.price_amount / 100 : 0;
  const nextShipmentDate = formatDateExtenso(getLastBusinessDayOfMonth());

  const handleSubscribe = async () => {
    if (!product.default_price) {
      alert("Preço não disponível para este produto.");
      return;
    }

    setIsLoading(true);
    try {
      const { url, error } = await createCheckoutSession(product.default_price);

      if (error) {
        alert(`Erro ao criar sessão de checkout: ${error}`);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Erro ao processar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const faqItems = [
    {
      question: "Quando são feitos os envios?",
      answer: (
        <p>
          Os envios são feitos até o último dia útil do mês, o recebimento da
          carta é de 1 a 2 semanas, dependendo da sua localização.
        </p>
      ),
    },
    {
      question: "Quando posso participar?",
      answer: (
        <p>
          A inscrição pode ser feita em qualquer data. Apenas lembrando, se
          você se inscrever a partir do dia 26, vai receber o club do mês
          seguinte, pois as inscrições já encerraram.
        </p>
      ),
    },
    {
      question: "Como gerencio minha assinatura?",
      answer: (
        <>
          <p>
            Você pode clicar no ícone do bonequinho no canto superior direito
            ou{" "}
            <Link href="/minha-conta" className="underline text-[#007874]">
              clique aqui
            </Link>{" "}
            para ser direcionado à página de login.
          </p>
          <p>Você pode cancelar sua assinatura a qualquer momento!</p>
        </>
      ),
    },
  ];

  return (
    <div className="px-4 md:py-[100px] py-[50px] bg-[#fbfbfb]">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        variants={containerStagger}
      >
        <motion.div
          variants={fadeUp}
          className="flex w-full items-center justify-center pb-10 md:pb-16"
        >
          <span className="text-2xl font-semibold text-center text-[40px] text-[#99623B]">
            Assinaturas
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Galeria de imagens */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <div className="relative w-full aspect-square rounded-[20px] overflow-hidden shadow-lg bg-gray-100">
              {images.length > 0 ? (
                <Image
                  src={images[activeImage]}
                  alt={title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, index) => (
                  <button
                    key={img + index}
                    onClick={() => setActiveImage(index)}
                    className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                      activeImage === index
                        ? "border-[#007874]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Informações e assinatura */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div>
              <h3 className="text-3xl font-semibold text-[#4B575E]">
                {title}
              </h3>
              <span className="block text-[40px] font-normal mt-2">
                R${price}
                <span className="text-[18px]">/mês</span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-thin text-[#4B575E]">
                Próxima data de envio:
              </span>
              <span className="font-medium text-[#99623B] text-2xl">
                {nextShipmentDate}
              </span>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={isLoading || !product.default_price}
              className="cursor-pointer w-full py-3 px-4 bg-[#007874] text-white font-medium rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Carregando..." : "Assinar"}
            </button>

            <div className="h-px w-full bg-[#9EA9B0]/40" />

            <div className="flex flex-col gap-4 text-[#4B575E] text-base md:text-lg leading-relaxed">
              <p>
                Todos os meses um envelope de carta com itens colecionáveis{" "}
                &lt;3
              </p>

              <p>As inscrições encerram no dia 25 de cada mês.</p>

              <div>
                <h4 className="font-semibold text-[#99623B] mb-2">
                  O que vem na carta?
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Uma impressão de uma pintura à óleo autoral</li>
                  <li>Adesivos/cartela com o tema do mês</li>
                  <li>Uma carta</li>
                  <li>Novos itens conforme o crescimento do club</li>
                </ul>
              </div>

              <p>
                Ao assinar tenha 10% de desconto nas encomendas do Gibana e na
                lojinha (em breve!)
              </p>

              <p className="font-medium">
                O frete é grátis para todo o Brasil!
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-semibold text-[#99623B] text-xl mb-2">
                Dúvidas frequentes
              </h4>
              <div>
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    size="sm"
                    question={item.question}
                    answer={item.answer}
                    isOpen={openFaq === index}
                    onToggle={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                  />
                ))}
              </div>
            </div>

            <p className="italic text-[#4B575E] pt-2">
              Que eu possa transmitir sentimentos bons para você com as minhas
              artes
            </p>
          </motion.div>
        </div>

        {/* Foto do kit do mês (imagem estática do projeto, não vem da Stripe) */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center pt-14 md:pt-20"
        >
          <div className="relative w-full max-w-[480px] aspect-[9/16] rounded-[20px] overflow-hidden shadow-lg">
            <Image
              src="/images/musings-print-club-post.png"
              alt="Itens do kit do mês do Print Club"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
