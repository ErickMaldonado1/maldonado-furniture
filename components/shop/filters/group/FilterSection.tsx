"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { ChevronDown } from "@/utils/icons/navigation";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function FilterSection({
  title,
  children,
  defaultOpen = false,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-100 dark:border-zinc-900 pb-4 mb-4 last:border-none last:pb-0 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full group py-2 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100 group-hover:text-[#4A3728] transition-colors">
          {title}
        </span>
        <div className="text-zinc-400 group-hover:text-[#4A3728] transition-colors">
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              marginTop: 16,
            }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
