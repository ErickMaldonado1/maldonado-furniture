"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiXMark,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineMagnifyingGlassPlus,
  HiPlus,
} from "react-icons/hi2";
import { proyectos, categorias, Proyecto } from "@/utils/proyectos";

export default function ProyectosPage() {
  const [filter, setFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [visibleItems, setVisibleItems] = useState(12);
  const filtered = useMemo(() => {
    return filter === "Todos"
      ? proyectos
      : proyectos.filter((p) => p.category === filter);
  }, [filter]);

  const displayedProjects = filtered.slice(0, visibleItems);

  const loadMore = () => setVisibleItems((prev) => prev + 8);

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setVisibleItems(8);
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImgIdx((currentImgIdx + 1) % selectedProject.gallery.length);
    }
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImgIdx(
        (currentImgIdx - 1 + selectedProject.gallery.length) %
          selectedProject.gallery.length,
      );
    }
  };

  return (
    <main className="mt-20 min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300">
      <section className="pt-16 pb-12 max-w-340 mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 border-b border-zinc-100 dark:border-zinc-900 pb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter dark:text-white leading-[0.85]">
              Proyectos{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
                Entregados
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                aria-label="categorias"
                className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300 rounded-full border 
                ${
                  filter === cat
                    ? "bg-[#4A3728] border-[#4A3728] text-white shadow-lg"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-[#4A3728]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 max-w-340 mx-auto px-6">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((proy) => (
              <motion.div
                key={proy.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setSelectedProject(proy);
                  setCurrentImgIdx(0);
                }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-900 rounded-sm shadow-sm border border-zinc-100 dark:border-zinc-900 group-hover:border-[#4A3728]/50 transition-all">
                  <img
                    src={proy.mainImg}
                    alt={proy.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <HiOutlineMagnifyingGlassPlus className="text-white text-3xl" />
                  </div>
                </div>
                <div className="mt-4 px-1">
                  <h3 className="text-sm font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
                    {proy.title}
                  </h3>
                  <p className="text-[12px] text-[#4A3728] font-bold uppercase tracking-[0.2em] mt-1">
                    {proy.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleItems < filtered.length && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={loadMore}
              aria-label="proyectos"
              className="flex items-center gap-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-10 py-5 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#4A3728] dark:hover:bg-[#4A3728] hover:text-white transition-all duration-300 group"
            >
              Cargar más proyectos
              <HiPlus className="text-xl group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-8 right-8 text-white text-4xl hover:text-[#4A3728] transition-all z-110"
              aria-label="galery"
            >
              <HiXMark />
            </button>

            <div className="relative w-full max-w-5xl flex flex-col items-center">
              <div className="relative w-full flex items-center justify-center">
                {selectedProject.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      aria-label="prev"
                      className="absolute left-0 md:-left-20 text-white text-4xl p-4 hover:text-[#4A3728] transition-colors"
                    >
                      <HiChevronLeft />
                    </button>
                    <button
                      onClick={nextImg}
                      aria-label="next"
                      className="absolute right-0 md:-right-20 text-white text-4xl p-4 hover:text-[#4A3728] transition-colors"
                    >
                      <HiChevronRight />
                    </button>
                  </>
                )}
                <motion.img
                  key={currentImgIdx}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  src={selectedProject.gallery[currentImgIdx]}
                  className="max-h-[75vh] object-contain rounded shadow-sm"
                />
              </div>
              <div className="mt-8 text-center">
                <h4 className="text-white font-black uppercase tracking-[0.2em] text-md">
                  {selectedProject.title}
                </h4>
                <p className="text-zinc-500 text-[12px] uppercase mt-2">
                  {currentImgIdx + 1} / {selectedProject.gallery.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
