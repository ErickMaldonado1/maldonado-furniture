import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/navBar/NavBar";
import { MainProvider } from "@/providers/MainProvider";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/layout/footer/Footer"), {
  loading: () => <p>...Cargando</p>,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "Muebles Maldonado | ¡Muebles a medida y modernos con los mejores precios en Quito Ecuador!",
  description:
    "Fabricantes de muebles en Quito ¡con instalación gratis!. Muebles de cocina, camas, closets, veladores, muebles de TV, aparadores, libreros, escritorios, muebles de oficina de calidad para tu hogar a buenos precios en madera y melamina.",
  keywords: [
    "muebles quito",
    "muebles en quito",
    "muebles en ecuador",
    "fabricantes muebles quito",
    "muebles a medida",
    "muebles personalizados",
    "muebles modernos",
    "muebles económicos",
    "muebles de calidad",
    "muebles hechos a mano",
    "muebles de cocina",
    "muebles de dormitorio",
    "muebles de oficina",
    "muebles de tv",
    "muebles de baño",
    "veladores",
    "camas",
    "closets",
    "aparadores",
    "libreros",
    "escritorios",
    "mesas de comedor quito",
    "muebles minimalistas quito",
    "muebles contemporaneos quito",
    "muebles modulares quito",
    "muebles para departamentos pequeños",
    "carpinteria en quito",
    "carpinteros en quito",
    "diseño de muebles quito",
    "remodelacion de muebles",
    "muebles a credito quito",
    "muebles con financiamiento",
    "muebles en oferta quito",
    "tienda de muebles online quito",
    "showroom de muebles quito",
    "envio de muebles a domicilio quito",
    "muebles de madera quito",
    "fabricacion de muebles en quito",
    "muebles exclusivos quito",
    "muebles para hogar quito",
    "muebles corporativos quito",
    "muebles para negocios quito",
    "decoracion de interiores quito",
    "muebles de lujo quito",
    "muebles de melamina en Quito",
    "muebles de melamina a medida",
    "muebles en melamina económicos",
    "fabricantes de muebles de melamina",
    "closets de melamina Quito",
    "cocinas de melamina Quito",
    "muebles modulares de melamina",
    "escritorios de melamina Quito",
    "muebles de melamina modernos",
    "muebles de melamina para oficina",
  ],
  alternates: {
    canonical: "https://mueblesmaldonadoec.com",
  },
  openGraph: {
    title:
      "Muebles Maldonado | ¡Muebles a medida y modernos con los mejores precios!",
    description:
      "Muebles Maldonado: Fabricación de muebles a medida, modernos y con los mejores precios. Especialistas en dormitorios, muebles de tv, muebles de cocina, oficina y todo para tu hogar.",
    url: "https://mueblesmaldonadoec.com",
    siteName: "Muebles Maldonado",
    images: [
      {
        url: "https://res.cloudinary.com/dwvruzkll/image/upload/v1769127395/cocina_stp9o1.webp",
        width: 1200,
        height: 630,
        alt: "Muebles Maldonado",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
  other: {
    preconnect: "https://res.cloudinary.com",
    "dns-prefetch": "https://res.cloudinary.com",
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
