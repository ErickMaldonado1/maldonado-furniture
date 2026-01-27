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
    categories: [] as string[],
    subcategories: [] as string[],
  });
  const [sortBy, setSortBy] = useState("recent");
  const availableCategories = useMemo(
    () =>
      Array.from(
        new Set(initialProducts.map((p) => p.category).filter(Boolean)),
      ),
    [initialProducts],
  );

  const availableSubcategories = useMemo(
    () =>
      Array.from(
        new Set(initialProducts.map((p) => p.subcategory).filter(Boolean)),
      ),
    [initialProducts],
  );

  const toggleFilter = (key: "categories" | "subcategories", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((i) => i !== value)
        : [...prev[key], value],
    }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    if (filters.subcategories.length > 0) {
      result = result.filter((p) =>
        filters.subcategories.includes(p.subcategory),
      );
    }

    if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [initialProducts, filters, sortBy]);

  const clearFilters = () => setFilters({ categories: [], subcategories: [] });

  const FilterGroup = () => (
    <div className="space-y-8">
      {availableCategories.length > 0 && (
        <FilterSection title="Categoría" defaultOpen>
          <div className="space-y-2 mt-4">
            {availableCategories.map((cat: any) => (
              <label
                key={cat}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => toggleFilter("categories", cat)}
                    className="peer appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-700 rounded-sm checked:bg-[#4A3728] checked:border-[#4A3728] transition-all"
                  />
                  <HiOutlineXMark className="absolute text-white w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-widest transition-colors ${filters.categories.includes(cat) ? "text-[#4A3728]" : "text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200"}`}
                >
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {availableSubcategories.length > 0 && (
        <FilterSection title="Subcategoría" defaultOpen>
          <div className="space-y-2 mt-4">
            {availableSubcategories.map((sub: any) => (
              <label
                key={sub}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={filters.subcategories.includes(sub)}
                    onChange={() => toggleFilter("subcategories", sub)}
                    className="peer appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-700 rounded-sm checked:bg-[#4A3728] checked:border-[#4A3728] transition-all"
                  />
                  <HiOutlineXMark className="absolute text-white w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-widest transition-colors ${filters.subcategories.includes(sub) ? "text-[#4A3728]" : "text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200"}`}
                >
                  {sub}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      <button
        onClick={clearFilters}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-red-500 transition-colors pt-4"
        aria-label="restablecer filtros"
      >
        <HiOutlineTrash size={16} /> Restablecer filtros
      </button>
    </div>
  );

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-32">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-zinc-400 border-l-2 border-[#4A3728] pl-4">
              Refinar Selección
            </h3>
            <FilterGroup />
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-10 border-b border-zinc-100 dark:border-zinc-900 pb-6">
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-1 rounded-sm">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded-sm transition-all ${gridCols === 3 ? "bg-white dark:bg-zinc-800 text-black shadow-sm" : "text-zinc-400"}`}
                  aria-label="square"
                >
                  <HiSquares2X2 size={18} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded-sm transition-all ${gridCols === 4 ? "bg-white dark:bg-zinc-800 text-black shadow-sm" : "text-zinc-400"}`}
                  aria-label="view-columns"
                >
                  <HiViewColumns size={18} />
                </button>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                {filteredProducts.length} Artículos
              </span>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer text-zinc-600 dark:text-zinc-400"
              >
                <option value="recent">Novedad</option>
                <option value="price_asc">Precio: Menor a Mayor</option>
                <option value="price_desc">Precio: Mayor a Menor</option>
              </select>
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-[#1A1A1A] dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                aria-label="fitros"
              >
                <HiOutlineAdjustmentsHorizontal size={18} /> Filtros
              </button>
            </div>
          </div>

          <div
            className={`grid gap-x-8 gap-y-16 transition-all duration-700 ${gridCols === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"}`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-300 mb-6">
                <HiOutlineTrash size={40} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                No encontramos productos
              </h3>
              <p className="text-zinc-500 max-w-sm">
                Prueba ajustando tus filtros para encontrar lo que buscas.
              </p>
              <button
                onClick={clearFilters}
                className="mt-8 text-sm font-black uppercase tracking-widest border-b-2 border-zinc-900 dark:border-white pb-1"
                aria-label="limpiar-filtros"
              >
                Limpiar todo
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-100 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-4 right-4 w-70 sm:w-[320px] bg-white dark:bg-[#0A0A0A] z-101 rounded-3xl flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="px-8 py-8 flex justify-between items-center border-b border-zinc-50 dark:border-zinc-900">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white">
                  Filtrar
                </h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                  aria-label="open-filtros"
                >
                  <HiOutlineXMark size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <FilterGroup />
              </div>
              <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-5 bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all"
                  aria-label="resultados"
                >
                  Ver resultados
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
    <div className="border-b border-zinc-100 dark:border-zinc-900 pb-8 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full group py-2"
        aria-label="filter-section"
      >
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100 group-hover:text-[#4A3728] transition-colors">
          {title}
        </span>
        <HiOutlineChevronDown
          className={`transition-transform duration-500 text-zinc-400 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
