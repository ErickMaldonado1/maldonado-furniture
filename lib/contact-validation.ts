import { z } from "zod";

const ecuadorPhoneRegex = /^09\d{8}$/;

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "Nombre demasiado largo"),

  email: z.string().email("Por favor, ingresa un correo electrónico válido"),

  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || ecuadorPhoneRegex.test(val), {
      message: "Formato: 09XXXXXXXX",
    }),

  message: z
    .string()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres)")
    .max(1000, "Mensaje demasiado extenso"),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
