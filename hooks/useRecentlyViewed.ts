"use client";

import { useState, useEffect } from "react";
import { Product } from "@prisma/client";

const MAX_RECENT_ITEMS = 8;
const STORAGE_KEY = "recently_viewed_products";

function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading recently viewed from storage", error);
    return [];
  }
}

export function useRecentlyViewed(currentProduct?: Product) {
  const [recentProducts, setRecentProducts] =
    useState<Product[]>(getStoredProducts);

  useEffect(() => {
    if (!currentProduct) return;

    const stored = getStoredProducts();
    const filtered = stored.filter((p) => p.id !== currentProduct.id);
    const updated = [currentProduct, ...filtered].slice(0, MAX_RECENT_ITEMS);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error updating recently viewed", error);
    }

    
    const timeout = setTimeout(() => {
      setRecentProducts(updated);
    }, 0);

    return () => clearTimeout(timeout);
  }, [currentProduct]);

  const history = currentProduct
    ? recentProducts.filter((p) => p.id !== currentProduct.id)
    : recentProducts;

  return { recentProducts: history };
}
