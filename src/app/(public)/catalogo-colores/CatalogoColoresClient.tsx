"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";

const ColorModal = dynamic(() => import("@/components/ui/ColorModal"), {
  ssr: false,
});

type ColorCompany = "PELIKANO" | "EDIMCA" | "MASISA";

type ColorItem = {
  id: string;
  name: string;
  company: ColorCompany;
  slug: string | null;
  hexCode: string | null;
  imageUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

type SelectedColor = {
  id: string;
  nombre: string;
  url: string | null;
  empresaId: ColorCompany;
  hexCode: string | null;
};

type CatalogoColoresClientProps = {
  initialColors: ColorItem[];
};

const EMPRESAS = [
  {
    id: "PELIKANO" as const,
    nombre: "Pelíkano",
    formato: "2.44 x 2.15 mts",
  },
  {
    id: "EDIMCA" as const,
    nombre: "Agl. Cotopaxi",
    formato: "2.44 x 2.15 mts",
  },
  {
    id: "MASISA" as const,
    nombre: "Masisa",
    formato: "2.50 x 1.83 mts",
  },
];

export default function CatalogoColoresClient({
  initialColors,
}: CatalogoColoresClientProps) {
  const [activeEmpresa, setActiveEmpresa] = useState<ColorCompany>("PELIKANO");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedColor, setSelectedColor] = useState<SelectedColor | null>(
    null,
  );

  const colors = initialColors || [];

  useEffect(() => {
    document.body.style.overflow = selectedColor ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedColor]);

  const coloresAMostrar = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      return colors.filter((color) => color.name.toLowerCase().includes(query));
    }

    return colors.filter((color) => color.company === activeEmpresa);
  }, [colors, activeEmpresa, searchQuery]);

  const getEmpresaNombre = (company: ColorCompany) => {
    const empresa = EMPRESAS.find((item) => item.id === company);

    return empresa?.nombre || company;
  };

  const openColor = (color: ColorItem) => {
    setSelectedColor({
      id: color.id,
      nombre: color.name,
      url: color.imageUrl,
      empresaId: color.company,
      hexCode: color.hexCode,
    });
  };

  const handleNav = (direction: number) => {
    if (!selectedColor || coloresAMostrar.length === 0) {
      return;
    }

    const currentIndex = coloresAMostrar.findIndex(
      (color) => color.id === selectedColor.id,
    );

    if (currentIndex === -1) {
      return;
    }

    const nextIndex =
      (currentIndex + direction + coloresAMostrar.length) %
      coloresAMostrar.length;

    const nextColor = coloresAMostrar[nextIndex];

    if (!nextColor) {
      return;
    }

    setSelectedColor({
      id: nextColor.id,
      nombre: nextColor.name,
      url: nextColor.imageUrl,
      empresaId: nextColor.company,
      hexCode: nextColor.hexCode,
    });
  };

  const selectedEmpresa = EMPRESAS.find(
    (empresa) => empresa.id === selectedColor?.empresaId,
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] pb-16 transition-colors">
      <section className="pt-24 md:pt-32 p-4 max-w-360 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/50 pb-6 mb-6 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium  text-zinc-900 dark:text-white leading-none">
              Catálogo de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A3728] to-[#5D4037]">
                Texturas
              </span>
            </h2>

            <p className="mt-6 text-zinc-600 dark:text-zinc-400 text-md md:text-base leading-relaxed">
              Explora nuestra colección exclusiva de melaminas y aglomerados
              premium.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />

            <input
              type="text"
              placeholder="BUSCAR COLOR..."
              className="w-full pl-8 py-2 bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-[#4A3728] outline-none font-bold text-sm dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-40 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex gap-8 py-4 px-4 overflow-x-auto no-scrollbar">
          {EMPRESAS.map((empresa) => {
            const isActive = activeEmpresa === empresa.id && searchQuery === "";

            return (
              <button
                key={empresa.id}
                type="button"
                onClick={() => {
                  setActiveEmpresa(empresa.id);

                  setSearchQuery("");
                }}
                className="relative shrink-0"
              >
                <span
                  className={`text-md font-black uppercase  transition-colors ${
                    isActive
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-300 dark:text-zinc-700"
                  }`}
                >
                  {empresa.nombre}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="pill"
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-[#4A3728]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
      <section className="px-4 py-8 max-w-360 mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-bold uppercase -wider text-zinc-400">
              {searchQuery.trim()
                ? "Resultados de búsqueda"
                : getEmpresaNombre(activeEmpresa)}
            </p>

            {searchQuery.trim() && (
              <p className="text-xs text-zinc-500 mt-1">
                Buscando:{" "}
                <span className="font-bold text-zinc-800 dark:text-zinc-200">
                  "{searchQuery}"
                </span>
              </p>
            )}
          </div>

          <span className="text-xs font-bold text-zinc-400">
            {coloresAMostrar.length}{" "}
            {coloresAMostrar.length === 1 ? "color" : "colores"}
          </span>
        </div>
        {coloresAMostrar.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {coloresAMostrar.map((color) => (
              <motion.div
                key={color.id}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.25,
                }}
                onClick={() => openColor(color)}
                className="group cursor-pointer"
              >
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-sm"
                  style={{
                    backgroundColor: color.hexCode || "#cccccc",
                  }}
                >
                  {color.imageUrl ? (
                    <Image
                      src={color.imageUrl}
                      alt={color.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundColor: color.hexCode || "#cccccc",
                      }}
                    />
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="bg-black/25 backdrop-blur-md border border-white/10 py-2 px-2 text-center">
                      <h3 className="text-[12px] font-black uppercase text-white truncate">
                        {color.name.replace(/-/g, " ")}
                      </h3>

                      {searchQuery.trim() && (
                        <p className="text-[9px] font-bold uppercase -wider text-white/70 mt-1">
                          {getEmpresaNombre(color.company)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-5">
              <Search className="w-6 h-6 text-zinc-400" />
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              No encontramos colores
            </h3>

            <p className="text-sm text-zinc-500 mt-2 max-w-md mx-auto">
              {searchQuery.trim()
                ? `No existen colores que coincidan con "${searchQuery}".`
                : "Esta empresa todavía no tiene colores registrados."}
            </p>

            {searchQuery.trim() && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-5 px-5 py-2.5 rounded-xl bg-[#4A3728] text-white text-xs font-bold uppercase -wider hover:opacity-90 transition"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedColor && (
          <ColorModal
            selectedColor={selectedColor}
            onClose={() => setSelectedColor(null)}
            onNext={() => handleNav(1)}
            onPrev={() => handleNav(-1)}
            formato={selectedEmpresa?.formato}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
