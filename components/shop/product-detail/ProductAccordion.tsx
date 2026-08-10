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
        <span className="text-[15px] font-medium text-zinc-900 dark:text-white">
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

interface DimensionRow {
  label: string;
  value: number | null | undefined;
}

interface ProductAccordionProps {
  dimensions?: {
    height: number;
    width: number;
    depth: number;
  } | null;
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
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const dimensionRows: DimensionRow[] = dimensions
    ? [
        { label: "Largo / Ancho", value: dimensions.width },
        { label: "Alto", value: dimensions.height },
        { label: "Profundidad", value: dimensions.depth },
      ].filter(
        (row) => row.value !== null && row.value !== undefined && row.value > 0
      )
    : [];

  const hasDimensions = dimensionRows.length > 0;

  return (
    <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800 ">
      <AccordionItem
        title="Pesos y dimensiones"
        isOpen={openIndices.includes(1)}
        onToggle={() => toggle(1)}
      >
        {hasDimensions ? (
          <div className="space-y-2">
            {dimensionRows.map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center py-0.5"
              >
                <span className="text-[13px] text-zinc-500 font-medium">
                  {row.label}
                </span>
                <span className="text-[13px] font-medium text-zinc-900 dark:text-white">
                  {row.value} cm
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-400 italic">
            Dimensiones no disponibles para esta variante.
          </p>
        )}
      </AccordionItem>

      {materials && materials.length > 0 && (
        <AccordionItem
          title="Materiales"
          isOpen={openIndices.includes(2)}
          onToggle={() => toggle(2)}
        >
          <ul className="space-y-1">
            {materials.map((m, i) => (
              <li key={i} className="text-[14px]">
                • {m}
              </li>
            ))}
          </ul>
        </AccordionItem>
      )}
    </div>
  );
}
