"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProductSearchBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${query}`);
      const data = await res.json();

      if (data && data.length > 0) {
        const match =
          data.find((p: any) => p.sku === query || p.id === query) || data[0];
        router.push(`/admin/products/${match.id}`);
        setIsOpen(false);
      } else {
        alert("Producto no encontrado");
      }
    } catch (error) {
      alert("Error al buscar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white dark:bg-[#111111] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm"
      >
        <Search size={16} /> Buscar / Editar
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#111111] w-full max-w-md rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex justify-between items-center mb-6">
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

            <form onSubmit={handleSearch} className="space-y-4">
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
                {loading ? "Buscando..." : "Buscar y Editar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
