import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-questrial",
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
    <html lang="en" className={questrial.variable}>
      <body
        className={`${questrial.className} antialiased`}
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-[964px]">{children}</div>
      </body>
    </html>
  );
}
