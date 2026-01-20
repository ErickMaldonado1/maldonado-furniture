"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineCamera, HiOutlineMapPin } from "react-icons/hi2";

// Data de ejemplo de tus trabajos entregados
const proyectos = [
  {
    id: 1,
    title: "Cocina Integral RH",
    category: "Cocina",
    location: "Cumbayá",
    img: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "Dormitorio Master Minimal",
    category: "Dormitorio",
    location: "La Carolina",
    img: "https://images.pexels.com/photos/6585600/pexels-photo-6585600.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Walk-in Closet Roble",
    category: "Dormitorio",
    location: "Puembo",
    img: "https://images.pexels.com/photos/6301168/pexels-photo-6301168.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "Centro de TV Flotante",
    category: "Sala",
    location: "El Condado",
    img: "https://images.pexels.com/photos/5824901/pexels-photo-5824901.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "Home Office Ejecutivo",
    category: "Oficina",
    location: "Quitumbe",
    img: "https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    title: "Comedor Concepto Abierto",
    category: "Sala",
    location: "Nayón",
    img: "https://images.pexels.com/photos/6180667/pexels-photo-6180667.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const categorias = ["Todos", "Cocina", "Dormitorio", "Sala", "Oficina"];

export default function ProyectosPage() {
  const [filter, setFilter] = useState("Todos");

  const filteredProyectos =
    filter === "Todos"
      ? proyectos
      : proyectos.filter((p) => p.category === filter);

  return (
    <main className="mt-16 min-h-screen bg-[#FAFAFA] dark:bg-[#050505] transition-colors">
      {/* 1. HEADER — TÍTULO EDITORIAL */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#4A3728] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
            >
              Nuestra Trayectoria
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#2B2118] dark:text-white leading-none">
              Proyectos <br />{" "}
              <span className="text-zinc-300 dark:text-zinc-700">
                Entregados
              </span>
            </h1>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === cat
                    ? "bg-[#4A3728] text-white shadow-lg shadow-[#4A3728]/20"
                    : "bg-white dark:bg-[#141414] text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-[#4A3728]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. GRID DE PROYECTOS — ASIMÉTRICO MODERNO */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProyectos.map((proy) => (
              <motion.div
                key={proy.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <div className="relative aspect-3/4 overflow-hidden bg-zinc-200 rounded-sm">
                  <img
                    src={proy.img}
                    alt={proy.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Informativo al Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                    <div className="flex items-center gap-2 text-[#E7DED4] mb-2">
                      <HiOutlineMapPin className="text-lg" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {proy.location}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black uppercase text-white tracking-tighter mb-4">
                      {proy.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-all">
                        Ver Galería <HiOutlineCamera />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info en Mobile / Debajo de la imagen */}
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-black uppercase text-zinc-900 dark:text-white tracking-tight">
                      {proy.title}
                    </h4>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      {proy.category} — Quito
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. CTA — ¿TIENES UN PROYECTO? */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto bg-[#141414] rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center md:text-left">
          {/* Decoración */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A3728] blur-[120px] opacity-20" />

          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-8">
                Llevemos tu idea <br /> a la realidad.
              </h2>
              <p className="text-zinc-400 text-lg font-medium max-w-md">
                Cada proyecto en esta galería comenzó con un sueño. Agenda tu
                visita técnica hoy mismo.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <button className="bg-[#4A3728] text-white px-12 py-6 text-xs font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-2xl shadow-black">
                Empezar mi Proyecto
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MÁS INFORMACIÓN (SEO) */}
      <section className="py-24 px-6 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter dark:text-white mb-6">
            Instalaciones Profesionales en todo el Distrito Metropolitano
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed uppercase tracking-wider font-bold">
            Desde el Valle de los Chillos hasta el Norte de Quito, nuestro
            equipo garantiza una entrega limpia, puntual y con los más altos
            estándares de carpintería moderna.
          </p>
        </div>
      </section>
    </main>
  );
}


