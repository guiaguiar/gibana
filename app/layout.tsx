import type { Metadata } from "next";
import { Josefin_Sans, Annie_Use_Your_Telescope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const josefinSans = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin-sans",
});

const annieUseYourTelescope = Annie_Use_Your_Telescope({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-annie",
});

const distrampler = localFont({
  src: [
    {
      path: "../public/fonts/Distrampler-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-distrampler",
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Gibana",
  description:
    "Algo feito à mão para você esperar todo mês. Com carinho, gibana.",
  openGraph: {
    title: "Gibana - Print Club",
    description:
      "Algo feito à mão para você esperar todo mês. Com carinho, gibana.",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gibana - Print Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gibana - Print Club",
    description:
      "Algo feito à mão para você esperar todo mês. Com carinho, gibana.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${distrampler.variable} ${annieUseYourTelescope.variable}`}
    >
      <body
        className={`${josefinSans.className} antialiased`}
        suppressHydrationWarning
      >
        <div className="">{children}</div>
      </body>
    </html>
  );
}
