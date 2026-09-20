"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AccordionItem from "@/app/components/AccordionItem";

export default function ExplanationCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "O que é um Print Club?",
      answer: (
        <>
          <p>
            Print Club é um clube de assinatura mensal, onde você recebe todos
            os meses uma carta por correio com o print A5 de uma arte.
          </p>
          <p>
            A ideia é tornar a minha arte mais acessível e você receber algo
            exclusivo.
          </p>
        </>
      ),
    },
    {
      question: "Como funciona o envio?",
      answer: (
        <>
          <p>
            As correspondências serão enviadas até o último dia útil de cada
            mês.
          </p>
          <p>Prazo de 1 a 2 semanas para recebimento da carta.</p>
          <p>O frete é grátis para todo o Brasil.</p>
        </>
      ),
    },
    {
      question: "Vocês aceitam reembolso e devoluções?",
      answer: (
        <>
          <p>
            Em caso de encomenda danificada, entre em contato comigo em
            gibana.maximo@gmail.com.
          </p>
          <p>
            Em caso de extravio, reenviarei a encomenda com prazer. Entre em
            contato se não receber a carta em 3 semanas após a confirmação de
            envio.
          </p>
        </>
      ),
    },
  ];

  return (
    <div
      className="w-full md:py-[150px] py-[50px]"
      style={{ backgroundColor: "#FCECCB" }}
    >
      <div className="max-w-[1132px] mx-auto px-4 md:px-8">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-normal text-[#4B575E] mb-8 md:mb-12 md:text-left text-center"
        >
          <span className="font-bold">Perguntas</span> Frequentes
        </motion.h2>

        {/* Accordion */}
        <div className="bg-[#fbfbfb]/50 rounded-2xl p-6 md:p-8 shadow-lg">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
