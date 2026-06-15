"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "@/utils/icons/ui";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({
  title,
  children,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-zinc-100 dark:border-zinc-800">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <span className="text-base font-bold  text-zinc-900 dark:text-white">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductAccordionProps {
  dimensions?: {
    height: number;
    width: number;
    depth: number;
  };
  materials?: string[];
  careInstructions?: string;
}

export function ProductAccordion({
  dimensions,
  materials,
}: ProductAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800 ">
      <AccordionItem
        title="Pesos y dimensiones"
        isOpen={openIndices.includes(1)}
        onToggle={() => toggle(1)}
      >
        {dimensions ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[14px]">Altura</span>
              <span className="text-[14px] font-bold text-zinc-900 dark:text-white">
                {dimensions.height} cm
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[14px]">Ancho</span>
              <span className="text-[14px] font-bold text-zinc-900 dark:text-white">
                {dimensions.width} cm
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[14px]">Fondo</span>
              <span className="text-[14px] font-bold text-zinc-900 dark:text-white">
                {dimensions.depth} cm
              </span>
            </div>
          </div>
        ) : (
          <p>Dimensiones no disponibles para esta variante.</p>
        )}
      </AccordionItem>
    </div>
  );
}
