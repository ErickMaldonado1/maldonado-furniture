import { Product, ProductVariant, ProductImage } from "@prisma/client";

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  isFeatured?: boolean;
  colors?: string[];
  styles?: string[];
  materials?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  limit?: number;
}

export interface ProductWithRelations extends Product {
  images: ProductImage[];
  variants: (ProductVariant & {
    dimensions: {
      id: string;
      width: number;
      height: number;
      depth: number;
    } | null;
  })[];
}

export interface VariantInput {
  name: string;
  sku: string;
  thickness?: number | null;
  color?: string | null;
  material?: string | null;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface ImageInput {
  url: string;
  publicId: string;
  color?: string | null;
  variantId?: string | null;
}

export interface ProductCreateInput {
  name: string;
  sku: string;
  description: string;
  price: number;
  discount?: number;
  category?: string;
  subcategory?: string;
  isFlashDeal?: boolean;
  isActive?: boolean;
  colors?: string[];
  styles?: string[];
  materials?: string[];
  variants?: VariantInput[];
  images?: ImageInput[];
}

export interface ProductUpdateInput {
  name?: string;
  description?: string;
  price?: number;
  discount?: number;
  category?: string;
  subcategory?: string;
  colors?: string[];
  styles?: string[];
  materials?: string[];
  isActive?: boolean;
  isFlashDeal?: boolean;
}

export interface VariantUpdateInput {
  name?: string;
  sku?: string;
  thickness?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}
