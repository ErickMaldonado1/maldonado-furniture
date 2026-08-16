import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { productSchema, ProductFormValues } from "../product.schema";
import { createFullProduct, updateFullProduct } from "../product.actions";
import { getColors } from "../../colors/color.actions";
import { slugify } from "@/utils/slug_url";
import { ProductColor, TabType } from "../types/product.types";

interface UseProductFormOptions {
  initialData?: any;
  showModal: (type: "success" | "error", title: string, message: string, onConfirm?: () => void) => void;
}

export function useProductForm({ initialData, showModal }: UseProductFormOptions) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [availableColors, setAvailableColors] = useState<ProductColor[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await getColors();
        if (res.success && res.colors) {
          setAvailableColors(res.colors as ProductColor[]);
        }
      } catch (error) {
        console.error("Error cargando colores:", error);
      }
    };
    fetchColors();
  }, []);

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
          { width: 0, height: 0, depth: 0, thickness: null, sizeLabel: "", price: null },
        ],
        colors: [],
      },
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (!initialData) return;

    const variantColors = Array.from(
      new Set((initialData.variants || []).map((v: any) => v.color).filter(Boolean))
    );
    const productColors =
      initialData.colors && Array.isArray(initialData.colors)
        ? initialData.colors
        : variantColors;

    const dimensions = Array.from(
      new Map(
        (initialData.variants || []).map((v: any) => {
          const key = [v.dimensions?.width || 0, v.dimensions?.height || 0, v.dimensions?.depth || 0].join("|");
          return [
            key,
            {
              width: v.dimensions?.width || 0,
              height: v.dimensions?.height || 0,
              depth: v.dimensions?.depth || 0,
              thickness: v.thickness === null || v.thickness === undefined ? null : Number(v.thickness),
              sizeLabel: v.sizeLabel || `${v.dimensions?.width || 0} × ${v.dimensions?.height || 0} × ${v.dimensions?.depth || 0} cm`,
              price: v.price === null || v.price === undefined ? null : Number(v.price),
            },
          ];
        })
      ).values()
    );

    const formData = {
      ...initialData,
      price: Number(initialData.price || 0),
      discount: Number(initialData.discount || 0),
      deliveryDays: Number(initialData.deliveryDays || 8),
      colors: productColors,
      variantConfig: {
        dimensions:
          dimensions.length > 0
            ? dimensions
            : [{ width: 0, height: 0, depth: 0, thickness: null, sizeLabel: "", price: null }],
        colors: productColors,
      },
      category: initialData.category ? slugify(initialData.category) : "",
      subcategory: initialData.subcategory ? slugify(initialData.subcategory) : "",
      images: (initialData.images || []).map((img: any) => ({
        url: img.url,
        publicId: img.publicId,
        color: img.color || "",
        variantId: img.variantId || null,
      })),
    };

    reset(formData);
  }, [initialData, reset]);

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const validDimensions = (data.variantConfig?.dimensions || []).filter(
      (dimension: any) =>
        Number(dimension?.width) > 0 || Number(dimension?.height) > 0 || Number(dimension?.depth) > 0
    );

    if (validDimensions.length === 0) {
      setActiveTab("variants");
      showModal(
        "error",
        "Falta una medida",
        "Agrega al menos una medida válida (largo, alto o profundidad) antes de guardar el producto."
      );
      return;
    }

    const normalizedData = {
      ...data,
      isActive: data.isActive !== undefined ? data.isActive : true,
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
        }
      );
    } else {
      showModal("error", "Error al guardar", res.error || "Ocurrió un error inesperado.");
    }
  };

  return {
    methods,
    onSubmit,
    activeTab,
    setActiveTab,
    availableColors,
  };
}
