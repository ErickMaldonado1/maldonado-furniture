import { VariantDimensionForm } from "../types/product.types";

export const calculateGeneratedVariantCount = (
  dimensions: VariantDimensionForm[],
  colorsCount: number
): number => {
  const dimensionCount = dimensions.filter(
    (dimension) =>
      Number(dimension?.width) > 0 ||
      Number(dimension?.height) > 0 ||
      Number(dimension?.depth) > 0
  ).length;

  const validColorsCount = colorsCount > 0 ? colorsCount : 1;
  const validDimensionCount = dimensionCount > 0 ? dimensionCount : 1;
  return dimensionCount * validColorsCount;
};
