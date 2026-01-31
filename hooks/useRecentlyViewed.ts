"use client";

import { useState, useEffect } from "react";
import { Product } from "@prisma/client";

const MAX_RECENT_ITEMS = 8;
const STORAGE_KEY = "recently_viewed_products";

export function useRecentlyViewed(currentProduct?: Product) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentProducts(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error reading recently viewed from storage", error);
    }
  }, []);
  useEffect(() => {
    if (!currentProduct) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let items: Product[] = stored ? JSON.parse(stored) : [];

      items = items.filter((p) => p.id !== currentProduct.id);
      items.unshift(currentProduct);
      if (items.length > MAX_RECENT_ITEMS) {
        items = items.slice(0, MAX_RECENT_ITEMS);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setRecentProducts(items);
    } catch (error) {
      console.error("Error updating recently viewed", error);
    }
  }, [currentProduct]);

  const history = currentProduct
    ? recentProducts.filter((p) => p.id !== currentProduct.id)
    : recentProducts;

  return { recentProducts: history };
}
