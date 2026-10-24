"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

export function ProductFilters({
  categories,
  categoryMap = {},
}: {
  categories: string[];
  categoryMap?: Record<string, string[]>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const selectedSubcategory = searchParams.get("subcategory") || "";
  const currentQuery = searchParams.get("query") || "";

  // Available subcategories for the selected category
  const availableSubcategories = selectedCategory
    ? categoryMap[selectedCategory] || []
    : Array.from(new Set(Object.values(categoryMap).flat()));

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    // Clear subcategory when category changes
    params.delete("subcategory");
    router.push(`?${params.toString()}`);
  };

  const handleSubcategoryChange = (newSubcategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSubcategory) {
      params.set("subcategory", newSubcategory);
    } else {
      params.delete("subcategory");
    }
    router.push(`?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push("/admin/products");
  };

  const hasActiveFilters = Boolean(selectedCategory || selectedSubcategory || currentQuery);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#4A3728] shadow-xs cursor-pointer"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">Todas las Categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        className={`h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#4A3728] shadow-xs cursor-pointer ${
          selectedCategory && availableSubcategories.length === 0 ? "opacity-50" : ""
        }`}
        value={selectedSubcategory}
        onChange={(e) => handleSubcategoryChange(e.target.value)}
        disabled={selectedCategory !== "" && availableSubcategories.length === 0}
      >
        <option value="">
          {selectedCategory && availableSubcategories.length === 0
            ? "Sin subcategorías"
            : "Todas las Subcategorías"}
        </option>
        {availableSubcategories.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={handleClearFilters}
          className="h-10 px-3 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors shadow-xs cursor-pointer"
          title="Limpiar todos los filtros"
        >
          <X className="w-3.5 h-3.5" />
          <span>Limpiar</span>
        </button>
      )}
    </div>
  );
}
