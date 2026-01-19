"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface ImageCardProps {
  image: StaticImageData | string | null;
  alt: string;
  text: string;
  title?: string;
  description?: string;
  kitInfo?: string;
  buttonText?: string;
  showPrintClub?: boolean;
  onButtonClick?: () => void;
}

export default function ImageCard({
  image,
  alt,
  text,
  title,
  description,
  kitInfo,
  buttonText,
  showPrintClub = true,
  onButtonClick,
}: ImageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Check if screen width is less than 1024px (tablet and mobile)
      setIsMobileOrTablet(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleCardClick = () => {
    if (isMobileOrTablet && title) {
      setIsExpanded(!isExpanded);
    }
  };

  const isContentVisible = isMobileOrTablet ? isExpanded : false;
  const showHoverEffect = !isMobileOrTablet;

  return (
    <div
      className={`relative w-full h-[400px] rounded-2xl overflow-hidden ${
        showHoverEffect ? "group" : ""
      } cursor-pointer hover:shadow-xl`}
      onClick={handleCardClick}
    >
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          showHoverEffect ? "group-hover:blur-xs" : ""
        } ${isContentVisible ? "blur-xs" : ""}`}
      >
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            {...(typeof image === "string" && { unoptimized: true })}
          />
        ) : (
          <div className="w-full h-full bg-white" />
        )}
      </div>

      {/* Dark overlay on hover/click */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 z-0 ${
          showHoverEffect
            ? "opacity-0 group-hover:opacity-50"
            : isContentVisible
            ? "opacity-50"
            : "opacity-0"
        }`}
      />

      {/* Default text - visible by default, hidden on hover/click */}
      <div
        className={`gap-2 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-300 ${
          showHoverEffect
            ? "group-hover:opacity-0"
            : isContentVisible
            ? "opacity-0"
            : "opacity-100"
        }`}
      >
        <span className="text-white font-bold text-4xl md:text-5xl z-10 [text-shadow:3px_3px_20px_rgba(0,0,0,0.7)] uppercase text-center">
          {text}
        </span>
        {showPrintClub && (
          <span className="text-white font-bold text-4xl md:text-5xl z-10 [text-shadow:3px_3px_20px_rgba(0,0,0,0.7)]">
            PRINT CLUB
          </span>
        )}
        {/* "Saiba mais" text for mobile/tablet */}
        {isMobileOrTablet && title && (
          <span className="text-white font-semibold text-lg md:text-xl z-10 [text-shadow:3px_3px_20px_rgba(0,0,0,0.7)] opacity-80">
            Saiba mais
          </span>
        )}
      </div>

      {/* Hover/Click content - hidden by default, visible on hover/click */}
      {title && (
        <div
          className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-300 p-6 ${
            showHoverEffect
              ? "opacity-0 group-hover:opacity-100"
              : isContentVisible
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center gap-6 md:max-w-lg z-10 transition-transform duration-300 ${
              showHoverEffect
                ? "transform translate-y-8 group-hover:translate-y-0"
                : isContentVisible
                ? "transform translate-y-0"
                : "transform translate-y-8"
            }`}
          >
            <h3 className="font-extrabold text-3xl md:text-3xl text-center text-white uppercase leading-tight">
              {title}
            </h3>
            {description && (
              <p className="text-base font-medium md:text-lg text-center text-white leading-relaxed max-w-md">
                {description}
              </p>
            )}
            {kitInfo && (
              <p className="text-sm font-medium md:text-base text-center text-white/90">
                {kitInfo}
              </p>
            )}

            {buttonText && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onButtonClick) {
                    onButtonClick();
                  }
                }}
                className="cursor-pointer font-bold mt-2 h-[40px] pr-8 pl-8 rounded-2xl bg-green-gibana text-white hover:brightness-105 transition-all"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
