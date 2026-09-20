"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  size?: "sm" | "lg";
}

export default function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  size = "lg",
}: AccordionItemProps) {
  const questionClass =
    size === "lg"
      ? "font-normal text-xl md:text-3xl text-brown flex-1"
      : "font-medium text-base md:text-lg text-brown flex-1";

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
        className="w-full py-6 text-left flex items-center justify-between gap-4 hover:opacity-80 transition-opacity cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3 className={questionClass}>{question}</h3>

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
