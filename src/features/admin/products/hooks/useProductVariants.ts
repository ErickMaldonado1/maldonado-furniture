import { useState, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { calculateGeneratedVariantCount } from "../utils/variant.utils";
import { VariantDimensionForm } from "../types/product.types";

interface UseProductVariantsOptions {
  showModal: (type: "success" | "error", title: string, message: string) => void;
}

export function useProductVariants({ showModal }: UseProductVariantsOptions) {
  const { control, setValue } = useFormContext();

  const watchedColors = useWatch({ control, name: "colors" }) || [];
  const variantConfig = useWatch({ control, name: "variantConfig" });
  const watchedDimensions = (variantConfig?.dimensions || []) as VariantDimensionForm[];
  const watchedProductName = useWatch({ control, name: "name" }) as string;
  const basePrice = useWatch({ control, name: "price" }) as number;

  const [expandedDimensions, setExpandedDimensions] = useState<Record<number, boolean>>({});

  const generatedVariantCount = useMemo(() => {
    return calculateGeneratedVariantCount(watchedDimensions, watchedColors.length);
  }, [watchedDimensions, watchedColors]);

  const addDimension = () => {
    const nextIndex = watchedDimensions.length;
    setValue(
      `variantConfig.dimensions.${nextIndex}`,
      {
        width: 0,
        height: 0,
        depth: 0,
        thickness: null,
        sizeLabel: "",
        price: null,
      },
      { shouldDirty: true }
    );
    setExpandedDimensions((prev) => ({
      ...prev,
      [nextIndex]: true,
    }));
  };

  const removeDimension = (index: number) => {
    if (watchedDimensions.length <= 1) {
      showModal("error", "No se puede eliminar", "El producto debe tener al menos una medida.");
      return;
    }
    const next = watchedDimensions.filter((_, i) => i !== index);
    setValue("variantConfig.dimensions", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setExpandedDimensions({});
  };

  const toggleDimension = (index: number) => {
    setExpandedDimensions((prev) => ({
      ...prev,
      [index]: !(prev[index] ?? true),
    }));
  };

  const getDimensionLabel = (dimension: VariantDimensionForm) => {
    return (
      dimension.sizeLabel ||
      `${dimension.width || 0} × ${dimension.height || 0} × ${dimension.depth || 0} cm`
    );
  };

  const getDimensionPrice = (dimension: VariantDimensionForm) => {
    if (dimension.price !== null && dimension.price !== undefined) {
      return `$${dimension.price}`;
    }
    return "Precio base";
  };

  return {
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
  };
}
