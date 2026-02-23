"use client";

import { useEffect, useState } from "react";

const typingSpeed = 30; // lower = faster

export default function HeroTyping() {
  const firstLine = "Algo feito à mão para";
  const secondLine = "você esperar todo mês";
  const signature = "Com carinho, gibana.";

  const [displayedFirst, setDisplayedFirst] = useState("");
  const [displayedSecond, setDisplayedSecond] = useState("");
  const [displayedSignature, setDisplayedSignature] = useState("");

  const [firstDone, setFirstDone] = useState(false);
  const [secondDone, setSecondDone] = useState(false);

  // Type first line
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < firstLine.length) {
        setDisplayedFirst(firstLine.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setFirstDone(true);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  // Type second line
  useEffect(() => {
    if (!firstDone) return;

    let index = 0;

    const interval = setInterval(() => {
      if (index < secondLine.length) {
        setDisplayedSecond(secondLine.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setSecondDone(true);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [firstDone]);

  // Type signature
  useEffect(() => {
    if (!secondDone) return;

    let index = 0;

    const interval = setInterval(() => {
      if (index < signature.length) {
        setDisplayedSignature(signature.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [secondDone]);

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
      {/* First Line */}
      <div className="md:h-[62px] h-[38px] flex items-center justify-center">
        <span className="font-distrampler font-normal md:text-[52px] text-[32px] leading-[1.2] tracking-normal text-center text-[#99623B]">
          {displayedFirst}
        </span>
      </div>

      {/* Second Line */}
      <div className="md:h-[62px] h-[38px] flex items-center justify-center">
        <span className="font-distrampler font-normal md:text-[52px] text-[32px] leading-[1.2] tracking-normal text-center text-[#99623B]">
          {displayedSecond}
        </span>
      </div>

      {/* Signature */}
      <div className="md:h-[60px] h-[40px] flex items-center justify-center">
        <span
          className="font-normal text-[32px] md:pt-[24px]"
          style={{ fontFamily: "var(--font-annie), sans-serif" }}
        >
          {displayedSignature}
        </span>
      </div>
    </div>
  );
}
