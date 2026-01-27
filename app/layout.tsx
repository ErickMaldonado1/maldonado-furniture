import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/navBar/NavBar";
import Footer from "@/components/layout/footer/Footer";
import { MainProvider } from "@/providers/MainProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muebles Maldonado | ¡A medida y modernos con los mejores precios!",
  description:
    "Muebles Maldonado: Fabricación de muebles a medida, modernos y con los mejores precios. Especialistas en dormitorios, muebles de tv, muebles de cocina, oficina y todo para tu hogar.",
  keywords: [
    "muebles a medida",
    "muebles en quito",
    "muebles en ecuador",
    "muebles modernos",
    "muebles de cocina",
    "muebles de dormitorio",
    "muebles de oficina",
    "muebles de tv",
    "muebles personalizados",
    "muebles económicos",
    "muebles de calidad",
    "muebles hechos a mano",
  ],
  alternates: {
    canonical: "https://mueblesmaldonadoec.com",
  },
  openGraph: {
    title: "Muebles Maldonado | ¡A medida y modernos con los mejores precios!",
    description:
      "Muebles Maldonado: Fabricación de muebles a medida, modernos y con los mejores precios. Especialistas en dormitorios, muebles de tv, muebles de cocina, oficina y todo para tu hogar.",
    url: "https://mueblesmaldonadoec.com",
    siteName: "Muebles Maldonado",
    images: [
      {
        url: "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190715/gabinete-cocina_cmi7i7.webp",
        width: 1200,
        height: 630,
        alt: "Muebles Maldonado",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-[#0a0a0a] transition-colors duration-500`}
        suppressHydrationWarning={true}
      >
        <MainProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 ">{children}</main>
            <Footer />
          </div>
        </MainProvider>
      </body>
    </html>
  );
}
