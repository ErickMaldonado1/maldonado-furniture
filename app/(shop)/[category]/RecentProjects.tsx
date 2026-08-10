"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { proyectos, Proyecto } from "@/utils/proyectos";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "@/utils/icons/layout";
import { Plus } from "@/utils/icons/actions";
import { ChevronLeft, ChevronRight } from "@/utils/icons/navigation";

export default function RecentProjects({
  categorySlug,
}: {
  categorySlug: string;
}) {
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const normalizedSlug = categorySlug.toLowerCase();
  const categoryProjects = proyectos
    .filter((p) => {
      const pCategory = p.category.toLowerCase();
      const pTitle = p.title.toLowerCase();

      if (normalizedSlug === "closets") {
        return (
          pCategory.includes("closet") ||
          (pCategory.includes("dormitorio") &&
            (pTitle.includes("closet") ||
              pTitle.includes("roper") ||
              pTitle.includes("walking")))
        );
      }

      if (normalizedSlug === "cocina") {
        return pCategory.includes("cocina") || pTitle.includes("cocina");
      }

      return (
        pCategory.includes(normalizedSlug) || normalizedSlug.includes(pCategory)
      );
    })
    .slice(0, 6);

  if (categoryProjects.length === 0) return null;

  const allImages = selectedProject
    ? Array.from(new Set([selectedProject.mainImg, ...selectedProject.gallery]))
    : [];

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allImages.length > 0) {
      setCurrentImgIdx((currentImgIdx + 1) % allImages.length);
    }
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allImages.length > 0) {
      setCurrentImgIdx(
        (currentImgIdx - 1 + allImages.length) % allImages.length
      );
    }
  };

  const titlesMap: Record<string, { subtitle: string; title: string }> = {
    cocina: {
      subtitle: "Diseño y fabricación exclusiva",
      title: "Cocinas a Medida",
    },
    closets: {
      subtitle: "Optimización y funcionalidad",
      title: "Clósets y Walking Clósets",
    },
  };

  const currentHeader = titlesMap[normalizedSlug] || {
    subtitle: "Galería de proyectos",
    title: `Proyectos de ${categorySlug}`,
  };

  return (
    <section className="py-20 bg-[#FDFCFB] dark:bg-black border-t border-zinc-100 dark:border-zinc-900 transition-colors">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-2">
            <span className="text-[#4A3728] text-xs sm:text-sm font-black uppercase block">
              {currentHeader.subtitle}
            </span>
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-medium text-zinc-900 dark:text-white uppercase">
              {currentHeader.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mt-4 md:mt-0 text-justify md:text-right">
            Cada espacio es fabricado e instalado a medida, cuidando cada
            detalle estructural y estético para tu hogar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categoryProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setCurrentImgIdx(0);
              }}
              className="group relative rounded-sm overflow-hidden bg-white dark:bg-[#0A0A0A] shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:border-[#4A3728] dark:hover:border-[#4A3728] cursor-pointer"
            >
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={project.mainImg}
                  alt={project.title}
                  fill
                  className="object-cover grayscale-[0.1] transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-2.5 rounded-sm text-[#4A3728] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4" />
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between">
                <h3 className="text-lg md:text-lg font-medium tracking-tight text-zinc-900 dark:text-white group-hover:text-[#4A3728] transition-colors leading-snug truncate">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/proyectos"
            className="flex items-center gap-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-10 py-5 rounded-sm text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#4A3728] dark:hover:bg-[#4A3728] hover:text-white transition-all duration-300 group"
          >
            Ver todos los proyectos
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </Link>
        </div>
      </div>

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
              className="absolute top-8 right-8 text-white p-2 hover:text-[#4A3728] transition-all z-110 bg-zinc-800/50 rounded-full"
              aria-label="Cerrar galería"
            >
              <Close className="w-5 h-5" />
            </button>

            <div className="relative w-full max-w-5xl flex flex-col items-center">
              <div className="relative w-full flex items-center justify-center">
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      aria-label="Anterior"
                      className="absolute left-2 md:-left-12 text-white p-3 bg-zinc-800/40 hover:bg-zinc-800 rounded-full hover:text-[#4A3728] transition-colors z-10"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImg}
                      aria-label="Siguiente"
                      className="absolute right-2 md:-right-12 text-white p-3 bg-zinc-800/40 hover:bg-zinc-800 rounded-full hover:text-[#4A3728] transition-colors z-10"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                <motion.img
                  key={currentImgIdx}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  src={allImages[currentImgIdx]}
                  alt={selectedProject.title}
                  className="max-h-[75vh] object-contain rounded-xl shadow-2xl"
                />
              </div>
              <div className="mt-6 text-center">
                <h4 className="text-white font-black uppercase tracking-[0.2em] text-base">
                  {selectedProject.title}
                </h4>
                <p className="text-zinc-400 text-xs uppercase  mt-1">
                  Imagen {currentImgIdx + 1} de {allImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
