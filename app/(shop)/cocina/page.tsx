"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  HiPlus,
  HiOutlineSparkles,
  HiOutlineArrowSmallRight,
} from "react-icons/hi2";

const subcategorias = [
  {
    name: "Cocinas a Medida",
    img: "https://images.unsplash.com/photo-1556912177-f547c126e89a?q=80&w=600",
    desc: "Diseño total de espacio",
  },
  {
    name: "Cocinas Modulares",
    img: "https://images.unsplash.com/photo-1556909212-d5b6043929f1?q=80&w=600",
    desc: "Sistemas pre-configurados",
  },
  {
    name: "Muebles Auxiliares",
    img: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=600",
    desc: "Despensas y alacenas",
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

export default function CocinaPage() {
  return (
    <main className="mt-16 min-h-screen bg-[#FDFCFB] dark:bg-[#0B0B0B] transition-colors">
      {/* 1. HERO — EL CORAZÓN DEL HOGAR */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1800"
            className="w-full h-full object-cover"
            alt="Muebles de cocina a medida Quito"
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
              <HiOutlineSparkles className="text-[#E7DED4] text-lg animate-pulse" />{" "}
              Precision Kitchens
            </span>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.8]">
              Cocinas que <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E7DED4] to-[#4A3728]">
                Inspiran
              </span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-zinc-200 max-w-2xl font-medium leading-relaxed">
              Transformamos tu espacio culinario con materiales resistentes a la
              humedad y diseños que optimizan cada rincón. Durabilidad
              garantizada por Maldonado Furniture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SUBCATEGORÍAS — GRID ASIMÉTRICO */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subcategorias.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative h-96 rounded-[3rem] overflow-hidden shadow-xl mb-8">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#2B2118]/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-2xl font-black uppercase text-white tracking-tighter">
                    {cat.name}
                  </h3>
                  <div className="w-0 group-hover:w-full h-1 bg-[#E7DED4] transition-all duration-500" />
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4A3728] px-4">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SHOWROOM — DETALLES DE ACABADO */}
      <section className="bg-white dark:bg-[#0F0F0F] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <h2 className="text-4xl font-black uppercase text-[#2B2118] dark:text-[#E7DED4] tracking-tighter">
              Proyectos Realizados
            </h2>
            <p className="text-[#6B5E52] dark:text-zinc-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 cursor-pointer">
              Ver portafolio de instalaciones{" "}
              <HiOutlineArrowSmallRight className="text-lg" />
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-4/5 bg-[#F3EFEA] dark:bg-[#1A1A1A] rounded-2xl overflow-hidden mb-6 group-hover:shadow-2xl transition-all">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 z-20">
                    <HiPlus className="text-white text-5xl" />
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#4A3728] text-white text-[8px] font-black px-3 py-1 uppercase tracking-widest">
                      Top Ventas
                    </span>
                  </div>
                </div>
                <h4 className="text-xs font-black uppercase text-zinc-900 dark:text-white tracking-widest leading-none">
                  Cocina Serie RH-0{i}
                </h4>
                <p className="mt-2 text-[10px] font-bold text-[#6B5E52] uppercase tracking-tighter">
                  Melamina Hidrófuga Novopan
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TÉCNICO SEO — LA DIFERENCIA MALDONADO */}
      <section className="py-24 px-6 bg-[#F3EFEA] dark:bg-[#141414] border-y border-zinc-200 dark:border-zinc-800 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[#2B2118] dark:text-[#E7DED4]">
            Resistencia Absoluta
          </h2>
          <p className="text-[#5C5146] dark:text-zinc-400 font-medium leading-relaxed">
            Utilizamos exclusivamente **Melamina RH (Resistente a la Humedad)**
            para todas nuestras cocinas. Sabemos que en Quito la durabilidad es
            clave, por eso nuestros muebles auxiliares y módulos a medida
            incluyen cantos de PVC termofusionados para evitar filtraciones y
            garantizar una vida útil superior.
          </p>
          <div className="flex flex-wrap justify-center gap-10 pt-6 font-black uppercase text-[10px] tracking-widest text-[#4A3728]">
            <span>✓ Cierre Suave</span>
            <span>✓ Perfil Gola</span>
            <span>✓ Mesones Granito/Cuarzo</span>
          </div>
        </div>
      </section>

      {/* 5. CONTACTO — DISEÑO 3D GRATIS */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-6xl font-black uppercase tracking-tighter dark:text-white leading-none">
            Tu Cocina <br /> Empieza Aquí.
          </h2>
          <p className="text-lg text-[#6B5E52] dark:text-zinc-400 font-medium">
            Ofrecemos asesoría con diseño 3D incluido al contratar tu proyecto.
            Optimiza tu presupuesto con expertos en fabricación directa.
          </p>
          <div className="p-8 border-l-4 border-[#4A3728] bg-white dark:bg-[#141414] shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">
              Ubicación de Fábrica
            </p>
            <p className="text-sm font-bold dark:text-white uppercase">
              Sector Norte, Quito - Ecuador
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F0F] p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="NOMBRE Y APELLIDO"
              className="w-full p-5 bg-[#F8F6F4] dark:bg-[#1A1A1A] border-none rounded-xl text-[10px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#4A3728] dark:text-white transition-all"
            />
            <input
              type="text"
              placeholder="CELULAR (WHATSAPP)"
              className="w-full p-5 bg-[#F8F6F4] dark:bg-[#1A1A1A] border-none rounded-xl text-[10px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#4A3728] dark:text-white transition-all"
            />
            <select className="w-full p-5 bg-[#F8F6F4] dark:bg-[#1A1A1A] border-none rounded-xl text-[10px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#4A3728] dark:text-white transition-all">
              <option>COCINA A MEDIDA</option>
              <option>MUEBLES MODULARES</option>
              <option>REMODELACIÓN PARCIAL</option>
            </select>
            <textarea
              placeholder="CUÉNTANOS TUS MEDIDAS O IDEA..."
              rows={4}
              className="w-full p-5 bg-[#F8F6F4] dark:bg-[#1A1A1A] border-none rounded-xl text-[10px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#4A3728] dark:text-white resize-none"
            ></textarea>
            <button className="w-full py-6 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-xl hover:bg-[#4A3728] hover:text-white transition-all">
              Agendar Diseño 3D
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
