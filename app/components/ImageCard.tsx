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
}: ImageCardProps) {
  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden group cursor-pointer hover:shadow-xl">
      <div className="absolute inset-0 transition-all duration-300 group-hover:blur-xs">
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

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-0" />

      {/* Default text - visible by default, hidden on hover */}
      <div className="gap-2 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
        <span className="text-white font-bold text-5xl z-10 whitespace-nowrap [text-shadow:3px_3px_20px_rgba(0,0,0,0.7)]">
          {text}
        </span>
        {showPrintClub && (
          <span className="text-white font-bold text-5xl z-10 whitespace-nowrap [text-shadow:3px_3px_20px_rgba(0,0,0,0.7)]">
            PRINT CLUB
          </span>
        )}
      </div>

      {/* Hover content - hidden by default, visible on hover */}
      {title && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
          <div className="flex flex-col items-center justify-center p-8 gap-6 max-w-lg z-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
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
              <button className="cursor-pointer font-bold mt-2 h-[40px] pr-8 pl-8 rounded-2xl bg-green-gibana text-white hover:brightness-105 transition-all">
                {buttonText}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
