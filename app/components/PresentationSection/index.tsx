"use client";

import Image from "next/image";
import IconButton from "../IconButton";
import logo from "@/public/logo.png";
import { useRevealById } from "@/app/utils/reveal";

const PresentationSection = () => {
  const titleVisible = useRevealById("presentation-title", 0.4);
  const textVisible = useRevealById("presentation-text", 0.3);
  const socialsVisible = useRevealById("presentation-socials", 0.3);
  const imageVisible = useRevealById("presentation-image", 0.3);
  const footerVisible = useRevealById("presentation-footer", 0.2);

  const animation = (visible: boolean) =>
    `transition-all duration-700 ease-out ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  return (
    <div className="bg-[#FBFBFB] flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 min-[1045px]:px-8">
        <div className="flex flex-col min-[1045px]:flex-row items-center gap-10 md:gap-14 min-[1236px]:py-[120px] pt-[50px]">
          <div className="contents min-[1045px]:flex min-[1045px]:flex-col min-[1045px]:order-2 min-[1045px]:flex-1">
            {/* Title */}
            <h1
              id="presentation-title"
              className={`order-1 min-[1045px]:text-[52px] text-[32px] font-distrampler text-[#99623B] pb-[10px] text-center min-[1045px]:text-left ${animation(
                titleVisible,
              )}`}
            >
              Oi, eu sou a gibana.
            </h1>

            {/* Text */}
            <div
              id="presentation-text"
              className={`order-3 ${animation(textVisible)}`}
            >
              <span className="text-[20px] font-josefin-sans text-[#4B575E] block text-center min-[1045px]:text-left">
                Meu nome é Giovana, sou vegana, amo os animais e faço retratos
                de pets há 5 anos. Moro no interior de São Paulo - Brasil com
                meu yorkshire e meu sonho é ter um gatinho. Sou estudante de ADS
                e já penso na próxima graduação (que com certeza será biologia).
                Assim como muitas pessoas criativas, desenho desde pequena. Sou
                entusiasta da arte em seus mais diversos sentidos, e a forma que
                mais gosto de me expressar é pintando. Levar minha arte para o
                mundo sempre pareceu assustador, mas ao mesmo tempo sempre fez
                muito sentido para mim. Espero te impactar com o que crio, feito
                por uma pessoa real - direto do meu ateliê para o seu correio.
              </span>
            </div>

            {/* Social Section */}
            <div
              id="presentation-socials"
              className={`order-4 flex items-center flex-col min-[1045px]:flex-row justify-between gap-4 min-[1236px]:pt-[41px] ${animation(
                socialsVisible,
              )}`}
            >
              <span className="md:text-[32px] text-[27px] font-distrampler text-[#007874]">
                me siga nas redes sociais :)
              </span>
              <div className="flex items-center gap-2 bg-[#007874] rounded-full p-2">
                <IconButton
                  icon="akar-icons:instagram-fill"
                  height={26}
                  width={26}
                  className="text-white"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/gibana.maximo",
                      "_blank",
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            id="presentation-image"
            className={`order-2 max-w-[416px] min-[1045px]:order-1 relative w-full min-w-0 min-h-[496px] rounded-3xl overflow-hidden min-[1045px]:w-[416px] min-[1045px]:min-w-[416px] min-[1045px]:min-h-[496px] ${animation(
              imageVisible,
            )}`}
          >
            <Image
              src="/selfie.png"
              alt="selfie"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        id="presentation-footer"
        className={`flex min-[1236px]:gap-0 gap-[120px] flex-col min-[1236px]:flex-row items-center justify-between md:p-[54px] p-[16px] max-w-[1480px] w-full relative pt-8 ${animation(
          footerVisible,
        )}`}
      >
        <span className="text-[16px] min-[1236px]:text-[20px] font-josefin-sans text-[#4B575E]">
          © 2026 gibana. todos os direitos reservados.
        </span>

        <Image
          src={logo}
          alt="logo"
          className="absolute z-10 min-[1236px]:top-0 top-[75px] left-1/2 -translate-x-1/2"
          width={82}
          height={82}
          priority
        />

        <span className="text-[16px] min-[1236px]:text-[20px] font-josefin-sans text-[#4B575E]">
          obrigada pela visita!
        </span>
      </div>
    </div>
  );
};

export default PresentationSection;
