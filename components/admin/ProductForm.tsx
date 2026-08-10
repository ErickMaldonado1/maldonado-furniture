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
import { getColors } from "@/features/admin/color.actions";
import { useRouter } from "next/navigation";
import { categories } from "@/utils/categories";
import {
  Trash2,
  Plus,
  Upload,
  X,
  Save,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Package,
  Tags,
  Image as ImageIcon,
  Layers,
} from "lucide-react";
import Image from "next/image";
import { slugify } from "@/utils/slug_url";
import { motion, AnimatePresence } from "framer-motion";

interface ProductFormProps {
  initialData?: any;
}

type ModalState = {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onConfirm?: () => void;
};

type Tab = "general" | "attributes" | "images" | "variants";

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [uploading, setUploading] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("");
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [expandedVariants, setExpandedVariants] = useState<
    Record<number, boolean>
  >({});
  const [modal, setModal] = useState<ModalState>({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchColors = async () => {
      const res = await getColors();
      if (res.success && res.colors) {
        setAvailableColors(res.colors.map((c: any) => c.name));
      }
    };
    fetchColors();
  }, []);

  const showModal = (
    type: "success" | "error",
    title: string,
    message: string,
    onConfirm?: () => void
  ) => {
    setModal({ open: true, type, title, message, onConfirm });
  };

  const closeModal = () => {
    const onConfirm = modal.onConfirm;
    setModal((prev) => ({ ...prev, open: false, onConfirm: undefined }));
    if (onConfirm) onConfirm();
  };

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
          color: "",
          material: "",
          price: null,
          sizeLabel: "",
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
          color: v.color || "",
          material: v.material || "",
          width: v.dimensions?.width || 0,
          height: v.dimensions?.height || 0,
          depth: v.dimensions?.depth || 0,
          price: v.price || null,
          sizeLabel: v.sizeLabel || "",
        })),
        subcategory: initialData.subcategory
          ? slugify(initialData.subcategory)
          : "",
        category: initialData.category ? slugify(initialData.category) : "",
        images: initialData.images.map((img: any) => ({
          url: img.url,
          publicId: img.publicId,
          color: img.color || "",
          variantId: img.variantId || null,
        })),
      };
      reset(formData);
      setSelectedCategorySlug(
        categories.find(
          (c) =>
            c.slug === initialData.category || c.label === initialData.category
        )?.slug || ""
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
              showModal(
                "error",
                "Error al subir imagen",
                res.error || "Ocurrió un error inesperado al subir la imagen."
              );
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
      current.filter((_, i) => i !== index)
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
      showModal(
        "success",
        initialData ? "Producto Actualizado" : "Producto Creado",
        initialData
          ? "Los cambios del producto han sido guardados correctamente."
          : "El producto ha sido publicado y ya está disponible en la tienda.",
        () => {
          router.push("/admin/products");
          router.refresh();
        }
      );
    } else {
      showModal(
        "error",
        "Error al guardar",
        res.error || "Ocurrió un error inesperado. Por favor intenta de nuevo."
      );
    }
  };

  const subcategories =
    categories.find((c) => c.slug === selectedCategorySlug)?.subcategories ||
    [];

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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate-in fade-in duration-500 pb-24"
      >
        {/* Sticky Header */}
        <div className="pt-16 sticky top-0 z-40 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 px-4 sm:px-8 border-b border-zinc-200 dark:border-zinc-800 shadow-sm -mx-2 sm:-mx-8 mb-8 transition-colors">
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

        <div className="max-w-5xl mx-auto px-2 sm:px-0">
          <div className="flex gap-2 sm:gap-4 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto custom-scrollbar pb-px mb-8">
            {[
              { id: "general", label: "General", icon: Package },
              { id: "attributes", label: "Atributos", icon: Tags },
              { id: "images", label: "Imágenes", icon: ImageIcon },
              {
                id: "variants",
                label: "Variantes",
                icon: Layers,
                error: errors.variants,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap font-bold text-sm ${
                    isActive
                      ? "border-[#A6866A] text-[#A6866A]"
                      : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <Icon
                    size={16}
                    className={isActive ? "text-[#A6866A]" : ""}
                  />
                  {tab.label}
                  {tab.error && (
                    <span className="text-red-500 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded text-[10px] ml-1">
                      ⚠️ Error
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab 1: General */}
          <div
            className={
              activeTab === "general"
                ? "block animate-in fade-in slide-in-from-bottom-2 duration-300"
                : "hidden"
            }
          >
            <div className="bg-white dark:bg-[#111111] p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#A6866A] rounded-full"></span>
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
                    Precio Base ($)
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
                    Días de Envío Estimados
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

                <div className="flex items-center gap-6 pt-3 col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        {...register("isFlashDeal")}
                        className="w-5 h-5 rounded border-zinc-300 text-[#A6866A] focus:ring-[#A6866A] transition-all"
                      />
                    </div>
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                      Oferta Flash
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        {...register("isActive")}
                        className="w-5 h-5 rounded border-zinc-300 text-[#A6866A] focus:ring-[#A6866A] transition-all"
                      />
                    </div>
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                      Producto Activo
                    </span>
                  </label>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                    Descripción Detallada
                  </label>
                  <textarea
                    {...register("description")}
                    rows={5}
                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white resize-none"
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
          </div>

          {/* Tab 2: Attributes */}
          <div
            className={
              activeTab === "attributes"
                ? "block animate-in fade-in slide-in-from-bottom-2 duration-300"
                : "hidden"
            }
          >
            <div className="bg-white dark:bg-[#111111] p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#A6866A] rounded-full"></span>
                Clasificación y Atributos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                      Categoría
                    </label>
                    <div className="relative">
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
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <ChevronDown size={16} />
                      </div>
                    </div>
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
                    <div className="relative">
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
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase  text-[#A6866A] dark:text-[#D4A373] mb-3">
                      Paleta de Colores (Disponibles para este producto)
                    </label>
                    <div className="max-h-56 overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 bg-zinc-50/50 dark:bg-zinc-950/50 shadow-inner custom-scrollbar">
                      <div className="grid grid-cols-2 gap-2">
                        {availableColors.map((col) => (
                          <label
                            key={col}
                            className="flex items-center gap-3 p-2 hover:bg-white dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors group shadow-sm border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
                          >
                            <input
                              type="checkbox"
                              value={col}
                              {...register("colors")}
                              className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[#A6866A] focus:ring-[#A6866A] bg-transparent transition-all"
                            />
                            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors truncate">
                              {col}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase  text-[#A6866A] dark:text-[#D4A373]">
                      Estilos de Diseño
                    </label>
                    <div className="max-h-48 overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 bg-zinc-50/50 dark:bg-zinc-950/50 shadow-inner custom-scrollbar">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {AVAILABLE_STYLES.map((style) => (
                          <label
                            key={style}
                            className="flex items-center gap-3 p-2 hover:bg-white dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors group"
                          >
                            <input
                              type="checkbox"
                              value={style}
                              {...register("styles")}
                              className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[#A6866A] focus:ring-[#A6866A] bg-transparent"
                            />
                            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                              {style}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase  text-[#A6866A] dark:text-[#D4A373]">
                      Cuerpo y Estructura (Materiales)
                    </label>
                    <div className="max-h-48 overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 bg-zinc-50/50 dark:bg-zinc-950/50 shadow-inner custom-scrollbar">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {AVAILABLE_MATERIALS.map((mat) => (
                          <label
                            key={mat}
                            className="flex items-center gap-3 p-2 hover:bg-white dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors group"
                          >
                            <input
                              type="checkbox"
                              value={mat}
                              {...register("materials")}
                              className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[#A6866A] focus:ring-[#A6866A] bg-transparent"
                            />
                            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                              {mat}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab 3: Images */}
          <div
            className={
              activeTab === "images"
                ? "block animate-in fade-in slide-in-from-bottom-2 duration-300"
                : "hidden"
            }
          >
            <div className="bg-white dark:bg-[#111111] p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#A6866A] rounded-full"></span>
                Galería de Imágenes
              </h2>

              <div
                className={`border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-12 text-center transition-all ${
                  uploading
                    ? "bg-zinc-50 dark:bg-zinc-900/50 opacity-50"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-900/30 hover:border-[#A6866A] cursor-pointer"
                }`}
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
                  className="cursor-pointer flex flex-col items-center gap-3 w-full h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-zinc-500 mb-2">
                    {uploading ? (
                      <span className="animate-spin text-2xl">⏳</span>
                    ) : (
                      <Upload size={28} className="text-[#A6866A]" />
                    )}
                  </div>
                  <span className="text-base font-bold text-zinc-900 dark:text-zinc-200">
                    {uploading
                      ? "Subiendo imágenes..."
                      : "Arrastra o haz clic para subir imágenes"}
                  </span>
                  <span className="text-sm text-zinc-400">
                    Soporta JPG, PNG, WEBP (Recomendado 1000x1000px)
                  </span>
                </label>
              </div>

              {watchedImages.length > 0 && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {watchedImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-50 dark:bg-zinc-900/50 transition-all hover:shadow-md"
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
                        className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-zinc-700 dark:text-zinc-300 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                      <div className="p-2 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="relative">
                          <select
                            {...register(`images.${index}.color`)}
                            className="w-full text-xs font-medium p-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 outline-none appearance-none cursor-pointer hover:border-[#A6866A] transition-colors"
                          >
                            <option value="">Vincular a Color...</option>
                            {watchedColors.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                            <ChevronDown size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tab 4: Variants */}
          <div
            className={
              activeTab === "variants"
                ? "block animate-in fade-in slide-in-from-bottom-2 duration-300"
                : "hidden"
            }
          >
            <div className="bg-white dark:bg-[#111111] p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#A6866A] rounded-full"></span>
                  Constructor de Variantes
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    append({
                      name: "",
                      sku: "",
                      width: 0,
                      height: 0,
                      depth: 0,
                      thickness: null,
                      color: "",
                      material: "",
                      price: null,
                      sizeLabel: "",
                    });
                    setExpandedVariants((prev) => ({
                      ...prev,
                      [fields.length]: true,
                    }));
                  }}
                  className="group text-[#A6866A] bg-[#A6866A]/10 hover:bg-[#A6866A] hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-sm"
                >
                  <Plus
                    size={16}
                    className="group-hover:rotate-90 transition-transform"
                  />
                  Añadir Variante
                </button>
              </div>

              <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                <p className="text-xs font-black text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2">
                  📐 ¿Cómo llenar las variantes de tamaño?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-amber-700 dark:text-amber-300/80">
                  <div>
                    <p className="font-bold mb-1">
                      Etiqueta de Tamaño (sizeLabel)
                    </p>
                    <p className="opacity-80">
                      Es la opción que el cliente verá en la tienda al elegir el
                      tamaño. Ej:{" "}
                      <span className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">
                        180 cm
                      </span>
                      ,{" "}
                      <span className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">
                        160 cm
                      </span>
                      ,{" "}
                      <span className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">
                        Queen
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">
                      Dimensiones físicas del mueble
                    </p>
                    <p className="opacity-80">
                      Las medidas reales del producto en cm. Ejemplo para Mueble
                      TV 180 cm:{" "}
                      <span className="font-mono">
                        Largo: 180 × Alto: 50 × Prof: 35
                      </span>
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-[12px] text-amber-600 dark:text-amber-400/60 font-semibold">
                  💡 Crea una variante por cada opción de tamaño. Cada una
                  tendrá su propio precio y dimensiones.
                </p>
              </div>

              {errors.variants && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 flex items-start gap-3">
                  <span className="text-red-500 mt-0.5">⚠️</span>
                  <div>
                    <h4 className="text-red-800 dark:text-red-400 font-bold text-sm">
                      Error en Variantes
                    </h4>
                    <p className="text-red-600 dark:text-red-500/80 text-xs mt-1">
                      {errors.variants.root?.message ||
                        "Revisa los campos requeridos en las variantes (SKU, Nombre, etc)."}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {fields.map((field, index) => {
                  const isExpanded = expandedVariants[index] ?? true;
                  return (
                    <div
                      key={field.id}
                      className={`border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-950/40 relative group transition-all duration-300 ${
                        isExpanded ? "p-6 sm:p-8 pt-10" : "p-4"
                      } hover:border-[#A6866A]/40 shadow-sm hover:shadow-md`}
                    >
                      {isExpanded && (
                        <div className="absolute -top-3 left-6 bg-[#A6866A] text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 shadow-sm flex items-center gap-2">
                          VARIANTE {index + 1}
                        </div>
                      )}

                      <div
                        className={`flex justify-end absolute gap-2 z-10 ${isExpanded ? "-top-3 right-6" : "top-1/2 -translate-y-1/2 right-4"}`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedVariants((prev) => ({
                              ...prev,
                              [index]: !isExpanded,
                            }))
                          }
                          className="bg-white dark:bg-zinc-800 text-zinc-500 hover:text-[#A6866A] p-2 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm transition-all"
                          title={isExpanded ? "Contraer" : "Expandir"}
                        >
                          {isExpanded ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-white dark:bg-zinc-800 text-zinc-500 hover:text-red-500 p-2 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm transition-all"
                          title="Eliminar Variante"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {!isExpanded ? (
                        <div
                          className="pr-20 cursor-pointer"
                          onClick={() =>
                            setExpandedVariants((prev) => ({
                              ...prev,
                              [index]: true,
                            }))
                          }
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A6866A]"></span>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">
                              {watch(`variants.${index}.name`) ||
                                "Nueva Variante"}
                            </span>
                            <span className="text-xs font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
                              {watch(`variants.${index}.sku`) || "Sin SKU"}
                            </span>
                            {watch(`variants.${index}.price`) && (
                              <span className="text-xs font-bold text-green-600 dark:text-green-400">
                                ${watch(`variants.${index}.price`)}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                                Nombre
                              </label>
                              <input
                                {...register(`variants.${index}.name`)}
                                placeholder="Ej: King Size"
                                className="w-full text-sm border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#A6866A]/20 outline-none transition-all"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                                SKU
                              </label>
                              <input
                                {...register(`variants.${index}.sku`)}
                                placeholder="SKU-001"
                                className="w-full text-sm border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-white dark:bg-zinc-900 font-mono focus:ring-2 focus:ring-[#A6866A]/20 outline-none transition-all"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                                Color
                              </label>
                              <div className="relative">
                                <select
                                  {...register(`variants.${index}.color`)}
                                  className="w-full text-sm border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#A6866A]/20 outline-none appearance-none cursor-pointer transition-all"
                                >
                                  <option value="">Seleccionar color...</option>
                                  {availableColors.map((c) => (
                                    <option key={c} value={c}>
                                      {c}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                  <ChevronDown size={14} />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                                Material
                              </label>
                              <div className="relative">
                                <select
                                  {...register(`variants.${index}.material`)}
                                  className="w-full text-sm border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#A6866A]/20 outline-none appearance-none cursor-pointer transition-all"
                                >
                                  <option value="">
                                    Seleccionar material...
                                  </option>
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

                          <div className="p-5 bg-white dark:bg-[#111111] rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-5">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase  opacity-70">
                                Tamaño y Dimensiones Físicas
                              </h4>

                              {(watch(`variants.${index}.width`) > 0 ||
                                watch(`variants.${index}.height`) > 0) && (
                                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#A6866A]/10 text-[#A6866A] dark:text-[#D4A373]">
                                  {watch(`variants.${index}.width`) || 0} ×{" "}
                                  {watch(`variants.${index}.height`) || 0} ×{" "}
                                  {watch(`variants.${index}.depth`) || 0} cm
                                </span>
                              )}
                            </div>

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
                                {...register(`variants.${index}.sizeLabel`)}
                                placeholder="Ej: 180 cm  /  160 cm  /  Queen  /  Doble"
                                className="w-full text-sm border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#A6866A]/20 outline-none transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
                              />
                              <p className="text-[10px] text-zinc-400 ml-1">
                                Esta es la opción que el cliente seleccionará en
                                el selector de tamaño de la tienda.
                              </p>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-black ml-1 block">
                                Dimensiones físicas del mueble
                              </label>
                              <div className="grid grid-cols-3 gap-3">
                                {[
                                  {
                                    label: "Largo / Ancho",
                                    field: "width",
                                    unit: "cm",
                                    hint: "Ej: 180",
                                  },
                                  {
                                    label: "Alto",
                                    field: "height",
                                    unit: "cm",
                                    hint: "Ej: 50",
                                  },
                                  {
                                    label: "Profundidad",
                                    field: "depth",
                                    unit: "cm",
                                    hint: "Ej: 35",
                                  },
                                ].map((dim) => (
                                  <div key={dim.field} className="space-y-1">
                                    <label className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-black ml-1 block">
                                      {dim.label}{" "}
                                      <span className="font-normal lowercase">
                                        ({dim.unit})
                                      </span>
                                    </label>
                                    <input
                                      type="number"
                                      step="0.01"
                                      {...register(
                                        `variants.${index}.${dim.field}` as any
                                      )}
                                      placeholder={dim.hint}
                                      className="w-full text-sm font-bold border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 bg-zinc-50 dark:bg-zinc-900 text-[#A6866A] dark:text-[#D4A373] outline-none focus:ring-2 focus:ring-[#A6866A]/20 transition-all text-center placeholder:text-zinc-300 dark:placeholder:text-zinc-700 placeholder:font-normal"
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="grid grid-cols-3 gap-3 pt-1">
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-black ml-1 block">
                                    Espesor{" "}
                                    <span className="font-normal lowercase">
                                      (mm)
                                    </span>
                                  </label>
                                  <input
                                    type="number"
                                    step="0.01"
                                    {...register(
                                      `variants.${index}.thickness` as any
                                    )}
                                    placeholder="Opcional"
                                    className="w-full text-sm font-bold border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 bg-zinc-50 dark:bg-zinc-900 text-[#A6866A] dark:text-[#D4A373] outline-none focus:ring-2 focus:ring-[#A6866A]/20 transition-all text-center placeholder:text-zinc-300 dark:placeholder:text-zinc-700 placeholder:font-normal"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                              <div className="space-y-1.5">
                                <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1 block">
                                  Precio Especial ($){" "}
                                  <span className="text-[#A6866A] font-normal lowercase tracking-normal ml-1">
                                    (Sobrescribe precio base del producto)
                                  </span>
                                </label>
                                <div className="relative max-w-xs">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    step="0.01"
                                    {...register(
                                      `variants.${index}.price` as any
                                    )}
                                    placeholder="0.00"
                                    className="w-full pl-8 text-base font-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-zinc-100 dark:bg-zinc-800/50 text-[#A6866A] dark:text-[#D4A373] outline-none focus:ring-2 focus:ring-[#A6866A]/40 focus:bg-white dark:focus:bg-zinc-900 transition-all"
                                  />
                                </div>
                                <p className="text-[10px] text-zinc-400 ml-1">
                                  Si se deja en 0, se usa el precio base del
                                  producto.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {modal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
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
                      <CheckCircle2 size={28} />
                    ) : (
                      <XCircle size={28} />
                    )}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                      {modal.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                      {modal.message}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all shadow-sm w-full sm:w-auto ${
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
    </>
  );
}
