import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const josefinSans = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin-sans",
});

const distrampler = localFont({
  src: [
    {
      path: "../public/fonts/Distrampler-Regular.ttf",
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
  description: "Gibana - Print Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${distrampler.variable}`}
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
