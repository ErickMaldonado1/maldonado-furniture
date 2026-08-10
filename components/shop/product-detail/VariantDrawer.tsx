"use client";

import { useMemo } from "react";
import Image from "next/image";
import Drawer from "@/components/ui/Drawer";
import { SiblingProduct } from "@/app/(shop)/[category]/[subcategory]/[slug]/ProductDetailClient";

interface VariantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerType: "color" | "size";
  productName: string;
  productImages: any[];
  price: number;
  finalPrice: number;
  discount?: number | null;
  sku: string;
  variants: any[];
  selectedVariant: any;
  siblingProducts?: SiblingProduct[];
  selectedColor: string | null;
  selectedSize: string | null;
  selectedDimension: string | null;
  onSelectColor: (color: string) => void;
  onSelectSize: (size: string) => void;
  onSelectDimension: (dimension: string) => void;
}

export function VariantDrawer({
  isOpen,
  onClose,
  drawerType,
  productImages = [],
  price,
  finalPrice,
  discount,
  variants = [],
  selectedVariant,
  siblingProducts = [],
  selectedColor,
  selectedSize,
  onSelectColor,
  onSelectSize,
}: VariantDrawerProps) {
  const colorItems = useMemo(() => {
    const map = new Map<
      string,
      { color: string; image: string; price: number; inStock: boolean }
    >();

    variants.forEach((v) => {
      if (v.color) {
        const colorKey = v.color.trim();
        if (!map.has(colorKey)) {
          const matchingImg =
            productImages.find(
              (img) =>
                img.color?.toLowerCase().trim() === colorKey.toLowerCase()
            )?.url ||
            productImages[0]?.url ||
            "";

          const rawPrice = v.price ?? price;
          const variantPrice = rawPrice - (rawPrice * (discount || 0)) / 100;

          map.set(colorKey, {
            color: colorKey,
            image: matchingImg,
            price: variantPrice,
            inStock: true,
          });
        }
      }
    });

    siblingProducts.forEach((sibling) => {
      const siblingColor = sibling.colors?.[0] || sibling.name;
      if (!map.has(siblingColor)) {
        map.set(siblingColor, {
          color: siblingColor,
          image: sibling.images?.[0]?.url || productImages[0]?.url || "",
          price: finalPrice,
          inStock: true,
        });
      }
    });

    if (map.size === 0 && selectedColor) {
      map.set(selectedColor, {
        color: selectedColor,
        image: productImages[0]?.url || "",
        price: finalPrice,
        inStock: true,
      });
    }

    return Array.from(map.values());
  }, [
    variants,
    siblingProducts,
    productImages,
    price,
    finalPrice,
    discount,
    selectedColor,
  ]);

  const sizeItems = useMemo(() => {
    const map = new Map<string, { size: string; price: number }>();

    variants.forEach((v) => {
      if (v.sizeLabel) {
        const label = v.sizeLabel.trim();
        if (!map.has(label)) {
          const rawPrice = v.price ?? price;
          const variantPrice = rawPrice - (rawPrice * (discount || 0)) / 100;
          map.set(label, { size: label, price: variantPrice });
        }
      }
    });

    return Array.from(map.values());
  }, [variants, price, discount]);

  const activeColor = selectedColor ?? selectedVariant?.color ?? "";
  const activeSize = selectedSize ?? selectedVariant?.sizeLabel ?? "";

  const drawerTitle = drawerType === "color" ? "Color" : "Tamaño";

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={drawerTitle}
      position="right"
    >
      <div className="flex flex-col gap-4 pt-1">
        {drawerType === "color" && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {colorItems.length === 0 ? (
              <p className="text-sm text-zinc-500 text-center py-8 col-span-full">
                No hay colores disponibles para este producto.
              </p>
            ) : (
              colorItems.map((item) => {
                const isSelected =
                  activeColor.toLowerCase().trim() ===
                  item.color.toLowerCase().trim();

                return (
                  <button
                    key={item.color}
                    type="button"
                    onClick={() => {
                      onSelectColor(item.color);
                      onClose();
                    }}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 aspect-square rounded-full overflow-hidden transition-all duration-300 ${
                        isSelected
                          ? "ring-2 ring-offset-2 ring-[#111827] dark:ring-white dark:ring-offset-zinc-950 shadow-md"
                          : "ring-1 ring-zinc-200 dark:ring-zinc-800 hover:ring-zinc-400 dark:hover:ring-zinc-600 hover:shadow-sm"
                      }`}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.color}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                          <span className="text-zinc-400 text-[10px]">
                            Sin img
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-center mt-2 relative w-full flex flex-col items-center">
                      <span
                        className={`text-[11px] block uppercase tracking-wide transition-colors ${isSelected ? "font-bold text-[#111827] dark:text-white" : "font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"}`}
                      >
                        {item.color}
                      </span>
                      {isSelected && (
                        <div className="absolute -top-10 -right-2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white flex items-center justify-center shadow-md">
                          <svg
                            className="w-3 h-3 text-white dark:text-zinc-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}

        {drawerType === "size" && (
          <div className="flex flex-col gap-3">
            {sizeItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 8V4m0 0h4M4 4l5 5m11-2V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  Este producto no tiene opciones de tamaño disponibles.
                </p>
              </div>
            ) : (
              sizeItems.map((item) => {
                const isSelected = activeSize === item.size;

                return (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => {
                      onSelectSize(item.size);
                      onClose();
                    }}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-200 cursor-pointer w-full text-left group ${
                      isSelected
                        ? "border-zinc-900 dark:border-white ring-1 ring-zinc-900 dark:ring-white shadow-sm bg-white dark:bg-zinc-900"
                        : "border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-zinc-900 dark:bg-white"
                            : "bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${isSelected ? "text-white dark:text-zinc-900" : "text-zinc-500 dark:text-zinc-400"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 8V4m0 0h4M4 4l5 5m11-2V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      </div>

                      <h4 className="text-[13px] font-medium uppercase tracking-wider text-zinc-900 dark:text-white">
                        {item.size}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[15px] font-medium text-zinc-900 dark:text-white">
                        $
                        {item.price.toLocaleString("es-EC", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>

                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white dark:text-zinc-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
}
