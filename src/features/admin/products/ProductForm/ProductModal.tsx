import { motion, AnimatePresence } from "framer-motion";
import { ModalState } from "../types/product.types";

interface ProductModalProps {
  modal: ModalState;
  closeModal: () => void;
}

export function ProductModal({ modal, closeModal }: ProductModalProps) {
  return (
    <AnimatePresence>
      {modal.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#111111] rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md overflow-hidden"
          >
            <div
              className={`h-2 w-full ${
                modal.type === "success"
                  ? "bg-linear-to-r from-[#A6866A] to-[#D4A373]"
                  : "bg-linear-to-r from-red-500 to-red-400"
              }`}
            />
            <div className="p-8">
              <div className="flex items-start gap-5 mb-6">
                <div
                  className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                    modal.type === "success"
                      ? "bg-[#A6866A]/10 text-[#A6866A]"
                      : "bg-red-50 dark:bg-red-900/20 text-red-500"
                  }`}
                >
                  {modal.type === "success" ? (
                    <span className="text-2xl">✓</span>
                  ) : (
                    <span className="text-2xl">!</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                    {modal.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                    {modal.message}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm w-full sm:w-auto ${
                    modal.type === "success"
                      ? "bg-zinc-900 dark:bg-[#A6866A] text-white hover:opacity-90"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {modal.type === "success" ? "Continuar" : "Entendido"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}