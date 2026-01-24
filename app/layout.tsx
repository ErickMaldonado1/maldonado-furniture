import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/navBar/NavBar";
import Footer from "@/components/layout/footer/Footer";
import { MainProvider } from "@/providers/MainProvider";
import WhatsAppButton from "@/components/ui/WhatsApp/WhatsAppButton";
import { Toaster } from "sonner";

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
        <MainProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
              <Toaster position="bottom-right" richColors expand={false} />
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </MainProvider>
      </body>
    </html>
  );
}
