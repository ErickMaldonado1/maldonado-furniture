import { SearchX } from "lucide-react";
import Link from "next/link";

export const EmptyState = ({ message }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500 w-full">
    <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
      <SearchX className="w-10 h-10 text-zinc-300 dark:text-zinc-700" />
    </div>
    <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
      No encontramos lo que buscas
    </h2>
    <p className="text-zinc-500 mt-2 max-w-xs mx-auto text-sm">
      {message || "Intenta ajustando los filtros o revisa la ortografía."}
    </p>
    <Link
      href="/productos"
      className="mt-8 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all rounded-full"
    >
      Ver todos los productos
    </Link>
  </div>
);
