"use client";

import { Search, X, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ProductSearchBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/api/products?search=${query}`);
      const data = await res.json();
      setResults(data || []);
    } catch (error) {
      console.error("Error al buscar", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (id: string) => {
    setIsOpen(false);
    router.push(`/admin/products/${id}`);
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setResults([]);
          setQuery("");
          setHasSearched(false);
        }}
        className="bg-white dark:bg-[#111111] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold text-xs uppercase hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm"
      >
        <Search size={16} /> Buscar / Editar
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#111111] w-full max-w-md rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Buscar Producto para Editar
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-4 shrink-0">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                  Ingrese SKU, ID o Nombre
                </label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ej. CAM-KS-001"
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-zinc-900 dark:bg-[#A6866A] text-white py-3 rounded-xl font-bold uppercase tracking-wide hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </form>

            {hasSearched && (
              <div className="mt-6 flex-1 overflow-y-auto min-h-0 space-y-2">
                {results.length > 0 ? (
                  results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 text-left"
                    >
                      <div className="relative w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-zinc-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate uppercase">
                          SKU: {product.sku || "N/A"}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-zinc-500">
                      No se encontraron productos.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
