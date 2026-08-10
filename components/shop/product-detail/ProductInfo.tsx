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
    <div className="space-y-2">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
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
      <h1 className="text-2xl md:text-[32px] font-semibold tracking-tight text-[#111827] dark:text-zinc-100 leading-[1.1]">
        {currentTitle}
      </h1>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <span className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400 uppercase">
          SKU:{" "}
          <span className="font-mono text-zinc-700 dark:text-zinc-300">
            {currentSKU}
          </span>
        </span>

        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-300/80 dark:border-emerald-700/50 uppercase">
          <CheckBadge className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>BAJO PEDIDO</span>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-3 pb-1">
        <button
          onClick={() => scrollToSection("descripcion")}
          className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors decoration-[#4A3728] underline-offset-4 decoration-2 hover:underline"
        >
          Descripción
        </button>
        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <button
          onClick={() => scrollToSection("dimensiones")}
          className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors decoration-[#4A3728] underline-offset-4 decoration-2 hover:underline"
        >
          Características
        </button>
      </div>
    </div>
  );
}
