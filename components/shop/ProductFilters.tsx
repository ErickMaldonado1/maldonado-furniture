"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/utils/categories";

interface ProductFiltersProps {
  currentCategory?: string;
  currentSub?: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  currentCategory,
  currentSub,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryData = categories.find((c) => c.slug === currentCategory);

  if (!categoryData) return null;

  const handleSubClick = (sub: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sub === "all") {
      params.delete("sub");
    } else {
      params.set("sub", sub);
    }
    router.push(`/productos?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-12">
      <button
        onClick={() => handleSubClick("all")}
        className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
          !currentSub
            ? "bg-[#4A3728] text-white shadow-lg"
            : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:bg-[#4A3728]/10"
        }`}
        aria-label="all-search"
      >
        Todos
      </button>
      {categoryData.subcategories.map((sub) => (
        <button
          key={sub.sub}
          onClick={() => handleSubClick(sub.sub)}
          className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
            currentSub === sub.sub
              ? "bg-[#4A3728] text-white shadow-lg"
              : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:bg-[#4A3728]/10"
          }`}
          aria-label="data"
        >
          {sub.label}
        </button>
      ))}
    </div>
  );
};

export default ProductFilters;
