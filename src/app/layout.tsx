import type { Metadata } from "next";
import { Inter, Bungee } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bungee = Bungee({
  weight: ["400"],
  variable: "--font-bungee",
});

export const metadata: Metadata = {
  title: "Whoami - Kirim & Terima Pesan Rahasia",
  description: "Confes ke gebetan atau pacar secara rahasia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bungee.variable} min-h-dvh antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
