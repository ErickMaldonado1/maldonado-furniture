"use client";

import {
  Check,
  ChevronDown,
  X,
} from "lucide-react";

import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProductColor } from "../types/product.types";
import { useState, useMemo } from "react";

interface AttributesTabProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  watchedColors: string[];
  availableColors: ProductColor[];
  selectedCategory?: string | null;
  selectedSubcategory?: string | null;

  categories: Array<{
    id: string;
    name: string;
  }>;

  subcategories: Array<{
    id: string;
    name: string;
    categoryId?: string;
  }>;

  materials?: Array<{
    id: string;
    name: string;
  }>;

  showModal: (
    type: "success" | "error",
    title: string,
    message: string
  ) => void;
}

export function AttributesTab({
  register,
  setValue,
  watch,
  watchedColors,
  availableColors,
  selectedCategory,
  selectedSubcategory,
  categories,
  subcategories,
  materials = [],
  showModal,
}: AttributesTabProps) {
  const selectedMaterial = watch("materials") as string[] | undefined;
  const isFlashDeal = Boolean(watch("isFlashDeal"));

  const [selectedCompany, setSelectedCompany] = useState<string>("ALL");

  const companies = useMemo(() => {
    const allCompanies = availableColors.map(c => c.company).filter(Boolean);
    return Array.from(new Set(allCompanies));
  }, [availableColors]);

  const displayedColors = useMemo(() => {
    if (selectedCompany === "ALL") return availableColors;
    return availableColors.filter(c => c.company === selectedCompany);
  }, [availableColors, selectedCompany]);

  const toggleColor = (
    colorName: string
  ) => {
    const current = Array.isArray(
      watchedColors
    )
      ? watchedColors
      : [];

    if (current.includes(colorName)) {
      setValue(
        "colors",
        current.filter(
          (color) => color !== colorName
        ),
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );

      return;
    }

    setValue(
      "colors",
      [...current, colorName],
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const removeColor = (
    colorName: string
  ) => {
    setValue(
      "colors",
      watchedColors.filter(
        (color) => color !== colorName
      ),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    setValue("category", categoryId, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("subcategory", "", {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const filteredSubcategories =
    selectedCategory
      ? subcategories.filter(
          (subcategory) =>
            subcategory.categoryId ===
            selectedCategory
        )
      : subcategories;

  const getColorData = (
    colorName: string
  ) =>
    availableColors.find(
      (color) =>
        color.name === colorName
    );

  return (
    <div className="space-y-6">

      <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-5 sm:p-6">

        <div className="mb-5">

          <h2 className="text-base font-bold text-zinc-900 dark:text-white">
            Clasificación del producto
          </h2>

          <p className="text-xs text-zinc-500 mt-1">
            Define dónde aparecerá el producto dentro
            del catálogo.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    
          <div className="space-y-2">

            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
              Categoría
            </label>

            <div className="relative">

              <select
                {...register("category")}
                value={
                  selectedCategory || ""
                }
                onChange={(e) =>
                  handleCategoryChange(
                    e.target.value
                  )
                }
                className="appearance-none w-full px-3 py-3 pr-10 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-[#A6866A]/20"
              >

                <option value="">
                  Seleccionar categoría
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  )
                )}

              </select>

              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />

            </div>

          </div>

          <div className="space-y-2">

            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
              Subcategoría
            </label>

            <div className="relative">

              <select
                {...register("subcategory")}
                value={
                  selectedSubcategory || ""
                }
                disabled={
                  !selectedCategory
                }
                className="appearance-none w-full px-3 py-3 pr-10 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-[#A6866A]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                <option value="">
                  {!selectedCategory
                    ? "Selecciona primero una categoría"
                    : "Seleccionar subcategoría"}
                </option>

                {filteredSubcategories.map(
                  (subcategory) => (
                    <option
                      key={subcategory.id}
                      value={subcategory.id}
                    >
                      {subcategory.name}
                    </option>
                  )
                )}

              </select>

              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />

            </div>

          </div>

        </div>

      </div>

 
      <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-5 sm:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

          <div>

            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              Colores disponibles
            </h2>

            <p className="text-xs text-zinc-500 mt-1">
              Selecciona los colores que estarán
              disponibles para este producto.
            </p>

          </div>

          <span className="self-start sm:self-auto px-3 py-1.5 rounded-full bg-[#A6866A]/10 text-[#A6866A] text-[11px] font-black">
            {watchedColors.length} seleccionados
          </span>

        </div>

     
        {watchedColors.length > 0 && (

          <div className="mb-5">

            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Seleccionados
            </p>

            <div className="flex flex-wrap gap-2">

              {watchedColors.map(
                (colorName) => {

                  const color =
                    getColorData(
                      colorName
                    );

                  return (
                    <div
                      key={colorName}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                    >

                      <div
                        className="w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0"
                        style={{
                          backgroundColor:
                            color?.hexCode ||
                            "#ccc",
                        }}
                      >

                        {color?.imageUrl && (
                          <img
                            src={
                              color.imageUrl
                            }
                            alt={
                              colorName
                            }
                            className="w-full h-full object-cover"
                          />
                        )}

                      </div>

                      <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                        {colorName}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeColor(
                            colorName
                          )
                        }
                        className="ml-1 text-zinc-400 hover:text-red-500 transition"
                        title="Quitar color"
                      >
                        <X size={14} />
                      </button>

                    </div>
                  );
                }
              )}

            </div>

          </div>
        )}

        {companies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            <button
              type="button"
              onClick={() => setSelectedCompany("ALL")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCompany === "ALL"
                  ? "bg-[#A6866A] text-white shadow-md shadow-[#A6866A]/20"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Todos
            </button>
            {companies.map((company) => (
              <button
                key={company}
                type="button"
                onClick={() => setSelectedCompany(company)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCompany === company
                    ? "bg-[#A6866A] text-white shadow-md shadow-[#A6866A]/20"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {company}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">

          {availableColors.length ===
          0 ? (

            <div className="col-span-full py-10 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl">

              <p className="text-xs text-zinc-400">
                No hay colores disponibles.
              </p>

            </div>

          ) : (
            displayedColors.map(
              (color) => {

                const selected =
                  watchedColors.includes(
                    color.name
                  );

                return (
                  <button
                    key={
                      color.id ||
                      color.name
                    }
                    type="button"
                    onClick={() =>
                      toggleColor(
                        color.name
                      )
                    }
                    className={`group relative overflow-hidden rounded-xl border text-left transition-all ${
                      selected
                        ? "border-[#A6866A] ring-2 ring-[#A6866A]/20"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-[#A6866A]/50"
                    }`}
                  >


                    <div
                      className="relative h-24 w-full"
                      style={{
                        backgroundColor:
                          color.hexCode ||
                          "#ccc",
                      }}
                    >

                      {color.imageUrl && (
                        <img
                          src={
                            color.imageUrl
                          }
                          alt={
                            color.name
                          }
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}

                      {selected && (

                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">

                          <div className="w-8 h-8 rounded-full bg-[#A6866A] text-white flex items-center justify-center shadow-lg">

                            <Check
                              size={18}
                              strokeWidth={3}
                            />

                          </div>

                        </div>

                      )}

                    </div>


                    <div className="px-3 py-2.5 bg-white dark:bg-zinc-900">

                      <p className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 truncate">
                        {color.name}
                      </p>

                      {color.hexCode && (
                        <p className="text-[9px] font-mono text-zinc-400 mt-0.5">
                          {color.hexCode}
                        </p>
                      )}

                    </div>

                  </button>
                );
              }
            )

          )}

        </div>

      </div>

      <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-5 sm:p-6">

        <div className="mb-5">

          <h2 className="text-base font-bold text-zinc-900 dark:text-white">
            Material
          </h2>

          <p className="text-xs text-zinc-500 mt-1">
            Define el material principal utilizado
            para fabricar el producto.
          </p>

        </div>

        {materials.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

            {materials.map(
              (material) => {

                const selected = selectedMaterial?.includes(material.id);

                return (
                  <button
                    key={material.id}
                    type="button"
                    onClick={() =>
                      setValue(
                        "materials",
                        [material.id], 
                        {
                          shouldDirty: true,
                          shouldValidate: true,
                        }
                      )
                    }
                    className={`p-4 rounded-xl border text-left transition ${
                      selected
                        ? "border-[#A6866A] bg-[#A6866A]/5 ring-2 ring-[#A6866A]/10"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-[#A6866A]/40"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                        {material.name}
                      </span>

                      {selected && (
                        <div className="w-5 h-5 rounded-full bg-[#A6866A] text-white flex items-center justify-center">
                          <Check
                            size={13}
                            strokeWidth={3}
                          />
                        </div>
                      )}

                    </div>

                  </button>
                );
              }
            )}

          </div>

        ) : (

          <input
            {...register("materials")}
            placeholder="Ej: Melamina"
            className="w-full px-3 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-[#A6866A]/20"
          />

        )}

      </div>

      <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-5 sm:p-6">

        <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30">

          <div>

            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              Oferta Flash
            </p>

            <p className="text-[11px] text-zinc-500 mt-1">
              Mostrar este producto como destacado
              dentro del catálogo.
            </p>

          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isFlashDeal}
            onClick={() =>
              setValue("isFlashDeal", !isFlashDeal, {
                  shouldDirty:
                    true,
                  shouldValidate:
                    true,
                }
              )
            }
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
              isFlashDeal
                ? "bg-[#A6866A]"
                : "bg-zinc-300 dark:bg-zinc-700"
            }`}
          >

            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                isFlashDeal
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />

          </button>

        </div>

      </div>
      <div className="p-4 rounded-xl bg-[#A6866A]/5 border border-[#A6866A]/10">

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400">

          <span>
            <strong>Colores:</strong>{" "}
            {watchedColors.length}
          </span>

          <span>
            <strong>Categoría:</strong>{" "}
            {selectedCategory
              ? categories.find(
                  (category) =>
                    category.id ===
                    selectedCategory
                )?.name ||
                "Seleccionada"
              : "Sin seleccionar"}
          </span>

          <span>
            <strong>Subcategoría:</strong>{" "}
            {selectedSubcategory
              ? filteredSubcategories.find(
                  (subcategory) =>
                    subcategory.id ===
                    selectedSubcategory
                )?.name ||
                "Seleccionada"
              : "Sin seleccionar"}
          </span>

        </div>

      </div>

    </div>
  );
}