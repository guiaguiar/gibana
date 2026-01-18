"use client";

import { useEffect, useState, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  className = "",
  speed = 50,
  delay = 0,
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    // Handle delay before starting
    if (!isStarted && delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsStarted(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    }

    if (!isStarted) {
      setIsStarted(true);
    }

    // Start typing animation
    if (isStarted && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }

    // Call onComplete when typing is finished (only once)
    if (
      isStarted &&
      currentIndex >= text.length &&
      onComplete &&
      !hasCompletedRef.current
    ) {
      hasCompletedRef.current = true;
      onComplete();
    }
  }, [currentIndex, text, speed, delay, isStarted, onComplete]);

  return <span className={className}>{displayedText}</span>;
}
