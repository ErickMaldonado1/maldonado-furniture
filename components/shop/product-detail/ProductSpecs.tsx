"use client";

import { useState } from "react";
import { InformationCircle, Sparkles, Cube, Truck } from "@/utils/icons/index";
import { motion, AnimatePresence } from "framer-motion";

interface ProductSpecsProps {
  description?: string;
  materials?: string[];
  dimensions?: {
    height: number;
    width: number;
    depth: number;
  };
  careInstructions?: string;
}

export function ProductSpecs({
  materials = [
    "Madera Sólida de Seike",
    "Acabado en Poliuretano",
    "Herrajes de acero inoxidable",
  ],
  dimensions,
  careInstructions,
}: ProductSpecsProps) {
  const [activeTab, setActiveTab] = useState("materials");

  const tabs = [
    {
      id: "materials",
      label: "Materiales",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: "dimensions",
      label: "Dimensiones",
      icon: <Cube className="w-4 h-4" />,
    },
    {
      id: "care",
      label: "Cuidado",
      icon: <InformationCircle className="w-4 h-4" />,
    },
  ];

  return (
    <section className="py-16 w-full max-w-4xl mx-auto">
      {/* Tab Navigation - Más limpia y con espaciado uniforme */}
      <div className="flex gap-10 mb-10 border-b border-zinc-100 dark:border-zinc-800/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2.5 pb-5 text-[14px] font-bold uppercase tracking-[0.15em] transition-all ${
              activeTab === tab.id
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
          >
            <span className={activeTab === tab.id ? "text-[#4A3728]" : ""}>
              {tab.icon}
            </span>
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#4A3728]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative min-h-45">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {activeTab === "materials" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <p className="text-[14px] text-zinc-500 dark:text-zinc-400 leading-[1.8] font-light">
                  Nuestra selección de materiales responde a un estándar de
                  excelencia, buscando el equilibrio perfecto entre la calidez
                  de la madera natural y la resistencia de los acabados
                  contemporáneos.
                </p>
                <ul className="space-y-4">
                  {materials.map((m, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-[14px] text-zinc-800 dark:text-zinc-200 group"
                    >
                      <span className="w-1.5 h-px bg-[#4A3728] transition-all group-hover:w-3" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "dimensions" && (
              <div className="max-w-3xl">
                <div className="grid grid-cols-3 gap-0 border border-zinc-100 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-transparent">
                  <div className="p-8 text-center border-r border-zinc-100 dark:border-zinc-800">
                    <span className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-3 font-bold">
                      Alto
                    </span>
                    <span className="text-[20px] font-light tracking-tight text-zinc-900 dark:text-white">
                      {dimensions?.height || "76"}
                      <span className="text-[14px] ml-1 text-zinc-400">cm</span>
                    </span>
                  </div>
                  <div className="p-8 text-center border-r border-zinc-100 dark:border-zinc-800">
                    <span className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-3 font-bold">
                      Ancho
                    </span>
                    <span className="text-[20px] font-light tracking-tight text-zinc-900 dark:text-white">
                      {dimensions?.width || "154"}
                      <span className="text-[14px] ml-1 text-zinc-400">cm</span>
                    </span>
                  </div>
                  <div className="p-8 text-center">
                    <span className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-3 font-bold">
                      Fondo
                    </span>
                    <span className="text-[20px] font-light tracking-tight text-zinc-900 dark:text-white">
                      {dimensions?.depth || "55"}
                      <span className="text-[14px] ml-1 text-zinc-400">cm</span>
                    </span>
                  </div>
                </div>
                <p className="mt-6 text-[13px] text-zinc-400 font-light italic">
                  * Las dimensiones son nominales y pueden variar +/- 2mm debido
                  al carácter orgánico de la madera.
                </p>
              </div>
            )}

            {activeTab === "care" && (
              <div className="max-w-2xl space-y-8">
                <p className="text-[14px] text-zinc-500 dark:text-zinc-400 leading-[1.8] font-light">
                  {careInstructions ||
                    "Para preservar la integridad del material, recomendamos el uso de productos no abrasivos. Mantenga la pieza alejada de fuentes térmicas directas y limpie derrames de líquidos de forma inmediata con un paño seco."}
                </p>
                <div className="flex flex-wrap gap-6 pt-4 border-t border-zinc-50 dark:border-zinc-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-[#4A3728]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                      Envío Especializado
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#4A3728]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                      Garantía de Autor
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
