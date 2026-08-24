"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit } from "lucide-react";
import { DeleteProductBtn } from "@/app/(admin)/admin/DeleteProductBtn";
import { ToggleProductStateBtn } from "@/app/(admin)/admin/ToggleProductStateBtn";
import { getProductsPaginated } from "@/features/admin/products/product.actions";

interface ProductsTableClientProps {
  initialProducts: any[];
  initialHasMore: boolean;
  query: string;
  category?: string;
  subcategory?: string;
}

export function ProductsTableClient({
  initialProducts,
  initialHasMore,
  query,
  category,
  subcategory,
}: ProductsTableClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [skip, setSkip] = useState(initialProducts.length);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    
    try {
      const res = await getProductsPaginated(query, category, subcategory, skip, 20);
      if (res.success && res.products) {
        setProducts((prev) => [...prev, ...res.products]);
        setHasMore(res.hasMore ?? false);
        setSkip((prev) => prev + res.products.length);
      }
    } catch (error) {
      console.error("Error loading more products", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800/60 overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-100 dark:divide-zinc-800/50">
          <thead className="bg-zinc-50/50 dark:bg-zinc-900/30">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-4 text-center text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Variantes
              </th>
              <th className="px-6 py-4 text-right text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/40">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-20 text-zinc-500 text-sm italic"
                >
                  No se encontraron productos en el catálogo.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className={`hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors group ${
                    !product.isActive ? "opacity-75 bg-red-50/10 dark:bg-red-900/5" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 shadow-sm shrink-0">
                        <Image
                          src={product.images[0]?.url || "/placeholder.png"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            {product.name}
                          </span>
                          {!product.isActive && (
                            <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider whitespace-nowrap">
                              Inactivo
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase mt-0.5 tracking-wide">
                          SKU: {product.sku || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <span className="inline-flex items-center text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-middle text-sm font-bold text-zinc-800 dark:text-zinc-100">
                    ${product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 align-middle text-center">
                    <span className="inline-block border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white dark:bg-zinc-900">
                      {product._count.variants} var
                    </span>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex justify-end items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                      <ToggleProductStateBtn 
                        productId={product.id} 
                        isActive={product.isActive} 
                      />
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-1.5 text-zinc-400 hover:text-[#4A3728] dark:hover:text-[#A6866A] transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteProductBtn productId={product.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-center bg-zinc-50/30 dark:bg-zinc-900/10">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-6 py-2.5 rounded-full bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-700 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? "Cargando..." : "Cargar más productos"}
          </button>
        </div>
      )}
    </div>
  );
}
