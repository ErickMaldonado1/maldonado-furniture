"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  HiPlus,
  HiOutlineBriefcase,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

const subcategorias = [
  {
    name: "Escritorios",
    img: "https://images.unsplash.com/photo-1518455027359-f3f816b1a22a?q=80&w=600",
    desc: "Ergonomía y diseño",
  },
  {
    name: "Archivadores",
    img: "https://images.unsplash.com/photo-1595844730298-b960ff98fee0?q=80&w=600",
    desc: "Organización técnica",
  },
  {
    name: "Libreros",
    img: "https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=600",
    desc: "Sistemas de biblioteca",
  },
  {
    name: "Repisas",
    img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600",
    desc: "Espacios flotantes",
  },
];

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function OficinaPage() {
  return (
    <main className="mt-16 min-h-screen bg-[#FDFCFB] dark:bg-[#0B0B0B] transition-colors">
      {/* 1. HERO — PRODUCTIVIDAD Y ESTILO */}
      <section className="relative h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1800"
            className="w-full h-full object-cover"
            alt="Muebles de oficina modernos Quito"
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
              <HiOutlineBriefcase className="text-[#E7DED4] text-lg" />{" "}
              Workspace Solutions
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
              Espacios que <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E7DED4] to-[#4A3728]">
                Producen
              </span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-zinc-300 max-w-2xl font-medium leading-relaxed">
              Diseñamos tu oficina o home-office con mobiliario inteligente.
              Archivadores de alta capacidad y escritorios que se adaptan a tu
              ritmo de trabajo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORÍAS TÉCNICAS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subcategorias.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.02 }}
              className="group flex flex-col"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
              <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-[#E7DED4] tracking-tight">
                {cat.name}
              </h3>
              <p className="text-[#6B5E52] dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">
                {cat.desc}
              </p>
              <div className="mt-4 h-1 w-12 bg-[#4A3728] transition-all group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CATÁLOGO DE OFICINA — PRODUCT GRID */}
      <section className="bg-[#F8F6F4] dark:bg-[#0F0F0F] py-24 px-6 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl font-black uppercase text-[#2B2118] dark:text-[#E7DED4] tracking-tighter">
              Mobiliario Corporativo
            </h2>
            <div className="flex items-center gap-2 text-[#4A3728] font-black text-[10px] uppercase tracking-widest cursor-pointer">
              Ver Catálogo Completo <HiPlus />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-4/5 bg-white dark:bg-[#1A1A1A] rounded-xl overflow-hidden mb-4 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-black/80 z-20">
                    <button className="bg-[#4A3728] text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full">
                      Cotizar
                    </button>
                  </div>
                  <div className="p-4 flex justify-between items-start">
                    <span className="text-[9px] font-black bg-zinc-100 dark:bg-zinc-800 px-2 py-1 uppercase tracking-tighter">
                      Ref. OF-0{i}
                    </span>
                    <HiOutlineCheckBadge className="text-[#4A3728] text-xl" />
                  </div>
                </div>
                <h4 className="text-[12px] font-black uppercase text-zinc-900 dark:text-white tracking-wider">
                  Escritorio Ejecutivo M-PRO
                </h4>
                <p className="text-[10px] font-bold text-[#6B5E52] uppercase mt-1">
                  Acabado Antracita / Haya
                </p>
                <p className="mt-3 text-lg font-black text-[#4A3728]">
                  $285.00
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SEO — TEXTO DE CONFIANZA */}
      <section className="py-24 px-6 bg-white dark:bg-[#0B0B0B]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-[#E7DED4]">
            Soluciones a medida para empresas
          </h2>
          <p className="text-[#6B5E52] dark:text-zinc-400 font-medium leading-relaxed italic">
            "Entendemos que la productividad nace de un entorno ordenado. Por
            eso, nuestros archivadores y libreros están reforzados para soportar
            carga pesada, utilizando sistemas de correderas industriales en
            Quito."
          </p>
          <div className="grid grid-cols-3 gap-8 pt-10">
            <div>
              <p className="text-2xl font-black text-[#4A3728]">100%</p>
              <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">
                Madera Técnica
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#4A3728]">5 Años</p>
              <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">
                De Garantía
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#4A3728]">Quito</p>
              <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">
                Envíos Gratis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACTO — COTIZACIÓN CORPORATIVA */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative h-150 rounded-[2.5rem] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800"
            className="w-full h-full object-cover"
            alt="Proyectos corporativos Maldonado Furniture"
          />
        </div>

        <div className="bg-[#F3EFEA] dark:bg-[#141414] p-12 rounded-[2.5rem]">
          <h2 className="text-5xl font-black uppercase tracking-tighter dark:text-white leading-none mb-8">
            Cotiza tu <br /> Proyecto
          </h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                Datos de contacto
              </label>
              <input
                type="text"
                placeholder="NOMBRE O EMPRESA"
                className="w-full p-5 bg-white dark:bg-[#0B0B0B] border-none rounded-2xl text-[10px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#4A3728] dark:text-white transition-all"
              />
              <input
                type="text"
                placeholder="WHATSAPP / CELULAR"
                className="w-full p-5 bg-white dark:bg-[#0B0B0B] border-none rounded-2xl text-[10px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#4A3728] dark:text-white transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                Detalles del mobiliario
              </label>
              <textarea
                placeholder="EJ: 3 ESCRITORIOS CON ARCHIVADOR"
                rows={4}
                className="w-full p-5 bg-white dark:bg-[#0B0B0B] border-none rounded-2xl text-[10px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#4A3728] dark:text-white resize-none transition-all"
              ></textarea>
            </div>
            <button className="w-full py-6 bg-[#4A3728] text-white font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl hover:bg-black transition-all shadow-xl shadow-[#4A3728]/20">
              Solicitar Presupuesto
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
