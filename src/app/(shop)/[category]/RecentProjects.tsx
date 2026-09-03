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
        (currentImgIdx - 1 + allImages.length) % allImages.length,
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
    <section className="py-10 md:py-20 bg-[#FDFCFB] dark:bg-black border-t border-zinc-100 dark:border-zinc-900 transition-colors">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-12">
          <div className="space-y-2">
            <span className="text-[#4A3728] text-md sm:text-md font-semibold uppercase block">
              {currentHeader.subtitle}
            </span>
            <h2 className="text-xl sm:text-xl md:text-3xl font-medium text-zinc-900 dark:text-white uppercase">
              {currentHeader.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-700 dark:text-zinc-400 max-w-sm mt-4 md:mt-0 text-justify md:text-right">
            Cada espacio es fabricado e instalado a medida, cuidando cada
            detalle estructural y estético para tu hogar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setCurrentImgIdx(0);
              }}
              className="group cursor-pointer"
            >
              <div
                className="relative aspect-4/3 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900"
                onContextMenu={(e) => e.preventDefault()}
              >
                <Image
                  src={project.mainImg}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03] select-none"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  draggable={false}
                />

                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#4A3728] opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                  <Plus className="h-4 w-4" />
                </div>
              </div>

              <h3 className="mt-3 text-base font-medium text-zinc-900 dark:text-white transition-colors group-hover:text-[#4A3728]">
                {project.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/proyectos"
            className="group inline-flex items-center gap-3 rounded-md border border-zinc-400 dark:border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-all duration-300 hover:border-[#4A3728] hover:bg-[#4A3728] hover:text-white"
          >
            Ver todos los proyectos
            <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
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
                <div
                  className="relative flex items-center justify-center max-h-[75vh]"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <motion.img
                    key={currentImgIdx}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    src={allImages[currentImgIdx]}
                    alt={selectedProject.title}
                    className="max-h-[75vh] object-contain rounded-xl shadow-2xl select-none"
                    draggable={false}
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden rounded-xl opacity-90">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 mb-1">
                      <Image
                        src="/assets/images/logoA1.webp"
                        alt="Watermark Muebles Maldonado"
                        fill
                        className="object-contain drop-shadow-md"
                        draggable={false}
                      />
                    </div>
                    <div className="text-white font-semibold text-xs md:text-sm tracking-wide drop-shadow-md">
                      +593 95 950 4842
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h4 className="text-white font-black uppercase -[0.2em] text-base">
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
