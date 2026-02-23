"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { createCheckoutSession } from "@/app/actions/stripe";

interface SubscriptionCardProps {
  image: StaticImageData | string | null;
  description: string;
  title: string;
  price: number;
  kitInfo: string;
  priceId: string | null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const SubscriptionCard = ({
  image,
  description,
  title,
  price,
  kitInfo,
  priceId,
}: SubscriptionCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChoose = async () => {
    if (!priceId) {
      alert("Preço não disponível para este produto.");
      return;
    }

    setIsLoading(true);
    try {
      const { url, error } = await createCheckoutSession(priceId);

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

  return (
    <motion.div
      className="relative flex flex-col shadow-lg rounded-[20px] max-w-[416px] w-full"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Image Section */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative w-full aspect-square overflow-hidden rounded-[20px] z-50"
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
            {...(typeof image === "string" && { unoptimized: true })}
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}

        {/* Overlay */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-4 pl-10 pr-10 pt-[200px] bg-linear-to-t from-black to-transparent"
        >
          <h3 className="block text-white font-semibold text-center text-3xl">
            {title}
          </h3>
          <span className="block text-[16px] text-center text-[#B7C1C7]">
            {description}
          </span>
        </motion.div>
      </motion.div>

      {/* Price Section */}
      <div className="relative w-full aspect-square rounded-b-[20px] overflow-hidden bg-[#fbfbfb] -mt-8">
        {image && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              priority
              src={image}
              alt=""
              fill
              className="object-cover opacity-30"
              style={{
                transform: "scale(1.4)",
                filter: "blur(10px)",
              }}
              {...(typeof image === "string" && { unoptimized: true })}
            />
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full p-6 justify-between">
          {/* Price */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center flex-col pt-6"
          >
            <span className="text-[64px] font-normal text-center">
              R${price}
              <span className="text-[20px]">/mês</span>
            </span>

            <div className="h-px w-full bg-[#9EA9B0]" />
          </motion.div>

          {/* Feature List */}
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            className="font-normal text-[16px] sm:text-[20px] text-center text-[#4B575E] pt-6 list-disc list-inside space-y-1"
          >
            {kitInfo.split("+").map((item, index) => (
              <li key={index} className="text-left">
                {item.trim()}
              </li>
            ))}
          </motion.ul>

          {/* Button */}
          <button
            onClick={handleChoose}
            disabled={isLoading || !priceId}
            className="cursor-pointer w-full py-3 px-4 bg-[#007874] text-white font-medium rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Carregando..." : "Escolher"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionCard;
