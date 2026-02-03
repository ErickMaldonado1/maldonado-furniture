"use client";
import { useState } from "react";
import { Sparkles, Cube } from "@/utils/icons/actions";
import { InformationCircle } from "@/utils/icons/layout";
import { Truck } from "@/utils/icons/shop";
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
    <section className="pt-12 pb-4 w-full max-w-4xl mx-auto px-4">
      <div className="flex gap-8 md:gap-12 mb-10 border-b border-zinc-100 dark:border-zinc-800/50 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-3 pb-4 text-[14px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-400 hover:text-zinc-500"
            }`}
          >
            <span
              className={
                activeTab === tab.id ? "text-[#4A3728]" : "text-zinc-300"
              }
            >
              {tab.icon}
            </span>
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#4A3728]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="relative min-h-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "materials" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <p className="text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.8] font-medium">
                  Nuestra selección de materiales responde a un estándar de
                  excelencia, buscando el equilibrio perfecto entre la calidez
                  de la madera natural y la resistencia de los acabados.
                </p>
                <ul className="grid grid-cols-1 gap-4">
                  {materials.map((m, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-[16px] font-bold text-zinc-800 dark:text-zinc-200 group"
                    >
                      <div className="w-2 h-2 rounded-full border border-[#4A3728] group-hover:bg-[#4A3728] transition-colors" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "dimensions" && (
              <div className="max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: "Alto", value: dimensions?.height || "76" },
                    { label: "Ancho", value: dimensions?.width || "154" },
                    { label: "Fondo", value: dimensions?.depth || "55" },
                  ].map((dim, i) => (
                    <div
                      key={i}
                      className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col items-center"
                    >
                      <span className="text-[12px] uppercase tracking-[0.2em] text-zinc-400 font-black mb-2">
                        {dim.label}
                      </span>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-light dark:text-white">
                          {dim.value}
                        </span>
                        <span className="text-xs ml-1 text-[#4A3728] font-bold">
                          cm
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-[16px] text-zinc-400 font-medium italic flex items-center gap-2">
                  <InformationCircle className="w-4 h-4" />* Dimensiones
                  nominales con variación de +/- 4mm.
                </p>
              </div>
            )}

            {activeTab === "care" && (
              <div className="max-w-2xl">
                <p className="text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.9] font-medium mb-10">
                  {careInstructions ||
                    "Para preservar la integridad del material, recomendamos el uso de productos no abrasivos. Mantenga la pieza alejada de fuentes térmicas directas."}
                </p>
                <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A3728]/5 flex items-center justify-center">
                      <Truck className="w-6 h-6 text-[#4A3728]" />
                    </div>
                    <div>
                      <span className="block text-[14px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                        Envío Especializado
                      </span>
                      <span className="text-[14px] text-zinc-500">
                        Manejo cuidadoso de piezas
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A3728]/5 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#4A3728]" />
                    </div>
                    <div>
                      <span className="block text-[16px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                        Garantía de Fabricante
                      </span>
                      <span className="text-[14px] text-zinc-500">
                        Según pedido
                      </span>
                    </div>
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
