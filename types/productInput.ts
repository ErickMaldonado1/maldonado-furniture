import {
  Product,
  ProductVariant,
  ProductImage,
  VariantDimensions,
} from "@prisma/client";

export type ProductInput = {
  name: string;
  sku: string;
  description: string;
  variants?: (Omit<
    ProductVariant,
    "id" | "productId" | "createdAt" | "updatedAt"
  > & { dimensions?: Omit<VariantDimensions, "id" | "variantId"> })[];
  images?: Omit<ProductImage, "id" | "productId" | "createdAt">[];
  category?: string;
  subcategory?: string;
  price?: number;
  discount?: number;
  isFlashDeal?: boolean;
};

export type ProductUpdateInput = Partial<ProductInput> & {
  isActive?: boolean;
};
