import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  sku: z.string().min(1, "SKU requerido"),
  description: z.string().min(1, "Descripción requerida"),
  price: z.coerce.number().min(0),
  category: z.string().min(1, "Categoría requerida"),
  images: z.array(
    z.object({
      url: z.string(),
      publicId: z.string(),
    }),
  ),
  variants: z
    .array(
      z.object({
        name: z.string().min(1),
        sku: z.string().min(1),
        width: z.coerce.number().min(0),
        height: z.coerce.number().min(0),
        depth: z.coerce.number().min(0),
        thickness: z.coerce.number().optional().nullable(),
      }),
    )
    .min(1),
});

export type ProductFormValues = z.infer<typeof productSchema>;
