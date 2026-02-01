"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  ProductFormValues,
} from "@/features/admin/product.schema";
import {
  createFullProduct,
  updateFullProduct,
  uploadProductImage,
} from "@/features/admin/product.actions";
import { useRouter } from "next/navigation";
import { categories } from "@/utils/categories";
import { Trash2, Plus, Upload, X, Save, ChevronDown } from "lucide-react";
import Image from "next/image";

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      price: 0,
      discount: 0,
      deliveryDays: 8,
      category: "",
      subcategory: "",
      colors: [],
      styles: [],
      materials: [],
      isFlashDeal: false,
      isActive: true,
      images: [],
      variants: [
        {
          name: "Estándar",
          sku: "",
          width: 0,
          height: 0,
          depth: 0,
          thickness: null,
          color: null,
          material: null,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    if (initialData) {
      const formData = {
        ...initialData,
        price: Number(initialData.price),
        discount: Number(initialData.discount || 0),
        deliveryDays: Number(initialData.deliveryDays || 8),
        variants: initialData.variants.map((v: any) => ({
          id: v.id,
          name: v.name,
          sku: v.sku,
          thickness: v.thickness,
          color: v.color || null,
          material: v.material || null,
          width: v.dimensions?.width || 0,
          height: v.dimensions?.height || 0,
          depth: v.dimensions?.depth || 0,
        })),
        images: initialData.images.map((img: any) => ({
          url: img.url,
          publicId: img.publicId,
          color: img.color || null,
          variantId: img.variantId || null,
        })),
      };
      reset(formData);
      setSelectedCategorySlug(
        categories.find(
          (c) =>
            c.slug === initialData.category || c.label === initialData.category,
        )?.slug || "",
      );
    }
  }, [initialData, reset]);

  const watchedCategory = watch("category");
  const watchedImages = watch("images");
  const watchedColors = watch("colors") || [];

  useEffect(() => {
    const cat = categories.find((c) => c.slug === watchedCategory);
    if (cat) {
      setSelectedCategorySlug(cat.slug);
    } else {
      setSelectedCategorySlug("");
    }
  }, [watchedCategory]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        await new Promise<void>((resolve) => {
          reader.onloadend = async () => {
            const res = await uploadProductImage(reader.result as string);
            if (res.success) {
              const current = watch("images");
              setValue("images", [
                ...current,
                { url: res.url, publicId: res.publicId, color: null },
              ]);
            } else {
              alert("Error subiendo imagen: " + res.error);
            }
            resolve();
          };
        });
      }
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const current = watch("images");
    setValue(
      "images",
      current.filter((_, i) => i !== index),
    );
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    let res;
    if (initialData?.id) {
      res = await updateFullProduct(initialData.id, data);
    } else {
      res = await createFullProduct(data);
    }

    if (res.success) {
      alert(
        initialData
          ? "Producto actualizado correctamente"
          : "Producto creado correctamente",
      );
      router.push("/admin/products");
      router.refresh();
    } else {
      alert("Error: " + res.error);
    }
  };

  const subcategories =
    categories.find((c) => c.slug === selectedCategorySlug)?.subcategories ||
    [];

  const AVAILABLE_COLORS = [
    "Artiko",
    "Bardolino",
    "Wengué",
    "Bellota",
    "Capri",
    "Caramelo",
    "Blanco",
    "Negro",
    "Coñac",
    "Duna",
    "Fumé",
    "Lino",
    "Macadamia",
    "Nacar",
    "Niebla",
    "Panela",
    "Rovere",
    "Tivoli",
    "Alaska",
    "Catania",
    "Cedro Merak",
    "Nogal Paris",
    "Roble Natural",
    "Tintoretto",
    "Carvalo",
    "Cava",
    "Cedro",
    "Fibra",
    "Magma",
  ];
  const AVAILABLE_STYLES = [
    "Minimalista",
    "Moderno",
    "Contemporáneo",
    "Clásico",
    "Industrial",
    "Rústico",
  ];
  const AVAILABLE_MATERIALS = [
    "Madera Sólida",
    "Melamina",
    "Mixto (Melamina y Madera)",
    "Vidrio",
    "Tela",
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 animate-in fade-in duration-500"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800 pt-2 md:pt-16">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            {initialData ? "Editar Producto" : "Nuevo Producto"}
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {initialData
              ? "Actualiza los detalles del producto"
              : "Completa la información para publicar"}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className="bg-zinc-900 dark:bg-[#A6866A] text-white px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide flex items-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {isSubmitting ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <Save size={18} />
            )}
            {initialData ? "Guardar Cambios" : "Publicar Producto"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#111111] p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#A6866A] rounded-full"></span>
              Información Básica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                  Nombre del Producto
                </label>
                <input
                  {...register("name")}
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white"
                  placeholder="Ej. Cama King Size Moderna"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                  SKU (Código Único)
                </label>
                <input
                  {...register("sku")}
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white font-mono"
                  placeholder="Ej. CAM-KS-001"
                />
                {errors.sku && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.sku.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                  Precio ($)
                </label>
                <input
                  {...register("price")}
                  type="number"
                  step="0.01"
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white font-mono"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                  Descuento (%)
                </label>
                <input
                  {...register("discount")}
                  type="number"
                  step="0.01"
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white font-mono"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                  Días de Envío
                </label>
                <input
                  {...register("deliveryDays")}
                  type="number"
                  min="1"
                  max="365"
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white font-mono"
                  placeholder="8"
                />
                {errors.deliveryDays && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.deliveryDays.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 pt-3 col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isFlashDeal")}
                    className="w-5 h-5 rounded border-zinc-300 text-[#A6866A] focus:ring-[#A6866A]"
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Oferta Flash
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isActive")}
                    className="w-5 h-5 rounded border-zinc-300 text-[#A6866A] focus:ring-[#A6866A]"
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Activo
                  </span>
                </label>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                  Descripción Detallada
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white resize-none"
                  placeholder="Describe las características, materiales y beneficios del producto..."
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#A6866A] rounded-full"></span>
              Clasificación y Atributos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                  Categoría
                </label>
                <select
                  {...register("category")}
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white appearance-none cursor-pointer"
                >
                  <option value="">Seleccionar Categoría</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                  Subcategoría
                </label>
                <select
                  {...register("subcategory")}
                  disabled={!watchedCategory}
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50"
                >
                  <option value="">Seleccionar Subcategoría</option>
                  {subcategories.map((s) => (
                    <option key={s.sub} value={s.sub}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all">
                <div className="space-y-3">
                  <label className="block text-[11px] font-black uppercase tracking-widest text-[#A6866A] dark:text-[#D4A373]">
                    Estilos de Diseño
                  </label>
                  <div className="max-h-48 overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 bg-white dark:bg-zinc-950/50 shadow-inner custom-scrollbar">
                    <div className="space-y-1">
                      {AVAILABLE_STYLES.map((style) => (
                        <label
                          key={style}
                          className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors group"
                        >
                          <input
                            type="checkbox"
                            value={style}
                            {...register("styles")}
                            className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[#A6866A] focus:ring-[#A6866A] bg-transparent"
                          />
                          <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                            {style}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[11px] font-black uppercase tracking-widest text-[#A6866A] dark:text-[#D4A373]">
                    Cuerpo y Estructura
                  </label>
                  <div className="max-h-48 overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 bg-white dark:bg-zinc-950/50 shadow-inner custom-scrollbar">
                    <div className="space-y-1">
                      {AVAILABLE_MATERIALS.map((mat) => (
                        <label
                          key={mat}
                          className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors group"
                        >
                          <input
                            type="checkbox"
                            value={mat}
                            {...register("materials")}
                            className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[#A6866A] focus:ring-[#A6866A] bg-transparent"
                          />
                          <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                            {mat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[11px] font-black uppercase tracking-widest text-[#A6866A] dark:text-[#D4A373]">
                    Paleta de Colores
                  </label>
                  <div className="max-h-48 overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 bg-white dark:bg-zinc-950/50 shadow-inner custom-scrollbar">
                    <div className="grid grid-cols-2 gap-x-1 gap-y-1">
                      {AVAILABLE_COLORS.map((col) => (
                        <label
                          key={col}
                          className="flex items-center gap-2 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors group"
                        >
                          <input
                            type="checkbox"
                            value={col}
                            {...register("colors")}
                            className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[#A6866A] focus:ring-[#A6866A] bg-transparent"
                          />
                          <span className="text-[13px] leading-tight text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors truncate">
                            {col}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#A6866A] rounded-full"></span>
                Variantes & Dimensiones
              </h2>
              <button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    sku: "",
                    width: 0,
                    height: 0,
                    depth: 0,
                    thickness: null,
                    color: "", 
                    material: "",
                  })
                }
                className="group text-[#A6866A] bg-[#A6866A]/10 hover:bg-[#A6866A] hover:text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border border-[#A6866A]/20"
              >
                <Plus
                  size={16}
                  className="group-hover:rotate-90 transition-transform"
                />
                Nueva Variante
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/40 relative group hover:border-[#A6866A]/40 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute -top-2 -right-2 bg-white dark:bg-zinc-800 text-zinc-400 hover:text-red-500 p-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                        Nombre
                      </label>
                      <input
                        {...register(`variants.${index}.name`)}
                        placeholder="Ej: King Size"
                        className="w-full text-sm border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#A6866A]/20 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                        SKU
                      </label>
                      <input
                        {...register(`variants.${index}.sku`)}
                        placeholder="SKU-001"
                        className="w-full text-sm border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 bg-white dark:bg-zinc-900 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                        Color
                      </label>
                      <div className="relative">
                        <select
                          {...register(`variants.${index}.color`)}
                          className="w-full text-sm border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#A6866A]/20 outline-none appearance-none cursor-pointer"
                        >
                          <option value="">Seleccionar color...</option>
                          {AVAILABLE_COLORS.map((c) => (
                            <option
                              key={c}
                              value={c}
                              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                            >
                              {c}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                          <ChevronDown size={14} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                        Material
                      </label>
                      <div className="relative">
                        <select
                          {...register(`variants.${index}.material`)}
                          className="w-full text-sm border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#A6866A]/20 outline-none appearance-none cursor-pointer"
                        >
                          <option value="">Seleccionar material...</option>
                          {AVAILABLE_MATERIALS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                          <ChevronDown size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    {[
                      { label: "Ancho", field: "width", unit: "cm" },
                      { label: "Alto", field: "height", unit: "cm" },
                      { label: "Fondo", field: "depth", unit: "cm" },
                      { label: "Espesor", field: "thickness", unit: "mm" },
                    ].map((dim) => (
                      <div key={dim.field}>
                        <label className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-black mb-1 block">
                          {dim.label}{" "}
                          <span className="font-normal">({dim.unit})</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register(`variants.${index}.${dim.field}` as any)}
                          className="w-full text-sm font-bold border-zinc-200 dark:border-zinc-800 rounded-xl p-2 bg-zinc-100 dark:bg-zinc-800/50 text-[#A6866A] dark:text-[#D4A373] outline-none focus:bg-white dark:focus:bg-zinc-900 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {errors.variants && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30">
                  <p className="text-red-500 dark:text-red-400 text-xs font-bold flex items-center gap-2">
                    <span>⚠️</span>{" "}
                    {errors.variants.root?.message ||
                      "Revisa los datos de las variantes"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800/60 sticky top-24">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#A6866A] rounded-full"></span>
              Galería de Imágenes
            </h2>

            <div
              className={`border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center transition-all ${uploading ? "bg-zinc-50 dark:bg-zinc-900/50 opacity-50" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/30 hover:border-[#A6866A]"}`}
            >
              <input
                type="file"
                id="imageUpload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 mb-2">
                  {uploading ? (
                    <span className="animate-spin text-xl">⏳</span>
                  ) : (
                    <Upload size={24} />
                  )}
                </div>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-200">
                  {uploading ? "Subiendo..." : "Click para subir imágenes"}
                </span>
                <span className="text-xs text-zinc-400">
                  Soporta JPG, PNG, WEBP
                </span>
              </label>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {watchedImages.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={img.url}
                      alt="product"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                  <select
                    {...register(`images.${index}.color`)}
                    className="w-full text-[10px] p-1 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 outline-none"
                  >
                    <option value="">Asignar Color...</option>
                    {watchedColors.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
