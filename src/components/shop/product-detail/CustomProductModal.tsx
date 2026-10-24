"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMark } from "@/utils/icons/actions";
import { Whatsapp } from "@/utils/icons/social";
import { CheckBadge } from "@/utils/icons/layout";

interface CustomProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: {
    name: string;
    sku?: string;
    color?: string;
    dimensions?: { width: number; height: number; depth: number };
    price?: number;
  };
}

export function CustomProductModal({
  isOpen,
  onClose,
  initialProduct,
}: CustomProductModalProps) {
  const [furnitureType, setFurnitureType] = useState(
    initialProduct?.name || "Mueble a medida",
  );
  const [customWidth, setCustomWidth] = useState(
    initialProduct?.dimensions?.width ? `${initialProduct.dimensions.width} cm` : "",
  );
  const [customHeight, setCustomHeight] = useState(
    initialProduct?.dimensions?.height ? `${initialProduct.dimensions.height} cm` : "",
  );
  const [customDepth, setCustomDepth] = useState(
    initialProduct?.dimensions?.depth ? `${initialProduct.dimensions.depth} cm` : "",
  );
  const [finish, setFinish] = useState(initialProduct?.color || "Roble Natural / Melamina Pelikano");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientCity, setClientCity] = useState("Quito (Norte/Centro/Sur/Valles)");

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "593959504842";
    const origin = typeof window !== "undefined" ? window.location.href : "";

    const message = `👋 ¡Hola Muebles Maldonado! Deseo solicitar una cotización de MUEBLE A MEDIDA:
🪑 *Tipo de Mueble / Referencia:* ${furnitureType}
${initialProduct?.sku ? `🆔 *Código Ref:* ${initialProduct.sku}\n` : ""}📐 *Medidas Deseadas:*
  - Ancho / Largo: ${customWidth || "Por definir"}
  - Alto: ${customHeight || "Por definir"}
  - Fondo / Profundidad: ${customDepth || "Por definir"}
🎨 *Acabado / Color Melamina:* ${finish || "A asesorar"}
💰 *Presupuesto Estimado:* ${budget ? `$${budget}` : "A convenir"}
📍 *Sector / Ciudad:* ${clientCity || "Quito"}
👤 *Nombre de Contacto:* ${clientName || "Cliente"}
${notes ? `📝 *Detalles Adicionales:* ${notes}\n` : ""}🔗 *Enlace de referencia:* ${origin}

¿Podrían indicarme costo aproximado, tiempo de fabricación e instalación?`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121212] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 z-10 custom-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <XMark className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="label-premium text-[#8B735B] dark:text-[#C4A482] block mb-1">
                Fabricación Personalizada Directa de Fábrica
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-zinc-900 dark:text-white leading-snug">
                Personalizar este Mueble a Medida
              </h3>
              <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                Adaptamos las dimensiones, distribución interior y acabados de melamina a tu espacio exacto en Quito y valles.
              </p>
            </div>

            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div>
                <label className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                  Mueble de Referencia
                </label>
                <input
                  type="text"
                  value={furnitureType}
                  onChange={(e) => setFurnitureType(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728]"
                />
              </div>

              <div>
                <label className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                  Medidas personalizadas que necesitas (aproximadas)
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div>
                    <span className="label-premium text-zinc-400">Ancho / Largo</span>
                    <input
                      type="text"
                      placeholder="Ej. 160 cm"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728]"
                    />
                  </div>
                  <div>
                    <span className="label-premium text-zinc-400">Alto</span>
                    <input
                      type="text"
                      placeholder="Ej. 75 cm"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728]"
                    />
                  </div>
                  <div>
                    <span className="label-premium text-zinc-400">Profundidad</span>
                    <input
                      type="text"
                      placeholder="Ej. 60 cm"
                      value={customDepth}
                      onChange={(e) => setCustomDepth(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                    Acabado / Color Melamina
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Roble, Blanco, Carvalo, Cava"
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728]"
                  />
                </div>
                <div>
                  <label className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                    Presupuesto estimado (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. $200 - $350"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728]"
                  />
                </div>
                <div>
                  <label className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                    Ubicación / Sector
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. El Condado, Cumbayá, Quitumbe"
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728]"
                  />
                </div>
              </div>

              <div>
                <label className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                  Detalles especiales (cajones, pasacables, repisas, luz LED)
                </label>
                <textarea
                  rows={2}
                  placeholder="Explícanos cómo imaginas la distribución o si tienes alguna foto de tu espacio..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] resize-none"
                />
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 label-premium text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                <CheckBadge className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-zinc-900 dark:text-white">Fabricación 100% ecuatoriana:</strong> Melamina RH de alta resistencia, cantos gruesos termoadheridos y garantía directa de fábrica Maldonado.
                </span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white label-premium text-white! font-medium tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <Whatsapp className="w-5 h-5 text-white" />
                  <span>Enviar Cotización a WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 h-12 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 label-premium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
