import type { Metadata } from "next";
import { Inter, Bungee } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/session-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bungee = Bungee({
  weight: ["400"],
  variable: "--font-bungee",
});

export const metadata: Metadata = {
  title: "Whoam! - Dapatkan pesan rahasia dari temanmu!",
  description: "Buat halaman mu dan dapatkan pesan rahasia dari temanmu",
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
        <SessionProvider>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
