"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function ProductFilters({
  categories,
  subcategories,
}: {
  categories: string[];
  subcategories: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex gap-2">
      <select
        className="h-10 px-3 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-hidden focus:border-[#4A3728]"
        value={searchParams.get("category") || ""}
        onChange={(e) => {
          router.push("?" + createQueryString("category", e.target.value));
        }}
      >
        <option value="">Todas las Categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        className="h-10 px-3 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-hidden focus:border-[#4A3728]"
        value={searchParams.get("subcategory") || ""}
        onChange={(e) => {
          router.push("?" + createQueryString("subcategory", e.target.value));
        }}
      >
        <option value="">Todas las Subcategorías</option>
        {subcategories.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>
    </div>
  );
}
