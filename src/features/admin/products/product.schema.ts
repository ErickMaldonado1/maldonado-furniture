import { z } from "zod";

const variantDimensionSchema = z.object({
  width: z.coerce.number().min(0),
  height: z.coerce.number().min(0),
  depth: z.coerce.number().min(0),

  thickness: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) {
      return null;
    }

    return Number(val);
  }, z.number().min(0).nullable().optional()),

  sizeLabel: z.string().optional().nullable(),

  price: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) {
      return null;
    }

    return Number(val);
  }, z.number().min(0).nullable().optional()),
});

export const productSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),

  sku: z.string().min(1, "SKU requerido"),

  description: z.string().min(1, "Descripción requerida"),

  price: z.coerce.number().min(0),

  discount: z.coerce.number().min(0).optional().default(0),

  deliveryDays: z.coerce.number().min(1).max(365).optional().default(8),

  category: z.string().min(1, "Categoría requerida"),

  subcategory: z.string().optional(),

  colors: z.array(z.string()).optional().default([]),

  styles: z.array(z.string()).optional().default([]),

  materials: z.array(z.string()).optional().default([]),

  isFlashDeal: z.boolean().optional().default(false),

  isActive: z.boolean().optional().default(true),

  images: z.array(
    z.object({
      url: z.string(),
      publicId: z.string(),

      color: z.string().optional().nullable(),

      variantId: z.string().optional().nullable(),
    }),
  ),

  variantConfig: z.object({
    dimensions: z
      .array(variantDimensionSchema)
      .min(1, "Debe haber al menos una medida"),

    colors: z.array(z.string()).optional().default([]),
  }),
});

export type ProductFormValues = z.infer<typeof productSchema>;
