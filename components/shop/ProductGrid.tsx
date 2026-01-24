"use client";

import React from "react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: any[];
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-zinc-500 dark:text-zinc-400 italic">
          No se encontraron productos en esta categoría.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} index={0} />
      ))}
    </div>
  );
};

export default ProductGrid;
