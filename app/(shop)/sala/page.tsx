"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  HiPlus,
  HiOutlineChevronRight,
  HiOutlineLightningBolt,
} from "react-icons/hi";

// Data de subcategorías para el área social
const subcategorias = [
  {
    name: "Aparadores",
    img: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=600",
    desc: "Almacenamiento con estilo",
  },
  {
    name: "Muebles de TV",
    img: "https://images.unsplash.com/photo-1593085260707-5377ba34f968?q=80&w=600",
    desc: "Centros de entretenimiento",
  },
  {
    name: "Mesas de Centro",
    img: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=600",
    desc: "El corazón de tu sala",
  },
  {
    name: "Comedores",
    img: "https://images.unsplash.com/photo-1617806118233-f8e187f42894?q=80&w=600",
    desc: "Espacios para compartir",
  },
];

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function SalaPage() {
  return (
    <main className="mt-16 min-h-screen bg-[#FDFCFB] dark:bg-[#0B0B0B] transition-colors">
      {/* 1. HERO — IMPACTO VISUAL (ÁREA SOCIAL) */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src="https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?q=80&w=1800"
            className="w-full h-full object-cover"
            alt="Diseño de salas modernas en Quito"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <span className="flex items-center gap-2 text-[#E7DED4] font-black uppercase tracking-[0.4em] text-xs mb-6">
              <HiOutlineLightningBolt className="text-[#E7DED4]" /> Mobiliario
              de Autor
            </span>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85]">
              Vivir con <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E7DED4] to-[#4A3728]">
                Propósito
              </span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-zinc-200 max-w-2xl font-medium leading-relaxed">
              Desde aparadores minimalistas hasta centros de entretenimiento que
              transforman tu hogar. Fabricación directa con acabados en
              tendencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. EXPLORACIÓN — BENTO GRID DE CATEGORÍAS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-black uppercase text-[#2B2118] dark:text-[#E7DED4] tracking-tighter">
            Colecciones
          </h2>
          <div className="h-1 w-20 bg-[#4A3728] mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subcategorias.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ y: -8 }}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white font-black uppercase tracking-widest text-xl">
                  {cat.name}
                </h3>
                <p className="text-zinc-300 text-[10px] font-bold uppercase tracking-widest mt-1 group-hover:text-[#E7DED4] transition-colors">
                  {cat.desc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Explorar <HiOutlineChevronRight />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SHOWROOM — PRODUCTOS DESTACADOS */}
      <section className="bg-white dark:bg-[#0F0F0F] py-24 px-6 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <h2 className="text-3xl font-black uppercase text-[#2B2118] dark:text-[#E7DED4] tracking-tighter">
              Piezas de Exhibición
            </h2>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest">
                Nuevos
              </button>
              <button className="px-6 py-2 border border-zinc-200 dark:border-zinc-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                Más vendidos
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-4/5 bg-[#F3EFEA] dark:bg-[#1A1A1A] rounded-4xl overflow-hidden mb-6 border border-zinc-100 dark:border-zinc-800">
                  <button className="absolute inset-0 bg-[#4A3728]/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center text-white z-10">
                    <HiPlus className="text-4xl" />
                  </button>
                  <div className="absolute top-6 right-6 bg-white/90 dark:bg-black/80 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest z-10">
                    Novopan Premium
                  </div>
                </div>
                <h4 className="text-sm font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-none">
                  Aparador Minimal M-{i}
                </h4>
                <p className="mt-1 text-[11px] font-bold text-[#6B5E52] uppercase tracking-tighter">
                  Colección Caramelo / Negro
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-black text-[#4A3728]">$520.00</p>
                  <span className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800 mx-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SEO & FILOSOFÍA MATERIAL */}
      <section className="py-32 px-6 bg-[#0B0B0B] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.h2
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            Donde el diseño <br /> encuentra su hogar.
          </motion.h2>
          <p className="text-zinc-400 text-lg leading-relaxed font-medium">
            En <strong>Maldonado Furniture</strong>, convertimos el área social
            en el epicentro de tu casa. Nuestros muebles de sala están diseñados
            para resistir el uso diario sin perder la elegancia. Utilizamos
            herrajes de alta gama con cierre suave y melaminas texturizadas que
            aportan una experiencia táctil única.
          </p>
        </div>
      </section>

      {/* 5. CONTACTO & ASESORÍA PERSONALIZADA */}
      <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="w-full lg:w-1/2 space-y-10">
          <div>
            <h2 className="text-6xl font-black uppercase tracking-tighter dark:text-white leading-none">
              Tu sala, <br /> a tu manera.
            </h2>
            <p className="mt-6 text-[#6B5E52] dark:text-zinc-400 font-medium text-lg leading-relaxed">
              ¿Viste una idea en Pinterest o Mobel 6000? Nosotros la hacemos
              realidad ajustada a tus medidas.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="p-8 bg-[#F3EFEA] dark:bg-[#141414] rounded-3xl border border-[#4A3728]/10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4A3728] mb-2">
                Visita Técnica
              </h4>
              <p className="text-sm font-bold dark:text-white">
                Agendamos una cita en tu domicilio en Quito para toma de medidas
                exacta.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white dark:bg-[#0F0F0F] p-10 rounded-[3rem] shadow-2xl shadow-[#4A3728]/5 border border-zinc-100 dark:border-zinc-800">
          <form className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="NOMBRE"
                className="w-full p-6 bg-zinc-50 dark:bg-[#141414] border-none rounded-2xl text-[10px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#4A3728] dark:text-white"
              />
              <input
                type="text"
                placeholder="CELULAR"
                className="w-full p-6 bg-zinc-50 dark:bg-[#141414] border-none rounded-2xl text-[10px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#4A3728] dark:text-white"
              />
            </div>
            <textarea
              placeholder="DESCRIBE TU PROYECTO (EJ: MUEBLE DE TV FLOTANTE)"
              rows={5}
              className="w-full p-6 bg-zinc-50 dark:bg-[#141414] border-none rounded-2xl text-[10px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#4A3728] dark:text-white resize-none"
            ></textarea>
            <button className="w-full py-6 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl hover:bg-[#4A3728] hover:text-white transition-all">
              Enviar Mensaje a Taller
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
