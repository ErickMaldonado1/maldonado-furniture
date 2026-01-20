"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  HiPlus,
  HiOutlineSparkles,
  HiArrowLongRight,
  HiMiniViewfinderCircle,
} from "react-icons/hi2";

const categorias = [
  {
    name: "Camas Lineales",
    img: "https://images.pexels.com/photos/6489117/pexels-photo-6489117.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Minimalismo estructural",
  },
  {
    name: "Camas Juveniles",
    img: "https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Espacios dinámicos",
  },
  {
    name: "Closets",
    img: "https://images.pexels.com/photos/6301180/pexels-photo-6301180.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Orden inteligente",
  },
  {
    name: "Veladores",
    img: "https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Detalles que acompañan",
  },
];

const fadeUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function DormitorioPage() {
  return (
    <main className="mt-16 min-h-screen bg-[#FDFCFB] dark:bg-[#050505] transition-colors overflow-x-hidden">
      {/* 1. HERO — SPLIT LAYOUT (MODERNISMO PURO) */}
      <section className="relative min-h-[90vh] grid lg:grid-cols-2 items-center">
        {/* Lado Izquierdo: Texto */}
        <div className="relative z-20 px-6 lg:px-20 py-20 order-2 lg:order-1">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#4A3728] text-white text-[9px] font-black uppercase tracking-[0.4em] mb-8">
              Dormitorios 2026
            </span>
            <h1 className="text-6xl md:text-8xl xl:text-9xl font-black uppercase tracking-tighter text-[#2B2118] dark:text-white leading-[0.85] mb-8">
              Arquitectura <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#8D6E63]">
                Del Sueño
              </span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md font-medium leading-relaxed mb-10">
              Sistemas de descanso fabricados con precisión material en Quito.
              Muebles que trascienden la tendencia.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#4A3728] hover:text-white transition-all">
                Ver Proyectos
              </button>
            </div>
          </motion.div>
        </div>

        {/* Lado Derecho: Imagen de Gran Formato */}
        <div className="relative h-[60vh] lg:h-full order-1 lg:order-2 overflow-hidden bg-zinc-200">
          <div className="absolute inset-0 bg-black/10 z-10" />
          <img
            src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="w-full h-full object-cover"
            alt="Dormitorio Maldonado Furniture"
          />
          {/* Badge Flotante */}
          <div className="absolute bottom-10 right-10 z-20 bg-white/90 backdrop-blur-md p-6 hidden md:block">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]">
              Material Destacado
            </p>
            <p className="text-xl font-black uppercase text-black">
              Roble Caramelo
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORÍAS — GRID TÉCNICO */}
      <section className="py-32 px-6 max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[#2B2118] dark:text-[#E7DED4]">
            Explorar Líneas
          </h2>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 mx-10 hidden md:block" />
          <HiMiniViewfinderCircle className="text-4xl text-[#4A3728]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categorias.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-112.5 overflow-hidden rounded-sm cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">
                  {cat.name}
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver Catálogo
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. PRODUCT SHOWCASE — ESTILO MINIMALISTA */}
      <section className="bg-white dark:bg-[#0A0A0A] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-4/5 bg-[#F3EFEA] dark:bg-[#1A1A1A] overflow-hidden mb-6">
                  <img
                    src={`https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=800`}
                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:opacity-100 transition-opacity"
                    alt="Producto"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all">
                    <HiPlus className="text-white text-4xl" />
                  </button>
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                  Cama Minimalist S-0{i + 1}
                </h4>
                <p className="text-lg font-black text-[#4A3728] mt-2">
                  $420.00
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN TÉCNICA (SEO) */}
      <section className="py-24 px-6 bg-[#4A3728] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Ingeniería Maderera <br /> Aplicada al Descanso.
          </h2>
          <p className="text-zinc-300 text-lg font-medium leading-relaxed">
            Cada mueble es una pieza de ingeniería. Usamos tableros RH
            hidrófugos de alta densidad, garantizando que el clima de Quito no
            afecte la estructura de tus closets o camas. Acabados
            termofusionados que resisten el paso del tiempo.
          </p>
        </div>
      </section>

      {/* 5. CONTACTO — CIERRE PREMIUM */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-7xl font-black uppercase tracking-tighter dark:text-white leading-none mb-10 text-balance">
              Hablemos <br /> de tu espacio.
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
                  placeholder="EJ: DORMITORIO MASTER"
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
