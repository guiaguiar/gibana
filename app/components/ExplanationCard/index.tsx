"use client";

import { useState } from "react";

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
    <div className="border-b border-brown/20 last:border-b-0 cursor-pointer">
      <button
        onClick={onToggle}
        className="w-full py-6 text-left flex items-center justify-between gap-4 hover:opacity-80 transition-opacity cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3 className="font-normal text-xl md:text-3xl text-brown flex-1">
          {question}
        </h3>
        <svg
          className={`w-6 h-6 text-brown transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
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
        </svg>
      </button>
      <div
        className={`cursor-default overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-6 text-gray-700 text-base md:text-lg leading-relaxed">
          {(() => {
            // Extract children if answer is a div with children
            if (
              typeof answer === "object" &&
              answer !== null &&
              "props" in answer
            ) {
              const answerObj = answer as {
                props?: { children?: React.ReactNode };
              };
              const children = answerObj.props?.children;
              if (Array.isArray(children)) {
                return (
                  <div className="flex flex-col gap-3">
                    {children.map((child: React.ReactNode, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-brown mt-2 shrink-0">•</span>
                        <div className="flex-1">{child}</div>
                      </div>
                    ))}
                  </div>
                );
              }
            }
            // Fallback for other cases
            return (
              <div className="flex items-start gap-3">
                <span className="text-brown mt-2 shrink-0">•</span>
                <div className="flex-1">{answer}</div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
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
        <div className="flex flex-col gap-3">
          <p>
            Print Club é um clube de assinatura mensal, onde você recebe todos
            os meses uma carta por correio com o print A5 de uma arte e outros
            itens feitos e projetados todos por mim, Gibana.
          </p>
          <p>
            A ideia é tornar a minha arte mais acessível e você receber algo
            exclusivo e original.
          </p>
        </div>
      ),
    },
    {
      question: "Como funciona o envio?",
      answer: (
        <div className="flex flex-col gap-3">
          <p>
            As correspondências serão enviadas até o dia 15 de cada mês. Você
            deve se inscrever até o dia 12 do mês, para receber a impressão
            daquele mês.
          </p>
          <p>
            O frete é grátis para todo o Brasil, para manter o valor acessível
            as cartas não incluem informações de rastreamento.
          </p>
        </div>
      ),
    },
    {
      question: "Vocês aceitam reembolso e devoluções?",
      answer: (
        <div className="flex flex-col gap-3">
          <p>
            <span className="font-medium">
              Em caso de encomenda danificada:
            </span>{" "}
            por favor, entre em contato comigo e envie fotos e detalhes,
            encontraremos a melhor solução juntos.
          </p>
          <p>
            <span className="font-medium">
              Para correspondências extraviadas:
            </span>{" "}
            terei prazer em reenviar sua correspondência.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div
      className="w-full md:py-[150px] py-[50px]"
      style={{ backgroundColor: "#FCECCB" }}
    >
      <div className="max-w-[1132px] mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-normal text-[#4B575E] mb-8 md:mb-12 md:text-left text-center">
          <span className="font-bold">Perguntas</span> Frequentes
        </h2>
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
