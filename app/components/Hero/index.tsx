"use client";

import Image from "next/image";
import UserIcon from "../UserIcon";
import HeroTyping from "../HeroTyping";
import background from "@/public/background.jpg";
import logo from "@/public/logo.png";
import { useRevealById } from "@/app/utils/reveal";

const Hero = () => {
  const bgVisible = useRevealById("hero-bg", 0.1);
  const logoVisible = useRevealById("hero-logo", 0.2);
  const userVisible = useRevealById("hero-user", 0.3);

  return (
    <div className="w-full h-screen md:h-[646px] relative overflow-hidden">
      {/* Background */}
      <div
        id="hero-bg"
        className={`absolute inset-0 z-0 transition-all duration-1000 ease-out
          ${
            bgVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
      >
        <Image
          src={background}
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Logo */}
      <div
        id="hero-logo"
        className={`absolute z-20 top-7 left-1/2 -translate-x-1/2 transition-all duration-700 ease-out
          ${
            logoVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
      >
        <Image src={logo} alt="logo" width={86} height={86} priority />
      </div>

      {/* User Icon */}
      <div
        id="hero-user"
        className={`absolute z-20 inset-0 flex items-center justify-center
    transition-all duration-700 ease-out
    ${userVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
      >
        <UserIcon />
      </div>

      <HeroTyping />
    </div>
  );
};

export default Hero;
