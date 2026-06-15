"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Whatsapp } from "@/utils/icons/social";
import { Minus, Truck } from "@/utils/icons/shop";
import { CartPlusIcon, Plus } from "@/utils/icons/actions";
import { ShieldCheck } from "@/utils/icons/ui";
const ProductAccordion = dynamic(
  () => import("./ProductAccordion").then((mod) => mod.ProductAccordion),
  { ssr: false },
);

interface ProductActionsProps {
  productName: string;
  sku: string;
  color: string;
  quantity: number;
  setQuantity: (q: number) => void;
  onAddToCart: () => void;
  price: number;
  finalPrice: number;
  discount?: number | null;
  stock?: number;
  isInCart?: boolean;
  dimensions?: {
    height: number;
    width: number;
    depth: number;
  };
  materials?: string[];
  careInstructions?: string;
  variants?: any[];
  selectedVariant?: any;
  onVariantChange?: (variant: any) => void;
}

export function ProductActions({
  productName,
  sku,
  color,
  quantity,
  setQuantity,
  onAddToCart,
  price,
  finalPrice,
  discount,
  stock = 100,
  isInCart = false,
  dimensions,
  materials,
  careInstructions,
  variants = [],
  selectedVariant,
  onVariantChange,
}: ProductActionsProps) {
  const sizes = useMemo(() => {
    return Array.from(
      new Set(variants.map((v) => v.sizeLabel).filter(Boolean)),
    );
  }, [variants]);

  const dims = useMemo(() => {
    return Array.from(
      new Set(variants.map((v) => v.dimensionLabel).filter(Boolean)),
    );
  }, [variants]);

  const handleSmartVariantChange = (
    type: "sizeLabel" | "dimensionLabel",
    value: string,
  ) => {
    if (!variants || variants.length === 0) return;

    const candidates = variants.filter((v) => v[type] === value);
    if (candidates.length === 0) return;

    let bestMatch = candidates.find(
      (v) =>
        v.color === selectedVariant?.color &&
        v.material === selectedVariant?.material,
    );

    if (!bestMatch) {
      bestMatch = candidates.find((v) => v.color === selectedVariant?.color);
    }

    if (!bestMatch) {
      bestMatch = candidates.find(
        (v) => v.material === selectedVariant?.material,
      );
    }

    if (!bestMatch) {
      bestMatch = candidates[0];
    }

    onVariantChange?.(bestMatch);
  };
  const handleWhatsApp = () => {
    const message = `👋 ¡Hola! Me interesa este producto:
🪑 *Producto:* ${productName}
🆔 *SKU:* ${sku}
🎨 *Color:* ${color}
🔢 *Cantidad:* ${quantity}
💰 *Precio:* $${finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
📍 ¿Tienen disponibilidad inmediata?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/593959504842?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-2">
      {sizes.length > 0 && (
        <div className="space-y-2">
          <p className="text-base font-bold  text-zinc-900 dark:text-white">
            Tamaño
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size: any) => {
              const isSelected = selectedVariant?.sizeLabel === size;
              return (
                <button
                  key={size}
                  onClick={() => handleSmartVariantChange("sizeLabel", size)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all ${
                    isSelected
                      ? "border-zinc-900 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {dims.length > 0 && (
        <div className="space-y-3">
          <p className="text-[12px] font-bold  text-zinc-900 dark:text-zinc-400">
            Dimensión
          </p>
          <div className="flex flex-wrap gap-2">
            {dims.map((dim: any) => {
              const isSelected = selectedVariant?.dimensionLabel === dim;
              return (
                <button
                  key={dim}
                  onClick={() =>
                    handleSmartVariantChange("dimensionLabel", dim)
                  }
                  className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all ${
                    isSelected
                      ? "border-zinc-900 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500"
                  }`}
                >
                  {dim}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
            Precio final
          </span>
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
              $
              {finalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            {discount && discount > 0 && (
              <div className="flex flex-col items-start leading-tight">
                <span className="text-sm text-zinc-400 line-through decoration-red-500/50 font-bold">
                  $
                  {price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-[10px] font-black bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-md uppercase tracking-widest mt-0.5 border border-red-100 dark:border-red-900/30">
                  -{discount}% OFF
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center h-14 w-36 justify-between px-2 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 transition-all duration-300 hover:border-[#4A3728]/40 focus-within:border-[#4A3728]">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Disminuir cantidad"
            className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-[#4A3728] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus className="w-5 h-5" />
          </button>

          <span className="font-extrabold text-base tabular-nums text-zinc-900 dark:text-white">
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity(Math.min(quantity + 1, Math.min(stock, 3)))
            }
            disabled={quantity >= Math.min(stock, 3)}
            aria-label="Aumentar cantidad"
            className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-[#4A3728] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={isInCart ? undefined : onAddToCart}
          disabled={isInCart}
          className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.97] ${
            isInCart
              ? "bg-zinc-200 text-zinc-500 cursor-not-allowed dark:bg-zinc-800"
              : "bg-[#141414] text-white hover:bg-zinc-700 dark:hover:bg-zinc-600 active:scale-95"
          }`}
        >
          <span>{isInCart ? "En el carrito" : "Añadir al carrito"}</span>
          <CartPlusIcon className="w-5 h-5" />
        </button>

        <button
          onClick={handleWhatsApp}
          aria-label="Contactar por WhatsApp"
          className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-green-500/30 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 active:scale-95 group shadow-lg shadow-green-100/50 dark:shadow-none"
        >
          <Whatsapp className="w-6 h-6" />
        </button>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2">
        {[
          {
            label: "Envío gratis a domicilio en Quito",
            icon: <Truck className="w-4 h-4" />,
          },
          {
            label: "Entrega protegida y garantizada",
            icon: <ShieldCheck className="w-4 h-4" />,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 cursor-default"
          >
            <div className="w-9 h-9 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-[#4A3728]">
              {item.icon}
            </div>
            <span className="text-[12px] font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <ProductAccordion
        dimensions={dimensions}
        materials={materials}
        careInstructions={careInstructions}
      />
    </div>
  );
}
