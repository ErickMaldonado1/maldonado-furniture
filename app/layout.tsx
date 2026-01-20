// src/app/layout.tsx
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/navBar/NavBar";
import Footer from "@/components/layout/footer/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maldonado Furniture | Premium 2026 Collection",
  description: "Exquisite hand-crafted furniture for modern living spaces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-white dark:bg-[#0a0a0a] transition-colors duration-500`}
      >
        {/* Aquí integras la estructura que tenías en el componente Layout */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
