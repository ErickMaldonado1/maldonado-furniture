"use client";

import { CheckBadge } from "@/utils/icons/layout";
import { ProductWithRelations } from "@/types/product-service";

interface ProductInfoProps {
  product: ProductWithRelations;
  selectedVariant: any;
}

export function ProductInfo({ product, selectedVariant }: ProductInfoProps) {
  const currentSKU = selectedVariant?.sku || product.sku || "";
  const currentTitle = selectedVariant?.name || product.name;

  const categoryText = product.category
    ? product.category.toUpperCase()
    : "DORMITORIO";
  const subcategoryText = product.subcategory
    ? product.subcategory.toUpperCase()
    : "CAMAS-LINEALES";

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-3.5">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
        <span className="hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer transition-colors">
          Inicio
        </span>
        <span className="text-zinc-300 dark:text-zinc-600">/</span>
        <span className="hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer transition-colors">
          {categoryText}
        </span>
        <span className="text-zinc-300 dark:text-zinc-600">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">
          {subcategoryText}
        </span>
      </nav>

      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-zinc-900 dark:text-white leading-tight">
          {currentTitle}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {currentSKU && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-200/80 dark:border-zinc-700/60 uppercase tracking-wider">
            <span>SKU: <span className="font-mono text-zinc-900 dark:text-white">{currentSKU}</span></span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-300/80 dark:border-emerald-700/50 uppercase tracking-wider">
          <CheckBadge className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Bajo Pedido Directo de Fábrica</span>
        </div>

        <span className="text-xs font-medium text-[#634E3A] dark:text-[#D4B896] bg-[#634E3A]/10 dark:bg-[#D4B896]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
          A Medida Disponible
        </span>
      </div>

      <div className="flex items-center gap-4 pt-2 pb-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        <button
          onClick={() => scrollToSection("descripcion")}
          className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          Descripción
        </button>
        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <button
          onClick={() => scrollToSection("dimensiones")}
          className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          Características
        </button>
      </div>
    </div>
  );
}
