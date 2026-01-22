"use client";

import React, { use } from "react";
import { motion, Variants } from "framer-motion";
import {
  HiPlus,
  HiOutlineSparkles,
  HiArrowLongRight,
  HiMiniViewfinderCircle,
} from "react-icons/hi2";
import { categories } from "@/lib/categories";
import Link from "next/link";
import { notFound } from "next/navigation";

const fadeUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

type Props = {
  params: Promise<{ category: string }>;
};

const badgeStyles: Record<string, string> = {
  accent: "bg-[#4A3728] text-white",
  gold: "bg-amber-500 text-white",
  red: "bg-red-500 text-white",
  blue: "bg-blue-500 text-white",
  green: "bg-emerald-500 text-white",
};

export default function CategoryPage({ params }: Props) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;

  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return notFound();
  }
  const heroImage =
    category.featuredContent[0]?.imageSrc ||
    "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <main className="mt-16 min-h-screen bg-[#FDFCFB] dark:bg-[#050505] transition-colors overflow-x-hidden">
      <section className="relative min-h-[90vh] grid lg:grid-cols-2 items-center">

        <div className="relative z-20 px-6 lg:px-20 py-20 order-2 lg:order-1">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#4A3728] text-white text-[9px] font-black uppercase tracking-[0.4em] mb-8">
              Colección 2026
            </span>
            <h1 className="text-6xl md:text-8xl xl:text-9xl font-black uppercase tracking-tighter text-[#2B2118] dark:text-white leading-[0.85] mb-8">
              {category.label} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#8D6E63]">
                Maldonado
              </span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md font-medium leading-relaxed mb-10">
              Diseño y fabricación de alta gama en Quito. Descubre nuestra línea
              exclusiva de {category.label.toLowerCase()}.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#4A3728] hover:text-white transition-all">
                Ver Catálogo
              </button>
            </div>
          </motion.div>
        </div>
        <div className="relative h-[60vh] lg:h-full order-1 lg:order-2 overflow-hidden bg-zinc-200">
          <div className="absolute inset-0 bg-black/10 z-10" />
          <img
            src={heroImage}
            className="w-full h-full object-cover"
            alt={`${category.label} Maldonado Furniture`}
          />
          {/* Badge Flotante */}
          <div className="absolute bottom-10 right-10 z-20 bg-white/90 backdrop-blur-md p-6 hidden md:block">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]">
              Categoría
            </p>
            <p className="text-xl font-black uppercase text-black">
              {category.label}
            </p>
          </div>
        </div>
      </section>
      <section className="py-32 px-6 max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[#2B2118] dark:text-[#E7DED4]">
            Explorar {category.label}
          </h2>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 mx-10 hidden md:block" />
          <HiMiniViewfinderCircle className="text-4xl text-[#4A3728]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {category.subcategories.map((sub, i) => (
            <Link key={sub.sub} href={sub.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-112.5 overflow-hidden rounded-sm cursor-pointer"
              >
                <img
                  src={sub.imageSrc}
                  alt={sub.label}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">
                    {sub.label}
                  </h3>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver Productos
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

    
      <section className="bg-white dark:bg-[#0A0A0A] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-[#2B2118] dark:text-[#E7DED4] mb-4">
              Destacados
            </h2>
            <p className="text-zinc-500">Lo mejor de {category.label}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
            {category.featuredContent.map((item, i) => (
              <Link key={i} href={item.href}>
                <motion.div
                  className="group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative aspect-4/5 bg-[#F3EFEA] dark:bg-[#1A1A1A] overflow-hidden mb-6">
                    <img
                      src={item.imageSrc}
                      className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:opacity-100 transition-opacity"
                      alt={item.title}
                    />
                    <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all">
                      <HiPlus className="text-white text-4xl" />
                    </button>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

         
                  <span
                    className={`inline-block mt-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${badgeStyles[item.badgeColor] || "bg-black text-white"}`}
                  >
                    {item.badge}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN TÉCNICA (SEO) */}
      <section className="py-24 px-6 bg-[#4A3728] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Calidad Garantizada <br /> en {category.label}
          </h2>
          <p className="text-zinc-300 text-lg font-medium leading-relaxed">
            Cada mueble es una pieza de ingeniería. Usamos materiales de primera
            calidad para asegurar que tus {category.label.toLowerCase()} duren
            toda la vida. Garantía extendida y soporte local en Quito.
          </p>
        </div>
      </section>

      {/* 5. CONTACTO — CIERRE PREMIUM */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-7xl font-black uppercase tracking-tighter dark:text-white leading-none mb-10 text-balance">
              Hablemos <br /> de tu proyecto.
            </h2>
            <div className="space-y-6">
              <div className="flex gap-6 items-center border-b border-zinc-100 dark:border-zinc-800 pb-6">
                <span className="text-3xl font-black text-[#4A3728]">01</span>
                <p className="text-xs font-black uppercase tracking-widest dark:text-zinc-400">
                  Asesoría Técnica en Quito
                </p>
              </div>
              <div className="flex gap-6 items-center border-b border-zinc-100 dark:border-zinc-800 pb-6">
                <span className="text-3xl font-black text-[#4A3728]">02</span>
                <p className="text-xs font-black uppercase tracking-widest dark:text-zinc-400">
                  Diseño 3D Personalizado
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] p-10 lg:p-16 rounded-sm shadow-2xl">
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">
                  Nombre del Proyecto
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none text-white font-bold focus:border-[#4A3728] transition-colors"
                  placeholder={`EJ: ${category.label.toUpperCase()} MASTER`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">
                  WhatsApp de contacto
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none text-white font-bold focus:border-[#4A3728] transition-colors"
                  placeholder="+593 ..."
                />
              </div>
              <button className="w-full py-6 bg-white text-black font-black uppercase text-[10px] tracking-[0.5em] hover:bg-[#4A3728] hover:text-white transition-all">
                Enviar Solicitud{" "}
                <HiArrowLongRight className="inline ml-2 text-xl" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
