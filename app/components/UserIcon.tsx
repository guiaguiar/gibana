"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function UserIcon() {
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
    <div className="absolute top-[60px] right-0 left-0 z-30 max-w-7xl mx-auto px-4 flex justify-end">
      <Link
        href="/minha-conta"
        className="inline-flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="Minha conta"
      >
        <Icon
          icon="solar:user-broken"
          width={isMobile ? 24 : 32}
          height={isMobile ? 24 : 32}
          className="text-[#99623B]"
        />
      </Link>
    </div>
  );
}
