"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

interface IconButtonProps {
  icon: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}

export default function IconButton({
  icon,
  width,
  height,
  onClick,
  className = "",
  "aria-label": ariaLabel,
}: IconButtonProps) {
  // If width/height are not provided, use responsive sizing (16px mobile, 32px desktop)
  const isResponsive = width === undefined && height === undefined;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center hover:opacity-80 transition-opacity ${className} cursor-pointer`}
      aria-label={ariaLabel}
    >
      {isResponsive ? (
        <Icon
          icon={icon}
          width={isMobile ? 24 : 32}
          height={isMobile ? 24 : 32}
        />
      ) : (
        <Icon icon={icon} width={width ?? 32} height={height ?? 32} />
      )}
    </button>
  );
}
