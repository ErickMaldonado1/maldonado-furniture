"use client";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import { COLOR_TEXTURES } from "@/utils/filter-textures";

const ColorModal = dynamic(() => import("@/components/ui/ColorModal"), {
  ssr: false,
});

const EMPRESAS = [
  { id: "pelikano", nombre: "Pelíkano", formato: "2.44 x 2.15 mts" },
  { id: "cotopaxi", nombre: "Agl. Cotopaxi", formato: "2.44 x 2.15 mts" },
  { id: "masisa", nombre: "Masisa", formato: "2.50 x 1.83 mts" },
];

export default function CatalogoMaldonadoPremium() {
  const [activeEmpresa, setActiveEmpresa] = useState("pelikano");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedColor ? "hidden" : "unset";
  }, [selectedColor]);

  const coloresAMostrar = useMemo(() => {
    if (searchQuery.trim() !== "") {
      const resultadosGlobales: any[] = [];
      Object.entries(COLOR_TEXTURES).forEach(([empId, texturas]) => {
        Object.entries(texturas).forEach(([nombre, url]) => {
          if (nombre.toLowerCase().includes(searchQuery.toLowerCase())) {
            resultadosGlobales.push([nombre, url, empId]);
          }
        });
      });
      return resultadosGlobales;
    }
    const dataEmpresa = COLOR_TEXTURES[activeEmpresa] || {};
    return Object.entries(dataEmpresa).map(([nombre, url]) => [
      nombre,
      url,
      activeEmpresa,
    ]);
  }, [activeEmpresa, searchQuery]);

  const handleNav = (direction: number) => {
    const currentIndex = coloresAMostrar.findIndex(
      ([nombre]) => nombre === selectedColor?.nombre,
    );
    const nextIndex =
      (currentIndex + direction + coloresAMostrar.length) %
      coloresAMostrar.length;
    const [nombre, url, empresaId] = coloresAMostrar[nextIndex];
    setSelectedColor({ nombre, url, empresaId });
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] pb-16 transition-colors">
      <section className="pt-24 md:pt-32 p-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
              Catálogo de{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
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
          {EMPRESAS.map((emp) => (
            <button
              key={emp.id}
              onClick={() => {
                setActiveEmpresa(emp.id);
                setSearchQuery("");
              }}
              className="relative shrink-0"
            >
              <span
                className={`text-xl font-black uppercase tracking-tighter ${activeEmpresa === emp.id && searchQuery === "" ? "text-zinc-900 dark:text-white" : "text-zinc-300 dark:text-zinc-700"}`}
              >
                {emp.nombre}
              </span>
              {activeEmpresa === emp.id && searchQuery === "" && (
                <motion.div
                  layoutId="pill"
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-[#4A3728]"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {coloresAMostrar.map(([nombre, url, empId]) => (
            <motion.div
              key={`${empId}-${nombre}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() =>
                setSelectedColor({ nombre, url, empresaId: empId })
              }
              className="group cursor-pointer"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-sm ">
                <Image
                  src={url.replace("w_200", "w_600")}
                  alt={nombre}
                  fill
                  sizes="20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="bg-black/20 backdrop-blur-md border border-white/10 py-2 px-1 text-center">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-white">
                      {nombre.replace(/-/g, " ")}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedColor && (
          <ColorModal
            selectedColor={selectedColor}
            onClose={() => setSelectedColor(null)}
            onNext={() => handleNav(1)}
            onPrev={() => handleNav(-1)}
            formato={
              EMPRESAS.find((e) => e.id === selectedColor.empresaId)?.formato
            }
          />
        )}
      </AnimatePresence>
    </main>
  );
}
