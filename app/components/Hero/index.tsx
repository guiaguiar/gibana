"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import UserIcon from "../UserIcon";
import HeroTyping from "../HeroTyping";
import background from "@/public/background.jpg";
import logo from "@/public/logo.png";

const Hero = () => {
  return (
    <div className="w-full h-screen md:h-[646px] relative overflow-hidden bg-[#fbfbfb]">
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <Image
          src={background}
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Logo */}
      <motion.div
        className="absolute z-20 top-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Image src={logo} alt="logo" width={86} height={86} priority />
      </motion.div>

      <motion.div
        className="absolute z-30 inset-0 flex items-center justify-center cursor-pointer pointer-events-none"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="cursor-pointer pointer-events-auto">
          <UserIcon />
        </div>
      </motion.div>

      <HeroTyping />
    </div>
  );
};

export default Hero;
