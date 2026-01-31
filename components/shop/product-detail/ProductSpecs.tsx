"use client";

import { useState } from "react";
import { Icons } from "@/utils/icons";
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
  description,
  materials,
  dimensions,
  careInstructions,
}: ProductSpecsProps) {
  const [activeTab, setActiveTab] = useState("materials");

  const tabs = [
    {
      id: "materials",
      label: "Materiales",
      icon: <Icons.Sparkles />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Utilizamos materiales de la más alta calidad para garantizar la
            durabilidad y el acabado premium de cada pieza.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {materials && materials.length > 0 ? (
              materials.map((m, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A3728]" />
                  {m}
                </li>
              ))
            ) : (
              <>
                <li className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A3728]" />
                  Madera Sólida de Seike
                </li>
                <li className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A3728]" />
                  Acabado en Poliuretano
                </li>
                <li className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A3728]" />
                  Herrajes de acero inoxidable
                </li>
              </>
            )}
          </ul>
        </div>
      ),
    },
    {
      id: "dimensions",
      label: "Dimensiones",
      icon: <Icons.Cube />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]">
              Alto
            </p>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">
              {dimensions?.height || "76"} cm
            </p>
          </div>
          <div className="space-y-1 text-zinc-200 dark:text-zinc-800 hidden md:block select-none">
            /
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]">
              Ancho
            </p>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">
              {dimensions?.width || "154"} cm
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]">
              Profundidad
            </p>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">
              {dimensions?.depth || "55"} cm
            </p>
          </div>
          <div className="md:col-span-3 pt-4">
            <p className="text-xs text-zinc-500 italic">
              * Las medidas pueden variar ligeramente por el proceso artesanal.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "care",
      label: "Cuidado",
      icon: <Icons.InformationCircle />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {careInstructions ||
              "Para mantener la belleza de su mueble, límpielo con un paño suave y seco. Evite la exposición directa al sol y a la humedad excesiva. No utilice productos químicos abrasivos."}
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#4A3728]/5 border border-[#4A3728]/10 rounded-full">
              <Icons.Truck className="text-lg text-[#4A3728]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]">
                Envío Seguro
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#4A3728]/5 border border-[#4A3728]/10 rounded-full">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]">
                Hecho a Medida
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="pt-24 border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-4xl">
        <div className="flex flex-wrap gap-8 mb-12 border-b border-zinc-100 dark:border-zinc-900 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-all pb-4 ${
                activeTab === tab.id
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A3728]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tabs.find((t) => t.id === activeTab)?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
