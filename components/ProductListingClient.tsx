"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/utils/icons";

import { FilterGroup } from "@/components/shop/filter-group/FilterGroup";
import { useProductFilters } from "@/hooks/useProductFilters";
import ProductCard from "@/components/shop/ProductCard";

export default function ProductListingClient({
  initialProducts = [],
  hideCategoryFilter = false,
  hideSubcategoryFilter = false,
}: {
  initialProducts: any[];
  hideCategoryFilter?: boolean;
  hideSubcategoryFilter?: boolean;
}) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4);

  const {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    toggleFilter,
    filteredProducts,
    clearFilters,
    availableOptions,
  } = useProductFilters(initialProducts);

  const cleanedOptions = {
    ...availableOptions,
    categories: hideCategoryFilter ? [] : availableOptions.categories,
    subcategories: hideSubcategoryFilter ? [] : availableOptions.subcategories,
  };

  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileFiltersOpen]);

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-32 pt-1">
            <FilterGroup
              options={cleanedOptions}
              filters={filters}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
              setFilters={setFilters}
            />
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 p-1 rounded-full">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-full transition-all ${
                    gridCols === 3
                      ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  <Icons.Squares2X2 width={20} height={20} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-full transition-all ${
                    gridCols === 4
                      ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  <Icons.ViewColumns width={20} height={20} />
                </button>
              </div>
              <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400">
                {filteredProducts.length} Artículos
              </span>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-[11px] md:text-[12px] font-black uppercase tracking-widest cursor-pointer focus:ring-0"
              >
                <option value="recent">Novedades</option>
                <option value="price_asc">Precio: más bajo</option>
                <option value="price_desc">Precio: más alto</option>
              </select>

              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
              >
                <Icons.AdjustmentsHorizontal width={18} height={18} /> Filtros
              </button>
            </div>
          </div>

          {/* GRID DE PRODUCTOS O ESTADO VACÍO */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
                className={`grid gap-x-3 gap-y-12 
                  ${
                    gridCols === 3
                      ? "grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  }`}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, i) => (
                    <ProductCard
                      key={product.id || i}
                      product={product}
                      index={i}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                  <Icons.MagnifyingGlass className="w-10 h-10 text-zinc-300 dark:text-zinc-700" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
                  Sin coincidencias
                </h3>
                <p className="text-zinc-500 mt-2 max-w-xs mx-auto text-sm font-medium italic">
                  No hay productos que coincidan con los filtros seleccionados.
                </p>
                <button
                  onClick={() => clearFilters()}
                  className="mt-8 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:opacity-90 transition-all active:scale-95 shadow-xl"
                >
                  Limpiar Filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* DRAWER MÓVIL (FILTROS) */}
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-[320px] bg-white dark:bg-[#0A0A0A] z-101 flex flex-col shadow-2xl"
            >
              <div className="px-6 py-5 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900">
                <span className="text-[12px] font-black uppercase tracking-[0.2em]">
                  Filtros
                </span>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                >
                  <Icons.XMark width={24} height={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <FilterGroup
                  options={cleanedOptions}
                  filters={filters}
                  toggleFilter={toggleFilter}
                  clearFilters={clearFilters}
                  setFilters={setFilters}
                />
              </div>

              <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-[#0A0A0A]">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-black uppercase text-[11px] tracking-[0.2em] shadow-lg active:scale-[0.98] transition-transform"
                >
                  Ver {filteredProducts.length} Artículos
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
