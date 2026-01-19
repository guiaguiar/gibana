import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <div className="mx-auto max-w-[964px]">{children}</div>
      </body>
    </html>
  );
}
