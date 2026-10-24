"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { XMark } from "@/utils/icons/actions";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  position?: "left" | "right";
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  title,
  position = "right",
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const variants: Variants = {
    closed: {
      x: position === "right" ? "100%" : "-100%",
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          <motion.div
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`fixed top-0 bottom-0 z-[101] w-full max-w-md bg-white dark:bg-[#0c0c0c] shadow-2xl ${
              position === "right" ? "right-0 border-l" : "left-0 border-r"
            } border-zinc-200/80 dark:border-zinc-800 flex flex-col h-full`}
          >
            <div className="flex items-center justify-between py-4 px-5 border-b border-zinc-100 dark:border-zinc-800/80">
              {title && (
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white leading-none">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-full text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728]"
                aria-label="Cerrar panel"
              >
                <XMark className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
