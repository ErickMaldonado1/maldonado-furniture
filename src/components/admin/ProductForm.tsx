"use client";
import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
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
  Building2,
} from "lucide-react";
import Image from "next/image";
import { slugify } from "@/utils/slug_url";
import { motion, AnimatePresence } from "framer-motion";
import { GeneralTab } from "./ProductForm/GeneralTab";

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
  const [availableColors, setAvailableColors] = useState<any[]>([]);
  const [expandedDimensions, setExpandedDimensions] = useState<
    Record<number, boolean>
  >({});

  const [expandedCompanies, setExpandedCompanies] = useState<
    Record<string, boolean>
  >({});

  const [modal, setModal] = useState<ModalState>({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await getColors();

        if (res.success && res.colors) {
          setAvailableColors(res.colors);
        }
      } catch (error) {
        console.error("Error cargando colores:", error);
      }
    };

    fetchColors();
  }, []);

  const getColorCompanyName = (color: any): string => {
    if (!color) return "Otros";

    if (typeof color.company === "string" && color.company.trim()) {
      return color.company.trim();
    }

    if (
      color.company &&
      typeof color.company === "object" &&
      typeof color.company.name === "string" &&
      color.company.name.trim()
    ) {
      return color.company.name.trim();
    }

    if (typeof color.companyName === "string" && color.companyName.trim()) {
      return color.companyName.trim();
    }

    if (
      color.brand &&
      typeof color.brand === "object" &&
      typeof color.brand.name === "string" &&
      color.brand.name.trim()
    ) {
      return color.brand.name.trim();
    }

    if (typeof color.brand === "string" && color.brand.trim()) {
      return color.brand.trim();
    }

    return "Otros";
  };

  const colorsByCompany = useMemo(() => {
    const groups: Record<string, any[]> = {};

    availableColors.forEach((color) => {
      const companyName = getColorCompanyName(color);

      if (!groups[companyName]) {
        groups[companyName] = [];
      }

      groups[companyName].push(color);
    });

    return groups;
  }, [availableColors]);

  const companyNames = useMemo(() => {
    return Object.keys(colorsByCompany).sort((a, b) => a.localeCompare(b));
  }, [colorsByCompany]);

  useEffect(() => {
    if (companyNames.length === 0) return;

    setExpandedCompanies((prev) => {
      const next = { ...prev };

      companyNames.forEach((company) => {
        if (next[company] === undefined) {
          next[company] = true;
        }
      });

      return next;
    });
  }, [companyNames]);

  const toggleCompany = (companyName: string) => {
    setExpandedCompanies((prev) => ({
      ...prev,
      [companyName]: !prev[companyName],
    }));
  };

  const showModal = (
    type: "success" | "error",
    title: string,
    message: string,
    onConfirm?: () => void,
  ) => {
    setModal({
      open: true,
      type,
      title,
      message,
      onConfirm,
    });
  };

  const closeModal = () => {
    const onConfirm = modal.onConfirm;

    setModal((prev) => ({
      ...prev,
      open: false,
      onConfirm: undefined,
    }));

    if (onConfirm) {
      onConfirm();
    }
  };

  const methods = useForm<ProductFormValues>({
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

      variantConfig: {
        dimensions: [
          {
            width: 0,
            height: 0,
            depth: 0,
            thickness: null,
            sizeLabel: "",
            price: null,
          },
        ],
        colors: [],
      },
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (!initialData) return;

    const variantColors = Array.from(
      new Set(
        (initialData.variants || []).map((v: any) => v.color).filter(Boolean),
      ),
    );
    const productColors =
      initialData.colors && Array.isArray(initialData.colors)
        ? initialData.colors
        : variantColors;

    const formData = {
      ...initialData,

      price: Number(initialData.price),

      discount: Number(initialData.discount || 0),

      deliveryDays: Number(initialData.deliveryDays || 8),

      colors: productColors,

      variantConfig: {
        dimensions: Array.from(
          new Map(
            (initialData.variants || []).map((v: any) => {
              const key = [
                v.dimensions?.width || 0,
                v.dimensions?.height || 0,
                v.dimensions?.depth || 0,
              ].join("|");

              return [
                key,
                {
                  width: v.dimensions?.width || 0,
                  height: v.dimensions?.height || 0,
                  depth: v.dimensions?.depth || 0,

                  thickness:
                    v.thickness === null || v.thickness === undefined
                      ? null
                      : Number(v.thickness),

                  sizeLabel:
                    v.sizeLabel ||
                    `${v.dimensions?.width || 0} × ${
                      v.dimensions?.height || 0
                    } × ${v.dimensions?.depth || 0} cm`,

                  price:
                    v.price === null || v.price === undefined
                      ? null
                      : Number(v.price),
                },
              ];
            }),
          ).values(),
        ),

        colors: productColors,
      },

      subcategory: initialData.subcategory
        ? slugify(initialData.subcategory)
        : "",

      category: initialData.category ? slugify(initialData.category) : "",

      images: (initialData.images || []).map((img: any) => ({
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
          c.slug === initialData.category || c.label === initialData.category,
      )?.slug || "",
    );
  }, [initialData, reset]);

  const watchedCategory = watch("category");

  const watchedImages = watch("images") || [];

  const watchedColors = watch("colors") || [];

  const watchedVariantConfig = watch("variantConfig");

  const watchedDimensions = watchedVariantConfig?.dimensions || [];

  const watchedProductName = watch("name");

  const watchedPrice = watch("price");

  const generatedVariantCount = useMemo(() => {
    const dimensionCount = watchedDimensions.filter(
      (dimension: any) =>
        Number(dimension?.width) > 0 ||
        Number(dimension?.height) > 0 ||
        Number(dimension?.depth) > 0,
    ).length;

    const colorCount = watchedColors.length > 0 ? watchedColors.length : 1;

    return dimensionCount * colorCount;
  }, [watchedDimensions, watchedColors]);

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
            try {
              const res = await uploadProductImage(reader.result as string);

              if (res.success) {
                const current = watch("images") || [];

                setValue("images", [
                  ...current,
                  {
                    url: res.url,
                    publicId: res.publicId,
                    color: null,
                  },
                ]);
              } else {
                showModal(
                  "error",
                  "Error al subir imagen",
                  res.error ||
                    "Ocurrió un error inesperado al subir la imagen.",
                );
              }
            } catch (error) {
              console.error(error);

              showModal(
                "error",
                "Error al subir imagen",
                "No fue posible subir la imagen.",
              );
            }

            resolve();
          };
        });
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const current = watch("images") || [];

    setValue(
      "images",
      current.filter((_, i) => i !== index),
      {
        shouldDirty: true,
      },
    );
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const validDimensions = (data.variantConfig?.dimensions || []).filter(
      (dimension: any) =>
        Number(dimension?.width) > 0 ||
        Number(dimension?.height) > 0 ||
        Number(dimension?.depth) > 0,
    );

    if (validDimensions.length === 0) {
      setActiveTab("variants");

      showModal(
        "error",
        "Falta una medida",
        "Agrega al menos una medida válida (largo, alto o profundidad) antes de guardar el producto.",
      );

      return;
    }

    const normalizedData = {
      ...data,
      colors: data.colors || [],
      variantConfig: {
        ...data.variantConfig,
        dimensions: validDimensions,
        colors: data.colors || [],
      },
    };

    let res;

    if (initialData?.id) {
      res = await updateFullProduct(initialData.id, normalizedData);
    } else {
      res = await createFullProduct(normalizedData);
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
        },
      );
    } else {
      showModal(
        "error",
        "Error al guardar",
        res.error || "Ocurrió un error inesperado. Por favor intenta de nuevo.",
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
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="animate-in fade-in duration-500 pb-24"
        >
          <div className="pt-16 sticky top-0 z-40 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 px-4 sm:px-8 border-b border-zinc-200 dark:border-zinc-800/60 shadow-sm -mx-2 sm:-mx-8 mb-8 transition-colors">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {initialData ? "Editar Producto" : "Nuevo Producto"}
              </h1>

              <p className="text-zinc-500 text-sm mt-1 font-medium">
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
                className="bg-zinc-900 dark:bg-[#A6866A] text-white px-6 py-2.5 rounded-xl font-bold text-sm -wide flex items-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex gap-2 sm:gap-4 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto custom-scrollbar pb-px mb-6">
              {[
                {
                  id: "general",
                  label: "General",
                  icon: Package,
                },
                {
                  id: "attributes",
                  label: "Atributos",
                  icon: Tags,
                },
                {
                  id: "images",
                  label: "Imágenes",
                  icon: ImageIcon,
                },
                {
                  id: "variants",
                  label: "Variantes",
                  icon: Layers,
                  error: errors.variantConfig,
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
            <div
              className={
                activeTab === "general"
                  ? "block animate-in fade-in slide-in-from-bottom-2 duration-300"
                  : "hidden"
              }
            >
              <GeneralTab />
            </div>

            <div
              className={
                activeTab === "attributes"
                  ? "block animate-in fade-in slide-in-from-bottom-2 duration-300"
                  : "hidden"
              }
            >
              <div className="bg-white dark:bg-[#111111] p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
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

                        <ChevronDown
                          size={16}
                          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                        />
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

                        <ChevronDown
                          size={16}
                          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#A6866A] dark:text-[#D4A373] mb-1">
                        Paleta de Colores
                      </label>

                      <p className="text-[11px] text-zinc-500">
                        Selecciona los colores disponibles para este producto.
                        Puedes combinar colores de diferentes empresas.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {watchedColors.length === 0 ? (
                        <div className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-dashed border-zinc-200 dark:border-zinc-800 text-xs text-zinc-400">
                          No has seleccionado colores todavía.
                        </div>
                      ) : (
                        watchedColors.map((colorName: string) => {
                          const colorData = availableColors.find(
                            (c) => c.name === colorName,
                          );

                          return (
                            <div
                              key={colorName}
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#A6866A]/10 border border-[#A6866A]/20"
                            >
                              <div
                                className="w-5 h-5 rounded-full border border-white shadow-sm overflow-hidden"
                                style={{
                                  backgroundColor: colorData?.hexCode || "#ccc",
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

                              <span className="text-[11px] font-bold text-[#A6866A]">
                                {colorName}
                              </span>

                              <button
                                type="button"
                                onClick={() => {
                                  setValue(
                                    "colors",
                                    watchedColors.filter(
                                      (c: string) => c !== colorName,
                                    ),
                                    {
                                      shouldDirty: true,
                                      shouldValidate: true,
                                    },
                                  );
                                }}
                                className="text-[#A6866A]/60 hover:text-red-500 transition-colors"
                              >
                                <X size={13} />
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/50">
                      {companyNames.length === 0 && (
                        <div className="p-5 text-xs text-zinc-500">
                          No hay colores disponibles.
                        </div>
                      )}

                      {companyNames.map((companyName) => {
                        const companyColors =
                          colorsByCompany[companyName] || [];

                        const isExpanded =
                          expandedCompanies[companyName] ?? true;

                        const selectedCount = companyColors.filter((color) =>
                          watchedColors.includes(color.name),
                        ).length;

                        return (
                          <div
                            key={companyName}
                            className="border-b last:border-b-0 border-zinc-200 dark:border-zinc-800"
                          >
                            <button
                              type="button"
                              onClick={() => toggleCompany(companyName)}
                              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white dark:hover:bg-zinc-900 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#A6866A]/10 flex items-center justify-center text-[#A6866A]">
                                  <Building2 size={16} />
                                </div>

                                <div className="text-left">
                                  <p className="text-xs font-black uppercase text-zinc-800 dark:text-zinc-200">
                                    {companyName}
                                  </p>

                                  <p className="text-[10px] text-zinc-400 mt-0.5">
                                    {companyColors.length} colores
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                {selectedCount > 0 && (
                                  <span className="px-2 py-1 rounded-full bg-[#A6866A] text-white text-[9px] font-black">
                                    {selectedCount} seleccionado
                                    {selectedCount !== 1 ? "s" : ""}
                                  </span>
                                )}

                                {isExpanded ? (
                                  <ChevronUp
                                    size={16}
                                    className="text-zinc-400"
                                  />
                                ) : (
                                  <ChevronDown
                                    size={16}
                                    className="text-zinc-400"
                                  />
                                )}
                              </div>
                            </button>
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    height: "auto",
                                    opacity: 1,
                                  }}
                                  exit={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  transition={{
                                    duration: 0.2,
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-4 pt-1">
                                    <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto custom-scrollbar">
                                      {companyColors.map((col) => {
                                        const selected = watchedColors.includes(
                                          col.name,
                                        );

                                        return (
                                          <label
                                            key={col.name}
                                            className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-all border ${
                                              selected
                                                ? "bg-[#A6866A]/10 border-[#A6866A]/30"
                                                : "bg-white dark:bg-zinc-900 border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                                            }`}
                                          >
                                            <input
                                              type="checkbox"
                                              value={col.name}
                                              {...register("colors")}
                                              className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[#A6866A] focus:ring-[#A6866A] bg-transparent"
                                            />

                                            <div
                                              className={`w-7 h-7 shrink-0 rounded-full border overflow-hidden shadow-sm ${
                                                selected
                                                  ? "border-[#A6866A]"
                                                  : "border-zinc-200 dark:border-zinc-700"
                                              }`}
                                              style={{
                                                backgroundColor:
                                                  col.hexCode || "#ccc",
                                              }}
                                            >
                                              {col.imageUrl && (
                                                <img
                                                  src={col.imageUrl}
                                                  alt={col.name}
                                                  className="w-full h-full object-cover"
                                                />
                                              )}
                                            </div>

                                            <span
                                              className={`text-xs font-semibold truncate ${
                                                selected
                                                  ? "text-[#A6866A]"
                                                  : "text-zinc-600 dark:text-zinc-400"
                                              }`}
                                            >
                                              {col.name}
                                            </span>
                                          </label>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold uppercase text-[#A6866A] dark:text-[#D4A373]">
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

                              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                {style}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-bold uppercase text-[#A6866A] dark:text-[#D4A373]">
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

                              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
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

            <div
              className={
                activeTab === "images"
                  ? "block animate-in fade-in slide-in-from-bottom-2 duration-300"
                  : "hidden"
              }
            >
              <div className="bg-white dark:bg-[#111111] p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
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
                    {watchedImages.map((img: any, index: number) => (
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
                              <option value="">Sin color específico</option>

                              {watchedColors.map((colorName: string) => (
                                <option key={colorName} value={colorName}>
                                  {colorName}
                                </option>
                              ))}
                            </select>

                            <ChevronDown
                              size={14}
                              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className={
                activeTab === "variants"
                  ? "block animate-in fade-in slide-in-from-bottom-2 duration-300"
                  : "hidden"
              }
            >
              <div className="bg-white dark:bg-[#111111] p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#A6866A] rounded-full"></span>
                      Constructor de Variantes
                    </h2>

                    <p className="text-xs text-zinc-500 mt-2 max-w-2xl">
                      Las variantes se generan automáticamente utilizando las
                      medidas y los colores seleccionados en Atributos.
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
                  <p className="text-xs font-black text-amber-800 dark:text-amber-400 uppercase -wider mb-2">
                    ⚡ Cómo funciona
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-amber-700 dark:text-amber-300/80">
                    <div>
                      <p className="font-bold mb-1">1. Colores</p>

                      <p className="opacity-80">
                        Los colores se seleccionan una sola vez en la pestaña
                        Atributos.
                      </p>
                    </div>

                    <div>
                      <p className="font-bold mb-1">2. Medidas</p>

                      <p className="opacity-80">
                        Agrega las medidas y asigna su precio.
                      </p>
                    </div>

                    <div>
                      <p className="font-bold mb-1">3. Variantes</p>

                      <p className="opacity-80">
                        El sistema combina automáticamente medidas × colores.
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
                        Estos colores vienen directamente de Atributos.
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
                        onClick={() => setActiveTab("attributes")}
                        className="mt-2 text-xs font-bold text-[#A6866A] hover:underline"
                      >
                        Ir a Atributos
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {watchedColors.map((colorName: string) => {
                        const colorData = availableColors.find(
                          (c) => c.name === colorName,
                        );

                        return (
                          <div
                            key={colorName}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                          >
                            <div
                              className="w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-700 overflow-hidden"
                              style={{
                                backgroundColor: colorData?.hexCode || "#ccc",
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
                      })}
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
                    onClick={() => {
                      const nextIndex = watchedDimensions.length;

                      setValue(
                        `variantConfig.dimensions.${nextIndex}` as any,
                        {
                          width: 0,
                          height: 0,
                          depth: 0,
                          thickness: null,
                          sizeLabel: "",
                          price: null,
                        },
                        {
                          shouldDirty: true,
                        },
                      );

                      setExpandedDimensions((prev) => ({
                        ...prev,
                        [nextIndex]: true,
                      }));
                    }}
                    className="group text-[#A6866A] bg-[#A6866A]/10 hover:bg-[#A6866A] hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase -wider transition-all duration-300 flex items-center gap-2 shadow-sm"
                  >
                    <Plus
                      size={16}
                      className="group-hover:rotate-90 transition-transform"
                    />
                    Añadir Medida
                  </button>
                </div>

                <div className="space-y-4">
                  {watchedDimensions.map((dimension: any, index: number) => {
                    const isExpanded = expandedDimensions[index] ?? true;

                    return (
                      <div
                        key={index}
                        className={`border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-950/40 relative group transition-all duration-300 ${
                          isExpanded ? "p-4 sm:p-6 pt-10" : "p-4"
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
                              setExpandedDimensions((prev) => ({
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
                            onClick={() => {
                              if (watchedDimensions.length <= 1) {
                                showModal(
                                  "error",
                                  "No se puede eliminar",
                                  "El producto debe tener al menos una medida.",
                                );

                                return;
                              }

                              const next = watchedDimensions.filter(
                                (_: any, i: number) => i !== index,
                              );

                              setValue(
                                "variantConfig.dimensions",
                                next as any,
                                {
                                  shouldDirty: true,
                                  shouldValidate: true,
                                },
                              );

                              setExpandedDimensions({});
                            }}
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
                              setExpandedDimensions((prev) => ({
                                ...prev,
                                [index]: true,
                              }))
                            }
                          >
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#A6866A]"></span>

                              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                {dimension.sizeLabel ||
                                  `${dimension.width || 0} × ${
                                    dimension.height || 0
                                  } × ${dimension.depth || 0} cm`}
                              </span>

                              <span className="text-xs font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
                                {dimension.price !== null &&
                                dimension.price !== undefined &&
                                dimension.price !== ""
                                  ? `$${dimension.price}`
                                  : "Precio base"}
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
                                    `variantConfig.dimensions.${index}.sizeLabel` as const,
                                  )}
                                  placeholder="Ej: 180 cm / 180 × 50 × 35 cm"
                                  className="w-full text-sm border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#A6866A]/20 outline-none transition-all"
                                />

                                <p className="text-[10px] text-zinc-400 ml-1">
                                  Si lo dejas vacío, se generará automáticamente
                                  con las medidas.
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
                                      `variantConfig.dimensions.${index}.price` as const,
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
                                  <div key={dim.field} className="space-y-1">
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
                                        `variantConfig.dimensions.${index}.${dim.field}` as any,
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
                                      `variantConfig.dimensions.${index}.thickness` as any,
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
                  })}
                </div>

                <div className="mt-8 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/40">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase">
                        Vista previa de combinaciones
                      </h3>

                      <p className="text-[11px] text-zinc-500 mt-1">
                        Estas son las variantes que el servidor creará
                        automáticamente.
                      </p>
                    </div>

                    <span className="text-xs font-black text-[#A6866A]">
                      {generatedVariantCount} total
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-72 overflow-y-auto custom-scrollbar">
                    {watchedDimensions
                      .filter(
                        (dimension: any) =>
                          Number(dimension?.width) > 0 ||
                          Number(dimension?.height) > 0 ||
                          Number(dimension?.depth) > 0,
                      )
                      .flatMap((dimension: any, dimensionIndex: number) => {
                        const colors =
                          watchedColors.length > 0
                            ? watchedColors
                            : ["Sin color"];

                        return colors.map(
                          (color: string, colorIndex: number) => {
                            const label =
                              watchedProductName?.trim() || "Producto";

                            const variantName =
                              color && color !== "Sin color"
                                ? `${label} - ${color}`
                                : label;

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
                                    {dimension.sizeLabel ||
                                      `${dimension.width || 0} × ${
                                        dimension.height || 0
                                      } × ${dimension.depth || 0} cm`}
                                  </p>
                                </div>

                                <span className="shrink-0 text-xs font-black text-[#A6866A]">
                                  {dimension.price !== null &&
                                  dimension.price !== undefined &&
                                  dimension.price !== ""
                                    ? `$${dimension.price}`
                                    : `$${watch("price") || 0}`}
                                </span>
                              </div>
                            );
                          },
                        );
                      })}

                    {generatedVariantCount === 0 && (
                      <div className="md:col-span-2 text-center py-8 text-xs text-zinc-400">
                        Agrega una medida válida para comenzar a generar
                        variantes.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>

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
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
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
                      <CheckCircle2 size={28} />
                    ) : (
                      <XCircle size={28} />
                    )}
                  </div>

                  <div className="flex-1 pt-0.5">
                    <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 ">
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
                    className={`px-6 py-3 rounded-xl text-sm font-bold -wide transition-all shadow-sm w-full sm:w-auto ${
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
    </div>
  );
}
