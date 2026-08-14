import { useState, useMemo } from "react";
import { ProductWithRelations } from "@/types/product-service";

interface FilterState {
  categories: string[];
  subcategories: string[];
  colors: string[];
  styles: string[];
  materials: string[];
  priceRange: [number, number];
}

export interface InitialFilters {
  colors?: string[];
  styles?: string[];
  materials?: string[];
  priceRange?: [number, number];
}

export function useProductFilters(
  initialProducts: ProductWithRelations[],
  initialFilters?: InitialFilters,
) {
  const maxInitialPrice =
    initialProducts.length > 0
      ? Math.max(...initialProducts.map((p) => p.price || 0))
      : 1500;
  const defaultMaxPrice = Math.max(
    1500,
    Math.ceil(maxInitialPrice / 100) * 100,
  );

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    subcategories: [],
    colors: initialFilters?.colors ?? [],
    styles: initialFilters?.styles ?? [],
    materials: initialFilters?.materials ?? [],
    priceRange: initialFilters?.priceRange ?? [0, defaultMaxPrice],
  });
  const [sortBy, setSortBy] = useState("recent");

  const processedProducts = useMemo(() => {
    return initialProducts.map((p) => ({
      ...p,
      category: p.category ? String(p.category).trim() : "",
      subcategory: p.subcategory ? String(p.subcategory).trim() : "",
      colors: (() => {
        const prodColors = Array.isArray(p.colors) ? p.colors : [];
        const varColors = Array.isArray(p.variants)
          ? p.variants.map((v: any) => v.color).filter(Boolean)
          : [];
        const allColors = [...prodColors, ...varColors];
        return Array.from(new Set(allColors))
          .map((c) => {
            const trimmed = String(c).trim().toLowerCase();
            return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
          })
          .filter(Boolean);
      })(),
      styles: p.styles
        ? String(p.styles)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      materials: Array.isArray(p.materials)
        ? p.materials.map((m: string) => String(m).trim())
        : [],
    }));
  }, [initialProducts]);

  const availableOptions = useMemo(() => {
    const getUniqueOptions = (
      key: "category" | "subcategory" | "colors" | "styles" | "materials",
    ) => {
      const allValues = processedProducts.flatMap((p) => p[key]);
      const cleanValues = allValues
        .filter((v) => v != null)
        .map((v) => String(v).trim())
        .filter((v) => v !== "");

      return Array.from(new Set(cleanValues)).sort((a: string, b: string) =>
        a.localeCompare(b, undefined, { sensitivity: "base" }),
      );
    };

    return {
      categories: getUniqueOptions("category"),
      subcategories: getUniqueOptions("subcategory"),
      colors: getUniqueOptions("colors"),
      styles: getUniqueOptions("styles"),
      materials: getUniqueOptions("materials"),
      maxPrice: defaultMaxPrice,
    };
  }, [processedProducts]);

  const toggleFilter = (
    key: keyof Omit<FilterState, "priceRange">,
    value: string,
  ) => {
    setFilters((prev) => {
      const current = prev[key] as string[];
      const isSelected = current.includes(value);
      return {
        ...prev,
        [key]: isSelected
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const clearFilters = () =>
    setFilters({
      categories: [],
      subcategories: [],
      colors: [],
      styles: [],
      materials: [],
      priceRange: [0, defaultMaxPrice],
    });

  const filteredProducts = useMemo(() => {
    let result = [...processedProducts];

    const applySingularFilter = (
      stateKey: keyof FilterState,
      productKey: keyof (typeof result)[0],
    ) => {
      const selected = filters[stateKey] as string[];
      if (selected.length > 0) {
        result = result.filter((p) =>
          selected.includes(p[productKey] as string),
        );
      }
    };

    const applyArrayFilter = (
      stateKey: keyof FilterState,
      productKey: keyof (typeof result)[0],
    ) => {
      const selected = filters[stateKey] as string[];
      if (selected.length > 0) {
        result = result.filter((p) => {
          const productValues = p[productKey] as string[];
          return productValues.some((val) => selected.includes(val));
        });
      }
    };

    applySingularFilter("categories", "category");
    applySingularFilter("subcategories", "subcategory");
    applyArrayFilter("colors", "colors");
    applyArrayFilter("styles", "styles");
    applyArrayFilter("materials", "materials");

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );

    if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [processedProducts, filters, sortBy]);

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    toggleFilter,
    filteredProducts,
    clearFilters,
    availableOptions,
  };
}
