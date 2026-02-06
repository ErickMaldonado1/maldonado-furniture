"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ColorModal({
  selectedColor,
  onClose,
  onNext,
  onPrev,
  formato,
}: any) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        key={selectedColor.nombre}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="relative w-full max-w-120 h-160 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col border border-white/5"
      >
        <button
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-50 p-2 text-white/20 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-10 h-10" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-50 p-2 text-white/20 hover:text-white transition-colors"
        >
          <ChevronRight className="w-10 h-10" />
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-60 bg-black/20 text-white p-2 rounded-full hover:bg-red-600 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative flex-1 w-full h-full">
          <Image
            src={selectedColor.url.replace("w_200", "w_1200")}
            alt={selectedColor.nombre}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="bg-black/50 backdrop-blur-2xl border border-white/10 px-6 py-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[14px] font-black uppercase tracking-tight text-white leading-none">
                  {selectedColor.nombre.replace(/-/g, " ")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-4 w-px bg-white/20" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                    Proveedor
                  </span>
                  <span className="text-[12px] font-bold uppercase text-white leading-none">
                    {selectedColor.empresaId}
                  </span>
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                    Formato
                  </span>
                  <span className="text-[12px] font-bold uppercase text-white leading-none">
                    {formato}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
