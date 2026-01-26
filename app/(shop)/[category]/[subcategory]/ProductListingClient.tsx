"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineChevronDown,
  HiOutlineXMark,
  HiOutlineAdjustmentsHorizontal,
  HiSquares2X2,
  HiViewColumns,
  HiOutlineTrash,
} from "react-icons/hi2";
import ProductCard from "@/components/shop/ProductCard";

const VISUAL_FILTERS = {
  acabados: [
    {
      id: "roble",
      label: "Roble",
      img: "https://images.unsplash.com/photo-1581447100595-3a813552212a?w=100&q=80",
    },
    {
      id: "nogal",
      label: "Nogal",
      img: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?w=100&q=80",
    },
    {
      id: "marmol",
      label: "Mármol",
      img: "https://images.unsplash.com/photo-1588345921523-c2dce27769cd?w=100&q=80",
    },
    {
      id: "lacado",
      label: "Blanco",
      img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=100&q=80",
    },
  ],
  estilos: ["Minimalista", "Industrial", "Contemporáneo", "Rústico"],
  dimensiones: ["180 x 90 cm", "200 x 100 cm", "Modular"],
};

export default function ProductListingClient({
  initialProducts = [],
}: {
  initialProducts: any[];
}) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState(3);
  const [filters, setFilters] = useState({
    acabado: [] as string[],
    estilo: [] as string[],
    dimension: [] as string[],
  });

  const toggleFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((i) => i !== value)
        : [...prev[key], value],
    }));
  };

  const clearFilters = () =>
    setFilters({ acabado: [], estilo: [], dimension: [] });

  // Componente de Filtros (Se usa en Sidebar y en Móvil)
  const FilterGroup = () => (
    <div className="space-y-10">
      <FilterSection title="Acabado y Color" defaultOpen>
        <div className="grid grid-cols-4 gap-4 pt-5">
          {VISUAL_FILTERS.acabados.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleFilter("acabado", item.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${filters.acabado.includes(item.id) ? "border-black scale-90" : "border-zinc-100 group-hover:border-zinc-300"}`}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-[8px] font-black uppercase tracking-widest ${filters.acabado.includes(item.id) ? "text-black" : "text-zinc-400"}`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Estilo">
        <div className="flex flex-wrap gap-2 pt-4">
          {VISUAL_FILTERS.estilos.map((s) => (
            <button
              key={s}
              onClick={() => toggleFilter("estilo", s)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase border transition-all ${filters.estilo.includes(s) ? "bg-black text-white border-black" : "text-zinc-500 border-zinc-200 hover:border-black"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Dimensiones">
        <div className="space-y-3 pt-4">
          {VISUAL_FILTERS.dimensiones.map((d) => (
            <button
              key={d}
              onClick={() => toggleFilter("dimension", d)}
              className="flex items-center justify-between w-full group"
            >
              <span
                className={`text-xs uppercase tracking-widest transition-colors ${filters.dimension.includes(d) ? "text-black font-bold" : "text-zinc-400"}`}
              >
                {d}
              </span>
              <div
                className={`w-1.5 h-1.5 rounded-full ${filters.dimension.includes(d) ? "bg-black" : "bg-transparent border border-zinc-200"}`}
              />
            </button>
          ))}
        </div>
      </FilterSection>

      <button
        onClick={clearFilters}
        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-red-500 pt-4 transition-colors"
      >
        <HiOutlineTrash size={14} /> Limpiar Filtros
      </button>
    </div>
  );

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-40">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-zinc-300">
              Refinar Búsqueda
            </h3>
            <FilterGroup />
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-1">
          {/* TOOLBAR */}
          <div className="flex justify-between items-center mb-12 border-b border-zinc-100 pb-6">
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => setGridCols(3)}
                  className={`${gridCols === 3 ? "text-black" : "text-zinc-300"}`}
                >
                  <HiSquares2X2 size={20} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`${gridCols === 4 ? "text-black" : "text-zinc-300"}`}
                >
                  <HiViewColumns size={20} />
                </button>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Artículos: {initialProducts.length}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer">
                <option>Ordenar por</option>
                <option>Precio: Menor</option>
                <option>Precio: Mayor</option>
              </select>
              {/* BOTÓN FILTROS MÓVIL (VISUALMENTE) */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest"
              >
                <HiOutlineAdjustmentsHorizontal size={16} /> Filtros
              </button>
            </div>
          </div>

          {/* GRID PRODUCTOS */}
          <div
            className={`grid gap-x-6 gap-y-12 transition-all duration-500 ${gridCols === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}
          >
            {initialProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* PANEL MÓVIL (BOTTOM SHEET) */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-x-0 bottom-0 h-[85vh] bg-white z-101 rounded-t-[2.5rem] flex flex-col overflow-hidden"
            >
              <div className="w-10 h-1 bg-zinc-200 rounded-full mx-auto mt-4 mb-2" />
              <div className="px-8 py-6 flex justify-between items-center border-b border-zinc-50">
                <h2 className="text-xs font-black uppercase tracking-widest">
                  Filtrar Selección
                </h2>
                <button onClick={() => setIsMobileFiltersOpen(false)}>
                  <HiOutlineXMark size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <FilterGroup />
              </div>
              <div className="p-8 bg-white border-t border-zinc-100">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-5 bg-black text-white rounded-full font-black uppercase text-[10px] tracking-widest"
                >
                  Aplicar Cambios
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterSection({ title, children, defaultOpen = false }: any) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-zinc-100 pb-8 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full group"
      >
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">
          {title}
        </span>
        <HiOutlineChevronDown
          className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
