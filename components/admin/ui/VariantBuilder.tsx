"use client";

import { useState } from "react";
import { Cube, Plus, Trash } from "@/utils/icons/actions";

interface Variant {
  name: string;
  sku: string;
  color: string;
  material: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

interface VariantBuilderProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
  baseSku: string;
}

export function VariantBuilder({
  variants,
  onChange,
  baseSku,
}: VariantBuilderProps) {
  const [newVariant, setNewVariant] = useState<Partial<Variant>>({
    dimensions: { width: 0, height: 0, depth: 0 },
  });

  const addVariant = () => {
    if (!newVariant.color || !newVariant.material) return;

    const variantName = `Variant - ${newVariant.color}`;
    const generatedSku = `${baseSku}-${newVariant.color?.substring(0, 3).toUpperCase()}`;

    const variantToAdd: Variant = {
      name: newVariant.name || variantName,
      sku: newVariant.sku || generatedSku,
      color: newVariant.color,
      material: newVariant.material,
      dimensions: {
        width: Number(newVariant.dimensions?.width) || 0,
        height: Number(newVariant.dimensions?.height) || 0,
        depth: Number(newVariant.dimensions?.depth) || 0,
      },
    };

    onChange([...variants, variantToAdd]);
    setNewVariant({
      dimensions: { width: 0, height: 0, depth: 0 },
      color: "",
      material: "",
    });
  };

  const removeVariant = (index: number) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
          <Cube className="text-lg" />
          Constructor de Variantes
        </h3>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Color (ej. Alaska)"
            value={newVariant.color || ""}
            onChange={(e) =>
              setNewVariant({ ...newVariant, color: e.target.value })
            }
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="Material"
            value={newVariant.material || ""}
            onChange={(e) =>
              setNewVariant({ ...newVariant, material: e.target.value })
            }
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="Nombre Variante (Opcional)"
            value={newVariant.name || ""}
            onChange={(e) =>
              setNewVariant({ ...newVariant, name: e.target.value })
            }
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="SKU (Opcional)"
            value={newVariant.sku || ""}
            onChange={(e) =>
              setNewVariant({ ...newVariant, sku: e.target.value })
            }
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-lg text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase text-zinc-400">
            Dimensiones (cm):
          </span>
          <input
            type="number"
            placeholder="Ancho"
            value={newVariant.dimensions?.width || ""}
            onChange={(e) =>
              setNewVariant({
                ...newVariant,
                dimensions: {
                  ...newVariant.dimensions!,
                  width: parseFloat(e.target.value),
                },
              })
            }
            className="w-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-lg text-sm"
          />
          <input
            type="number"
            placeholder="Alto"
            value={newVariant.dimensions?.height || ""}
            onChange={(e) =>
              setNewVariant({
                ...newVariant,
                dimensions: {
                  ...newVariant.dimensions!,
                  height: parseFloat(e.target.value),
                },
              })
            }
            className="w-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-lg text-sm"
          />
          <input
            type="number"
            placeholder="Prof."
            value={newVariant.dimensions?.depth || ""}
            onChange={(e) =>
              setNewVariant({
                ...newVariant,
                dimensions: {
                  ...newVariant.dimensions!,
                  depth: parseFloat(e.target.value),
                },
              })
            }
            className="w-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-lg text-sm"
          />

          <button
            type="button"
            onClick={addVariant}
            disabled={!newVariant.color || !newVariant.material}
            className="ml-auto bg-[#4A3728] text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:shadow-lg disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
          >
            <Plus />
            Agregar Variante
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {variants.map((variant, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-white dark:bg-[#0D0D0D] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"
          >
            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm text-zinc-900 dark:text-white">
                {variant.name}
              </span>
              <span className="text-xs text-zinc-500">
                SKU: {variant.sku} | Color: {variant.color} | Mat:{" "}
                {variant.material}
              </span>
              <span className="text-xs text-zinc-400">
                {variant.dimensions.width}x{variant.dimensions.height}x
                {variant.dimensions.depth} cm
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeVariant(idx)}
              className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash className="text-lg" />
            </button>
          </div>
        ))}
        {variants.length === 0 && (
          <p className="text-center text-sm text-zinc-400 py-4 italic">
            No has agregado ninguna variante aún.
          </p>
        )}
      </div>
    </div>
  );
}
