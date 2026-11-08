"use client";

import { useState } from "react";
import { activateAllProducts } from "@/features/admin/products/product.actions";
import { FiCheck, FiZap } from "react-icons/fi";

export function ActivateAllProductsBtn() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<number | null>(null);

  const handleActivate = async () => {
    setLoading(true);
    const res = await activateAllProducts();
    setLoading(false);
    if (res.success) {
      setDone(res.count ?? 0);
    }
  };

  if (done !== null) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
        <FiCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{done} productos activados</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleActivate}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-all disabled:opacity-50 cursor-pointer"
    >
      <FiZap className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{loading ? "Activando..." : "Activar todos los productos"}</span>
    </button>
  );
}
