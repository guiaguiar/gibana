"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { useRevealById } from "@/app/utils/reveal";

interface SubscriptionCardProps {
  image: StaticImageData | string | null;
  description: string;
  title: string;
  price: number;
  kitInfo: string;
  priceId: string | null;
}

const SubscriptionCard = ({
  image,
  description,
  title,
  price,
  kitInfo,
  priceId,
}: SubscriptionCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const imageVisible = useRevealById(`${title}-image`, 0.3);
  const overlayVisible = useRevealById(`${title}-overlay`, 0.3);
  const priceVisible = useRevealById(`${title}-price`, 0.3);
  const listVisible = useRevealById(`${title}-list`, 0.3);
  const buttonVisible = useRevealById(`${title}-button`, 0.3);

  const animation = (visible: boolean) =>
    `transition-all duration-700 ease-out ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

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
    <div className="relative flex flex-col shadow-lg rounded-[20px] max-w-[416px] w-full">
      {/* Image Section */}
      <div
        id={`${title}-image`}
        className={`relative w-full aspect-square overflow-hidden rounded-[20px] z-50 ${animation(
          imageVisible,
        )}`}
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
        <div
          id={`${title}-overlay`}
          className={`absolute bottom-0 left-0 right-0 p-4 pl-10 pr-10 pt-[200px] bg-linear-to-t from-black to-transparent ${animation(
            overlayVisible,
          )}`}
        >
          <h3 className="block text-white font-semibold text-center text-3xl">
            {title}
          </h3>
          <span className="block text-[16px] text-center text-[#B7C1C7]">
            {description}
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="relative w-full aspect-square rounded-b-[20px] overflow-hidden bg-white -mt-8">
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
          <div
            id={`${title}-price`}
            className={`flex justify-center flex-col pt-6 ${animation(
              priceVisible,
            )}`}
          >
            <span className="text-[64px] font-normal text-center">
              R${price}
              <span className="text-[20px]">/mês</span>
            </span>

            <div className="h-px w-full bg-[#9EA9B0]" />
          </div>

          {/* Feature List */}
          <ul
            id={`${title}-list`}
            className={`font-normal text-[16px] sm:text-[20px] text-center text-[#4B575E] pt-6 list-disc list-inside space-y-1 ${animation(
              listVisible,
            )}`}
          >
            {kitInfo.split("+").map((item, index) => (
              <li key={index} className="text-left">
                {item.trim()}
              </li>
            ))}
          </ul>

          {/* Button */}
          <button
            id={`${title}-button`}
            onClick={handleChoose}
            disabled={isLoading || !priceId}
            className={`cursor-pointer w-full py-3 px-4 bg-[#007874] text-white font-medium rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${animation(
              buttonVisible,
            )}`}
          >
            {isLoading ? "Carregando..." : "Escolher"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
