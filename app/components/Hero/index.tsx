"use client";

import Image from "next/image";
import UserIcon from "../UserIcon";
import HeroTyping from "../HeroTyping";
import background from "@/public/background.jpg";
import logo from "@/public/logo.png";

const Hero = () => {
  return (
    <div className="w-full h-screen md:h-[646px] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 fadeDown">
        <Image
          src={background}
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Logo */}
      <div className="absolute z-20 top-7 left-1/2 -translate-x-1/2 fadeDown delay-200">
        <Image src={logo} alt="logo" width={86} height={86} priority />
      </div>

      {/* User Icon */}
      <div className="relative z-20 fadeDown delay-400">
        <UserIcon />
      </div>

      <HeroTyping />

      <style jsx>{`
        .fadeDown {
          opacity: 0;
          transform: translateY(-30px);
          animation: fadeDown 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        @keyframes fadeDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
