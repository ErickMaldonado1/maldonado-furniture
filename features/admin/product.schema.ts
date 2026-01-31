import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  sku: z.string().min(1, "SKU requerido"),
  description: z.string().min(1, "Descripción requerida"),
  price: z.coerce.number().min(0),
  discount: z.coerce.number().min(0).optional().default(0),
  deliveryDays: z.coerce.number().min(1).max(365).optional().default(8),
  category: z.string().min(1, "Categoría requerida"),
  subcategory: z.string().optional(),
  colors: z.array(z.string()).optional(),
  styles: z.array(z.string()).optional(),
  materials: z.array(z.string()).optional(),
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
  variants: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1),
        sku: z.string().min(1),
        color: z.string().optional().nullable(),
        material: z.string().optional().nullable(),
        width: z.coerce.number().min(0),
        height: z.coerce.number().min(0),
        depth: z.coerce.number().min(0),
        thickness: z.coerce.number().optional().nullable(),
      }),
    )
    .min(1, "Debe haber al menos una variante"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
