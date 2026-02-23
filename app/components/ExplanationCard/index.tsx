"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-b border-brown/20 last:border-b-0 cursor-pointer"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 text-left flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
        aria-expanded={isOpen}
      >
        <h3 className="font-normal text-xl md:text-3xl text-brown flex-1">
          {question}
        </h3>

        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6 text-brown shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-700 text-base md:text-lg leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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
          <p>As correspondências serão enviadas até o dia 15 de cada mês.</p>
          <p>O frete é grátis para todo o Brasil.</p>
        </>
      ),
    },
    {
      question: "Vocês aceitam reembolso?",
      answer: (
        <>
          <p>Em caso de encomenda danificada, entre em contato comigo.</p>
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
        <div className="bg-white/50 rounded-2xl p-6 md:p-8 shadow-lg">
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
