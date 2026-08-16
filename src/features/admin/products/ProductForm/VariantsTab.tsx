"use client";

import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";

import { useFormContext } from "react-hook-form";
import { useProductVariants } from "../hooks/useProductVariants";
import { ProductColor, TabType } from "../types/product.types";

interface VariantsTabProps {
  availableColors: ProductColor[];
  showModal: (type: "success" | "error", title: string, message: string) => void;
  setActiveTab: (tab: TabType) => void;
}

export function VariantsTab({ availableColors, showModal, setActiveTab }: VariantsTabProps) {
  const { register } = useFormContext();
  
  const {
    watchedColors,
    watchedDimensions,
    watchedProductName,
    basePrice,
    generatedVariantCount,
    expandedDimensions,
    addDimension,
    removeDimension,
    toggleDimension,
    getDimensionLabel,
    getDimensionPrice,
  } = useProductVariants({ showModal });

  return (
    <div className="bg-white dark:bg-[#111111] p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">

            <span className="w-1.5 h-6 bg-[#A6866A] rounded-full"></span>

            Constructor de Variantes

          </h2>

          <p className="text-xs text-zinc-500 mt-2 max-w-2xl">
            Las variantes se generan automáticamente
            utilizando las medidas y los colores
            seleccionados en Atributos.
          </p>
        </div>

        <div className="shrink-0 px-4 py-2 rounded-xl bg-[#A6866A]/10 text-[#A6866A] dark:text-[#D4A373] text-xs font-black">
          {generatedVariantCount}{" "}
          {generatedVariantCount === 1
            ? "combinación"
            : "combinaciones"}
        </div>

      </div>

      <div className="mb-6 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">

        <p className="text-xs font-black text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2">
          ⚡ Cómo funciona
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-amber-700 dark:text-amber-300/80">

          <div>
            <p className="font-bold mb-1">
              1. Colores
            </p>

            <p className="opacity-80">
              Los colores se seleccionan una sola vez
              en la pestaña Atributos.
            </p>
          </div>

          <div>
            <p className="font-bold mb-1">
              2. Medidas
            </p>

            <p className="opacity-80">
              Agrega las medidas y asigna su precio.
            </p>
          </div>

          <div>
            <p className="font-bold mb-1">
              3. Variantes
            </p>

            <p className="opacity-80">
              El sistema combina automáticamente
              medidas × colores.
            </p>
          </div>

        </div>
      </div>

      <div className="mb-8 p-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">

        <div className="flex items-center justify-between gap-4 mb-4">

          <div>
            <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase">
              Colores utilizados
            </h3>

            <p className="text-[11px] text-zinc-500 mt-1">
              Estos colores vienen directamente de
              Atributos.
            </p>
          </div>

          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#A6866A]/10 text-[#A6866A]">
            {watchedColors.length} seleccionados
          </span>

        </div>

        {watchedColors.length === 0 ? (

          <div className="p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">

            <p className="text-xs text-zinc-400">
              No hay colores seleccionados.
            </p>

            <button
              type="button"
              onClick={() =>
                setActiveTab("attributes")
              }
              className="mt-2 text-xs font-bold text-[#A6866A] hover:underline"
            >
              Ir a Atributos
            </button>

          </div>

        ) : (

          <div className="flex flex-wrap gap-2">

            {watchedColors.map(
              (colorName: string) => {

                const colorData =
                  availableColors.find(
                    (color) =>
                      color.name === colorName
                  );

                return (
                  <div
                    key={colorName}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                  >

                    <div
                      className="w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-700 overflow-hidden"
                      style={{
                        backgroundColor:
                          colorData?.hexCode ||
                          "#ccc",
                      }}
                    >
                      {colorData?.imageUrl && (
                        <img
                          src={colorData.imageUrl}
                          alt={colorName}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                      {colorName}
                    </span>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>

     
      <div className="flex justify-between items-center mb-4">

        <div>
          <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase">
            Medidas y precios
          </h3>

          <p className="text-[11px] text-zinc-500 mt-1">
            Cada medida puede tener su propio precio.
          </p>
        </div>

        <button
          type="button"
          onClick={addDimension}
          className="group text-[#A6866A] bg-[#A6866A]/10 hover:bg-[#A6866A] hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <Plus
            size={16}
            className="group-hover:rotate-90 transition-transform"
          />

          Añadir Medida
        </button>

      </div>

     
      <div className="space-y-4">

        {watchedDimensions.map(
          (dimension, index) => {

            const isExpanded =
              expandedDimensions[index] ?? true;

            return (
              <div
                key={index}
                className={`border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-950/40 relative group transition-all duration-300 ${
                  isExpanded
                    ? "p-4 sm:p-6 pt-10"
                    : "p-4"
                } hover:border-[#A6866A]/40 shadow-sm hover:shadow-md`}
              >

                {isExpanded && (
                  <div className="absolute -top-3 left-6 bg-[#A6866A] text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 shadow-sm flex items-center gap-2">
                    MEDIDA {index + 1}
                  </div>
                )}

              
                <div
                  className={`flex justify-end absolute gap-2 z-10 ${
                    isExpanded
                      ? "-top-3 right-6"
                      : "top-1/2 -translate-y-1/2 right-4"
                  }`}
                >

                  <button
                    type="button"
                    onClick={() =>
                      toggleDimension(index)
                    }
                    className="bg-white dark:bg-zinc-800 text-zinc-500 hover:text-[#A6866A] p-2 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm transition-all"
                    title={
                      isExpanded
                        ? "Contraer"
                        : "Expandir"
                    }
                  >
                    {isExpanded ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removeDimension(index)
                    }
                    className="bg-white dark:bg-zinc-800 text-zinc-500 hover:text-red-500 p-2 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm transition-all"
                    title="Eliminar medida"
                  >
                    <Trash2 size={14} />
                  </button>

                </div>

            
                {!isExpanded ? (

                  <div
                    className="pr-20 cursor-pointer"
                    onClick={() =>
                      toggleDimension(index)
                    }
                  >

                    <div className="flex flex-wrap items-center gap-3">

                      <span className="w-1.5 h-1.5 rounded-full bg-[#A6866A]" />

                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        {getDimensionLabel(
                          dimension
                        )}
                      </span>

                      <span className="text-xs font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
                        {getDimensionPrice(
                          dimension
                        )}
                      </span>

                    </div>

                  </div>

                ) : (

                
                  <div className="space-y-6">

              
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <div className="space-y-1.5">

                        <div className="flex items-center gap-1.5">

                          <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                            Etiqueta de Tamaño
                          </label>

                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                            Visible al cliente
                          </span>

                        </div>

                        <input
                          {...register(
                            `variantConfig.dimensions.${index}.sizeLabel`
                          )}
                          placeholder="Ej: 180 cm / 180 × 50 × 35 cm"
                          className="w-full text-sm border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#A6866A]/20 outline-none transition-all"
                        />

                        <p className="text-[10px] text-zinc-400 ml-1">
                          Si lo dejas vacío, se generará automáticamente con las medidas.
                        </p>

                      </div>

                      <div className="space-y-1.5">

                        <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1 block">
                          Precio de esta medida
                        </label>

                        <div className="relative">

                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">
                            $
                          </span>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register(
                              `variantConfig.dimensions.${index}.price`
                            )}
                            placeholder="Usar precio base"
                            className="w-full pl-8 text-base font-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-zinc-100 dark:bg-zinc-800/50 text-[#A6866A] dark:text-[#D4A373] outline-none focus:ring-2 focus:ring-[#A6866A]/40 focus:bg-white dark:focus:bg-zinc-900 transition-all"
                          />

                        </div>

                        <p className="text-[10px] text-zinc-400 ml-1">
                          Si está vacío, se utilizará el precio base.
                        </p>

                      </div>

                    </div>

                   
                    <div className="p-5 bg-white dark:bg-[#111111] rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-5">

                      <div className="flex items-center justify-between">

                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase opacity-70">
                          Dimensiones físicas
                        </h4>

                        {(Number(dimension.width) > 0 ||
                          Number(dimension.height) > 0 ||
                          Number(dimension.depth) > 0) && (

                          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#A6866A]/10 text-[#A6866A] dark:text-[#D4A373]">

                            {dimension.width || 0} ×{" "}
                            {dimension.height || 0} ×{" "}
                            {dimension.depth || 0} cm

                          </span>

                        )}

                      </div>

                     
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                        {[
                          {
                            label: "Largo / Ancho",
                            field: "width",
                            hint: "Ej: 180",
                          },
                          {
                            label: "Alto",
                            field: "height",
                            hint: "Ej: 50",
                          },
                          {
                            label: "Profundidad",
                            field: "depth",
                            hint: "Ej: 35",
                          },
                        ].map((dim) => (

                          <div
                            key={dim.field}
                            className="space-y-1"
                          >

                            <label className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-black ml-1 block">

                              {dim.label}{" "}

                              <span className="font-normal lowercase">
                                (cm)
                              </span>

                            </label>

                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              {...register(
                                `variantConfig.dimensions.${index}.${dim.field}`
                              )}
                              placeholder={dim.hint}
                              className="w-full text-sm font-bold border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 bg-zinc-50 dark:bg-zinc-900 text-[#A6866A] dark:text-[#D4A373] outline-none focus:ring-2 focus:ring-[#A6866A]/20 transition-all text-center placeholder:text-zinc-300 dark:placeholder:text-zinc-700 placeholder:font-normal"
                            />

                          </div>

                        ))}

                      </div>

                     
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">

                        <div className="space-y-1">

                          <label className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-black ml-1 block">

                            Espesor{" "}

                            <span className="font-normal lowercase">
                              (mm)
                            </span>

                          </label>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register(
                              `variantConfig.dimensions.${index}.thickness`
                            )}
                            placeholder="Opcional"
                            className="w-full text-sm font-bold border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 bg-zinc-50 dark:bg-zinc-900 text-[#A6866A] dark:text-[#D4A373] outline-none focus:ring-2 focus:ring-[#A6866A]/20 transition-all text-center placeholder:text-zinc-300 dark:placeholder:text-zinc-700 placeholder:font-normal"
                          />

                        </div>

                      </div>

                    </div>

                  </div>
                )}

              </div>
            );
          }
        )}

      </div>

    
      <div className="mt-8 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/40">

        <div className="flex items-center justify-between gap-4 mb-4">

          <div>
            <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase">
              Vista previa de combinaciones
            </h3>

            <p className="text-[11px] text-zinc-500 mt-1">
              Estas son las variantes que el servidor
              creará automáticamente.
            </p>
          </div>

          <span className="text-xs font-black text-[#A6866A]">
            {generatedVariantCount} total
          </span>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-72 overflow-y-auto custom-scrollbar">

          {watchedDimensions
            .filter(
              (dimension) =>
                Number(dimension?.width) > 0 ||
                Number(dimension?.height) > 0 ||
                Number(dimension?.depth) > 0
            )
            .flatMap(
              (
                dimension,
                dimensionIndex
              ) => {

                const colors =
                  watchedColors.length > 0
                    ? watchedColors
                    : ["Sin color"];

                return colors.map(
                  (
                    color: string,
                    colorIndex: number
                  ) => {

                    const label =
                      watchedProductName?.trim() ||
                      "Producto";

                    const variantName =
                      color &&
                      color !== "Sin color"
                        ? `${label} - ${color}`
                        : label;

                    const price =
                      dimension.price !== null &&
                      dimension.price !== undefined
                        ? dimension.price
                        : basePrice || 0;

                    return (
                      <div
                        key={`${dimensionIndex}-${colorIndex}`}
                        className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
                      >

                        <div className="min-w-0">

                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                            {variantName}
                          </p>

                          <p className="text-[10px] text-zinc-500 mt-0.5">
                            {getDimensionLabel(
                              dimension
                            )}
                          </p>

                        </div>

                        <span className="shrink-0 text-xs font-black text-[#A6866A]">
                          ${price}
                        </span>

                      </div>
                    );
                  }
                );
              }
            )}

          {generatedVariantCount === 0 && (

            <div className="md:col-span-2 text-center py-8 text-xs text-zinc-400">
              Agrega una medida válida para comenzar
              a generar variantes.
            </div>

          )}

        </div>

      </div>

    </div>
  );
}