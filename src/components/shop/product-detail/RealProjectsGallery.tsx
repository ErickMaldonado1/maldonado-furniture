"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { proyectos, Proyecto } from "@/utils/proyectos";
import { Plus } from "@/utils/icons/actions";
import { Close } from "@/utils/icons/layout";
import { ChevronLeft, ChevronRight } from "@/utils/icons/navigation";
import { Whatsapp } from "@/utils/icons/social";
import { motion, AnimatePresence } from "framer-motion";

interface RealProjectsGalleryProps {
  category?: string | null;
  subcategory?: string | null;
  productName?: string;
}

export function RealProjectsGallery({
  category,
  subcategory,
  productName = "este mueble",
}: RealProjectsGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const matchedProjects = useMemo(() => {
    const normCat = (category || "").toLowerCase();
    const normSub = (subcategory || "").toLowerCase();

    return proyectos.filter((p) => {
      const pCat = p.category.toLowerCase();
      const pTitle = p.title.toLowerCase();

      if (normCat.includes("dormitorio") || normSub.includes("cama") || normSub.includes("closet")) {
        return pCat === "dormitorio";
      }
      if (normCat.includes("sala") || normSub.includes("tv") || normSub.includes("aparador")) {
        return pCat === "sala";
      }
      if (normCat.includes("oficina") || normSub.includes("escritorio") || normSub.includes("librero")) {
        return pCat === "oficina";
      }
      if (normCat.includes("cocina") || normSub.includes("modular")) {
        return pCat === "cocina";
      }

      return pCat === normCat;
    }).slice(0, 4);
  }, [category, subcategory]);

  if (matchedProjects.length === 0) return null;

  const allImages = selectedProject
    ? Array.from(new Set([selectedProject.mainImg, ...selectedProject.gallery]))
    : [];

  const handleConsultProject = (projectTitle: string) => {
    const origin = typeof window !== "undefined" ? window.location.href : "";
    const message = `👋 ¡Hola Muebles Maldonado! Estaba viendo "${productName}" y me encantó el proyecto real terminado: "${projectTitle}". ¿Podrían darme más información sobre costo de fabricación e instalación similar para mi hogar? Enlace: ${origin}`;
    window.open(`https://wa.me/593959504842?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="label-premium text-[#634E3A] dark:text-[#D4B896] block">
            Trabajos reales en Quito y alrededores
          </span>
          <h3 className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-white">
            Fabricados por Muebles Maldonado en Hogares Reales
          </h3>
        </div>
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
          Fotografías reales de entregas e instalaciones
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {matchedProjects.map((proj) => (
          <div
            key={proj.id}
            role="button"
            tabIndex={0}
            aria-label={`Ver proyecto ${proj.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedProject(proj);
                setCurrentImgIdx(0);
              }
            }}
            onClick={() => {
              setSelectedProject(proj);
              setCurrentImgIdx(0);
            }}
            className="group cursor-pointer rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#634E3A]"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={proj.mainImg}
                alt={proj.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2 rounded-full bg-white/90 text-[#4A3728] shadow">
                  <Plus className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
            <div className="p-2.5 flex flex-col flex-1">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-1 group-hover:text-[#634E3A] transition-colors">
                {proj.title}
              </h4>
              <span className="label-premium text-zinc-600 dark:text-zinc-400 mt-0.5">
                {proj.category} • Instalado
              </span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
              aria-label="Cerrar modal"
            >
              <Close className="w-5 h-5" />
            </button>

            <div
              className="relative w-full max-w-4xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full flex items-center justify-center">
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImgIdx(
                          (currentImgIdx - 1 + allImages.length) % allImages.length,
                        )
                      }
                      className="absolute left-2 text-white p-3 rounded-full bg-black/50 hover:bg-black/80 transition-all z-10"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImgIdx((currentImgIdx + 1) % allImages.length)
                      }
                      className="absolute right-2 text-white p-3 rounded-full bg-black/50 hover:bg-black/80 transition-all z-10"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                <div className="relative max-h-[70vh] flex items-center justify-center">
                  <motion.img
                    key={currentImgIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={allImages[currentImgIdx]}
                    alt={selectedProject.title}
                    className="max-h-[70vh] object-contain rounded-xl shadow-2xl"
                  />
                </div>
              </div>

              <div className="mt-4 text-center space-y-2">
                <h4 className="text-white font-bold text-base sm:text-lg">
                  {selectedProject.title}
                </h4>
                <p className="text-zinc-400 text-xs">
                  Foto {currentImgIdx + 1} de {allImages.length} • Proyecto entregado por Muebles Maldonado
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => handleConsultProject(selectedProject.title)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white label-premium text-white! font-medium tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Whatsapp className="w-4 h-4 text-white" />
                    <span>Cotizar este diseño por WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
