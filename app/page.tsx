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

export default function Home() {
  const [firstTextComplete, setFirstTextComplete] = useState(false);
  const [secondTextComplete, setSecondTextComplete] = useState(false);
  const [showFirstCard, setShowFirstCard] = useState(false);
  const [showSecondCard, setShowSecondCard] = useState(false);
  const [showDateSection, setShowDateSection] = useState(false);
  const [showThirdCard, setShowThirdCard] = useState(false);
  const [showExplanationCard, setShowExplanationCard] = useState(false);

  const isTypingComplete = firstTextComplete && secondTextComplete;

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
      <div className="flex items-center justify-between pb-10">
        <IconButton icon="solar:user-broken" aria-label="User" />
        <Image src={logo} alt="logo" width={100} height={100} />
        <IconButton
          icon="iconamoon:shopping-bag-light"
          aria-label="Shopping bag"
        />
      </div>

      <div className="flex flex-col items-center md:items-center gap-4 pb-8 h-[104px]">
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

      <div className="flex flex-col md:flex-row gap-8">
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
        <ImageCard
          image={background3}
          alt="background3"
          text="O melhor dos dois mundos"
          title="Subtext Print Club"
          description="Duas cartas todo mês, uma do Filler Print Club e uma do Subtext Print Club, para você que assim como eu gosta tanto de animes quanto da beleza ta tinta a óleo"
          buttonText="Assinar por R$65/mês"
          showPrintClub={false}
        />
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
