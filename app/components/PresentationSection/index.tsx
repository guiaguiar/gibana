"use client";

import Image from "next/image";
import IconButton from "../IconButton";
import logo from "@/public/logo.png";

const PresentationSection = () => {
  return (
    <div className="bg-[#FBFBFB] flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 ">
        <div className="flex items-center gap-14 py-[120px]">
          <div className="relative min-w-[416px] min-h-[496px] rounded-3xl overflow-hidden">
            <Image src="/selfie.png" alt="selfie" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-[52px] font-distrampler text-[#99623B] pb-[10px]">Oi, eu sou a gibana.</h1>
            <span className="text-[20px] font-josefin-sans text-[#4B575E]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt porta neque sed mattis. Ut nec lacus sapien. Vivamus eu dui lobortis, pulvinar odio sit amet, mattis augue. Vivamus posuere, elit non convallis placerat, felis arcu finibus nisi, in congue enim risus eget lorem.
              Cras sed erat lacinia metus hendrerit hendrerit at in mi. Aliquam erat volutpat. Vivamus at ex sagittis, ultricies neque sed, laoreet nibh. Cras sollicitudin, risus nec maximus dignissim, justo turpis suscipit sapien, ut pulvinar velit ex sed nibh. Donec sed facilisis erat.
            </span>
            <div className="flex items-center justify-between gap-2 pt-[41px]">
              <span className="text-[32px] font-distrampler text-[#007874]">me siga nas redes sociais :)</span>
              <div className="flex items-center gap-2 bg-[#007874] rounded-full p-2">
                <IconButton
                  icon="akar-icons:instagram-fill"
                  height={26}
                  width={26}
                  className="text-white"
                  onClick={() => window.open("https://www.instagram.com/gibana.maximo", "_blank")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:gap-0 gap-[120px] flex-col md:flex-row items-center justify-between p-[54px] max-w-[1480px] w-full relative">
        <span className="text-[16px] md:text-[20px] font-josefin-sans text-[#4B575E]">© 2026 gibana. todos os direitos reservados.</span>
        <Image
          src={logo}
          alt="logo"
          className="absolute z-10 md:top-0 top-[100px] left-1/2 -translate-x-1/2"
          width={82}
          height={82}
        />
        <span className="text-[16px] md:text-[20px] font-josefin-sans text-[#4B575E]">obrigada pela visita!</span>
      </div>
    </div>
  );
};

export default PresentationSection;