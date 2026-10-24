"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMark } from "@/utils/icons/actions";
import { Whatsapp } from "@/utils/icons/social";
import { CheckBadge } from "@/utils/icons/layout";
import { useCartStore } from "@/store/cart-store";
import { ShoppingBag, Ruler, AlertCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface CustomProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    sku?: string;
    color?: string;
    dimensions?: { width: number; height: number; depth: number };
    price: number;
    finalPrice: number;
    image?: string;
    variantId?: string;
    materials?: string[];
    category?: string;
    subcategory?: string;
  };
}

// Manufacturing bounds in cm
const LIMITS = {
  width: { min: 30, max: 400 },
  height: { min: 30, max: 300 },
  depth: { min: 15, max: 120 },
};

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'.-]{3,60}$/;
const CITY_REGEX = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s,.-]{3,60}$/;

export function CustomProductModal({
  isOpen,
  onClose,
  product,
}: CustomProductModalProps) {
  const [furnitureType, setFurnitureType] = useState(
    product?.name || "Mueble a Medida",
  );
  const [customWidth, setCustomWidth] = useState(
    product?.dimensions?.width ? String(product.dimensions.width) : "160",
  );
  const [customHeight, setCustomHeight] = useState(
    product?.dimensions?.height ? String(product.dimensions.height) : "80",
  );
  const [customDepth, setCustomDepth] = useState(
    product?.dimensions?.depth ? String(product.dimensions.depth) : "50",
  );
  const [finish, setFinish] = useState(
    product?.color || "Melamina Roble / Pelikano",
  );
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientCity, setClientCity] = useState(
    "Quito (Norte/Centro/Sur/Valles)",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addToCart } = useCartStore();

  // Synchronize state when product changes
  useEffect(() => {
    if (product) {
      setFurnitureType(product.name || "Mueble a Medida");
      if (product.dimensions?.width)
        setCustomWidth(String(product.dimensions.width));
      if (product.dimensions?.height)
        setCustomHeight(String(product.dimensions.height));
      if (product.dimensions?.depth)
        setCustomDepth(String(product.dimensions.depth));
      if (product.color) setFinish(product.color);
    }
  }, [product]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sanitizeNumber = (val: string) => {
    const cleaned = val.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      return `${parts[0]}.${parts.slice(1).join("")}`;
    }
    return cleaned;
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};

    const wNum = parseFloat(customWidth);
    if (!customWidth.trim()) {
      newErrors.width = "El ancho es obligatorio.";
    } else if (isNaN(wNum) || wNum <= 0) {
      newErrors.width = "Ingresa una medida válida.";
    } else if (wNum < LIMITS.width.min || wNum > LIMITS.width.max) {
      newErrors.width = `Debe estar entre ${LIMITS.width.min} y ${LIMITS.width.max} cm.`;
    }

    const hNum = parseFloat(customHeight);
    if (!customHeight.trim()) {
      newErrors.height = "El alto es obligatorio.";
    } else if (isNaN(hNum) || hNum <= 0) {
      newErrors.height = "Ingresa una medida válida.";
    } else if (hNum < LIMITS.height.min || hNum > LIMITS.height.max) {
      newErrors.height = `Debe estar entre ${LIMITS.height.min} y ${LIMITS.height.max} cm.`;
    }

    const dNum = parseFloat(customDepth);
    if (!customDepth.trim()) {
      newErrors.depth = "La profundidad es obligatoria.";
    } else if (isNaN(dNum) || dNum <= 0) {
      newErrors.depth = "Ingresa una medida válida.";
    } else if (dNum < LIMITS.depth.min || dNum > LIMITS.depth.max) {
      newErrors.depth = `Debe estar entre ${LIMITS.depth.min} y ${LIMITS.depth.max} cm.`;
    }

    if (!finish.trim()) {
      newErrors.finish = "Indica el acabado o color.";
    }

    if (!clientName.trim()) {
      newErrors.name = "Por favor ingresa tu nombre.";
    } else if (clientName.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 letras.";
    } else if (!NAME_REGEX.test(clientName.trim())) {
      newErrors.name = "Ingresa un nombre válido sin símbolos extraños.";
    }

    if (!clientCity.trim()) {
      newErrors.city = "Por favor indica tu sector o ciudad.";
    } else if (clientCity.trim().length < 3) {
      newErrors.city = "El sector debe tener al menos 3 caracteres.";
    } else if (!CITY_REGEX.test(clientCity.trim())) {
      newErrors.city = "Ingresa una ubicación válida.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddToCartCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      const customKey = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const customDimsText = `${customWidth} × ${customHeight} × ${customDepth} cm`;

      addToCart({
        id: product.id || "custom-product",
        name: `${furnitureType} (Personalizado a Medida)`,
        price: product.finalPrice || product.price || 0,
        quantity: 1,
        image: product.image || "/icons/placeholder.png",
        variantId: product.variantId || "custom",
        sku: product.sku ? `${product.sku}-CUSTOM` : "MEDIDA-001",
        variantName: finish || "A Medida",
        dimensions: customDimsText,
        materials: product.materials?.join(", ") || "Melamina alta resistencia",
        category: product.category,
        subcategory: product.subcategory,
        customKey: customKey,
        customization: {
          isCustom: true,
          customWidth: parseFloat(customWidth),
          customHeight: parseFloat(customHeight),
          customDepth: parseFloat(customDepth),
          finish: finish.trim(),
          notes: notes.trim(),
          clientName: clientName.trim(),
          clientCity: clientCity.trim(),
        },
      });

      toast.success("¡Mueble a medida agregado al carrito con éxito!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error al agregar el producto al carrito.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);
    const phone = "593959504842";

    const message = `Hola Muebles Maldonado, deseo solicitar una cotizacion de MUEBLE A MEDIDA:

*Mueble / Referencia:* ${furnitureType}
${product?.sku ? `*Codigo Ref:* ${product.sku}\n` : ""}*Medidas Deseadas (cm):*
  - Ancho: ${customWidth} cm
  - Alto: ${customHeight} cm
  - Fondo: ${customDepth} cm
*Acabado / Color Melamina:* ${finish}
*Presupuesto Estimado:* ${budget.trim() ? `$${budget.trim()}` : "A convenir"}
*Sector / Ciudad:* ${clientCity.trim()}
*Nombre de Contacto:* ${clientName.trim()}
${notes.trim() ? `*Detalles Especiales:* ${notes.trim()}\n` : ""}
Podrian confirmarme la cotizacion preliminar y tiempo de fabricacion e instalacion en Quito?`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          <div className="min-h-full flex items-center justify-center p-3 sm:p-4 pt-20 sm:pt-24 pb-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0 }}
              className="relative w-full max-w-xl max-h-[calc(100vh-6rem)] overflow-y-auto bg-white dark:bg-[#121212] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5 sm:p-7 custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728]"
                aria-label="Cerrar ventana de personalización"
              >
                <XMark className="w-5 h-5" />
              </button>

              <div className="mb-5 pr-8">
                <span className="label-premium text-[#634E3A] dark:text-[#D4B896] block mb-1">
                  Fabricación Personalizada · Taller Maldonado
                </span>
                <h3 className="text-xl sm:text-2xl font-medium text-zinc-900 dark:text-white leading-snug">
                  Personalizar este Mueble a Medida
                </h3>
                <p className="text-xs sm:text-sm font-normal text-zinc-600 dark:text-zinc-300 mt-1">
                  Ajustamos medidas, distribución y tableros de melamina
                  (Pelikano, Edimca, Masisa) con corte milimétrico en Quito.
                </p>
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <label
                    htmlFor="modal-mueble-ref"
                    className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Mueble de Referencia
                  </label>
                  <input
                    id="modal-mueble-ref"
                    name="muebleReferencia"
                    type="text"
                    value={furnitureType}
                    onChange={(e) => setFurnitureType(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="label-premium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-[#634E3A] dark:text-[#D4B896]" />
                      Medidas Requeridas (en Centímetros)
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-400">
                      Unidad: cm
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <label
                        htmlFor="modal-medida-ancho"
                        className="label-premium text-zinc-600 dark:text-zinc-400 block mb-1"
                      >
                        Ancho / Largo
                      </label>
                      <div className="relative">
                        <input
                          id="modal-medida-ancho"
                          name="medidaAncho"
                          type="text"
                          inputMode="decimal"
                          placeholder="Ej. 160"
                          value={customWidth}
                          onChange={(e) => {
                            setCustomWidth(sanitizeNumber(e.target.value));
                            if (errors.width)
                              setErrors((prev) => ({ ...prev, width: "" }));
                          }}
                          className={`w-full px-3 py-2 pr-10 rounded-xl border ${
                            errors.width
                              ? "border-red-500 focus:border-red-500"
                              : "border-zinc-200 dark:border-zinc-700 focus:border-[#4A3728]"
                          } bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4A3728]`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-zinc-400 pointer-events-none">
                          cm
                        </span>
                      </div>
                      {errors.width && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.width}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="modal-medida-alto"
                        className="label-premium text-zinc-600 dark:text-zinc-400 block mb-1"
                      >
                        Alto
                      </label>
                      <div className="relative">
                        <input
                          id="modal-medida-alto"
                          name="medidaAlto"
                          type="text"
                          inputMode="decimal"
                          placeholder="Ej. 80"
                          value={customHeight}
                          onChange={(e) => {
                            setCustomHeight(sanitizeNumber(e.target.value));
                            if (errors.height)
                              setErrors((prev) => ({ ...prev, height: "" }));
                          }}
                          className={`w-full px-3 py-2 pr-10 rounded-xl border ${
                            errors.height
                              ? "border-red-500 focus:border-red-500"
                              : "border-zinc-200 dark:border-zinc-700 focus:border-[#4A3728]"
                          } bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4A3728]`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-zinc-400 pointer-events-none">
                          cm
                        </span>
                      </div>
                      {errors.height && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.height}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="modal-medida-fondo"
                        className="label-premium text-zinc-600 dark:text-zinc-400 block mb-1"
                      >
                        Profundidad
                      </label>
                      <div className="relative">
                        <input
                          id="modal-medida-fondo"
                          name="medidaFondo"
                          type="text"
                          inputMode="decimal"
                          placeholder="Ej. 50"
                          value={customDepth}
                          onChange={(e) => {
                            setCustomDepth(sanitizeNumber(e.target.value));
                            if (errors.depth)
                              setErrors((prev) => ({ ...prev, depth: "" }));
                          }}
                          className={`w-full px-3 py-2 pr-10 rounded-xl border ${
                            errors.depth
                              ? "border-red-500 focus:border-red-500"
                              : "border-zinc-200 dark:border-zinc-700 focus:border-[#4A3728]"
                          } bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4A3728]`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-zinc-400 pointer-events-none">
                          cm
                        </span>
                      </div>
                      {errors.depth && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.depth}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="modal-acabado"
                      className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                    >
                      Acabado / Color Melamina
                    </label>
                    <input
                      id="modal-acabado"
                      name="acabadoMelamina"
                      type="text"
                      placeholder="Ej. Roble, Blanco, Carvalo, Cava"
                      value={finish}
                      onChange={(e) => {
                        setFinish(e.target.value);
                        if (errors.finish)
                          setErrors((prev) => ({ ...prev, finish: "" }));
                      }}
                      className={`w-full px-3 py-2 rounded-xl border ${
                        errors.finish
                          ? "border-red-500 focus:border-red-500"
                          : "border-zinc-200 dark:border-zinc-700 focus:border-[#4A3728]"
                      } bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4A3728]`}
                    />
                    {errors.finish && (
                      <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.finish}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="modal-presupuesto"
                      className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                    >
                      Presupuesto Estimado (Opcional)
                    </label>
                    <input
                      id="modal-presupuesto"
                      name="presupuestoEstimado"
                      type="text"
                      placeholder="Ej. $200 - $350"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="modal-nombre"
                      className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                    >
                      Tu Nombre Completo
                    </label>
                    <input
                      id="modal-nombre"
                      name="nombreCliente"
                      type="text"
                      placeholder="Nombre y Apellido"
                      value={clientName}
                      onChange={(e) => {
                        setClientName(e.target.value);
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      className={`w-full px-3 py-2 rounded-xl border ${
                        errors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-zinc-200 dark:border-zinc-700 focus:border-[#4A3728]"
                      } bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4A3728]`}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="modal-ciudad"
                      className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                    >
                      Sector o Ubicación
                    </label>
                    <input
                      id="modal-ciudad"
                      name="sectorCiudad"
                      type="text"
                      placeholder="Ej. El Condado, Cumbayá, Quito..."
                      value={clientCity}
                      onChange={(e) => {
                        setClientCity(e.target.value);
                        if (errors.city)
                          setErrors((prev) => ({ ...prev, city: "" }));
                      }}
                      className={`w-full px-3 py-2 rounded-xl border ${
                        errors.city
                          ? "border-red-500 focus:border-red-500"
                          : "border-zinc-200 dark:border-zinc-700 focus:border-[#4A3728]"
                      } bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4A3728]`}
                    />
                    {errors.city && (
                      <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="modal-notas"
                    className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Detalles y Observaciones (Cajones, repisas, pasacables,
                    etc.)
                  </label>
                  <textarea
                    id="modal-notas"
                    name="detallesEspeciales"
                    rows={2}
                    placeholder="Describe cualquier detalle específico de tu espacio o necesidades funcionales..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728] resize-none"
                  />
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 label-premium text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed">
                    <strong className="text-zinc-900 dark:text-white">
                      Garantía Maldonado:
                    </strong>{" "}
                    El precio base referencial se conserva al añadir al carrito.
                    Un asesor técnico verificará las medidas finales con el
                    cliente antes de la orden de corte en fábrica.
                  </span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleAddToCartCustom}
                    disabled={isSubmitting}
                    className="flex-1 h-12 rounded-full bg-[#4A3728] dark:bg-[#A6866A] hover:opacity-90 text-white dark:text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? "Procesando..."
                        : "Agregar al Carrito a Medida"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    disabled={isSubmitting}
                    className="flex-1 h-12 rounded-full bg-[#166534] hover:bg-[#14532d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    <Whatsapp className="w-4 h-4 text-white" />
                    <span>Cotizar por WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
