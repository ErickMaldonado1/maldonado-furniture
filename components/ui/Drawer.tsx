"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { HiXMark } from "react-icons/hi2";

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-100 bg-black/20 backdrop-blur-[2px] cursor-pointer"
          />

          <motion.div
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`fixed top-0 bottom-0 z-101 w-full max-w-md bg-white dark:bg-[#0A0A0A] shadow ${
              position === "right" ? "right-0 border-l" : "left-0 border-r"
            } border-zinc-100 dark:border-zinc-800 flex flex-col`}
          >
            <div className="flex items-center justify-between pt-4 pb-2 px-4 border-b border-zinc-100 dark:border-zinc-800">
              {title && (
                <h2 className="text-[16px] font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <HiXMark className="text-2xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
