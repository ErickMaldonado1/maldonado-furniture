"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactFormData } from "@/lib/contact-validation";
import { sendEmail } from "@/features/contact/actions";
import Image from "next/image";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

interface ContactFormProps {
  variant?: "standalone" | "compact";
  hideHeader?: boolean;
  className?: string;
}

export function ContactForm({
  variant = "standalone",
  hideHeader = false,
  className = "",
}: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const result = await sendEmail(data);

      if (result.success) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 8000);
      } else {
        setServerError(
          result.error ||
            "No pudimos enviar tu mensaje en este momento. Por favor contáctanos por WhatsApp al 095 950 4842.",
        );
      }
    } catch {
      setServerError(
        "Ocurrió un error inesperado al conectar con el servidor. Puedes escribirnos directamente al 095 950 4842.",
      );
    }
  };

  const formElement = (
    <div className={`w-full ${className}`}>
      {!hideHeader && (
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#634E3A] dark:text-[#D4B896] block mb-1">
            Atención Personalizada
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-zinc-900 dark:text-white leading-tight">
            Consulta tu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A3728] to-[#634E3A] dark:from-[#C4A482] dark:to-[#E0CCA7]">
              Proyecto a Medida
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Completa el formulario y te enviaremos una respuesta y proforma
            técnica a la brevedad.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="contact-name"
              className="block text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300"
            >
              Nombre Completo *
            </label>
            <input
              {...register("name")}
              id="contact-name"
              type="text"
              placeholder="Ej. Andrés Morales"
              aria-invalid={errors.name ? "true" : "false"}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                errors.name
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                  : "border-zinc-300 dark:border-zinc-700 focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
              } bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none transition-all`}
            />
            {errors.name && (
              <p
                className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1"
                role="alert"
              >
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="contact-phone"
              className="block text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300"
            >
              Teléfono / WhatsApp *
            </label>
            <input
              {...register("phone")}
              id="contact-phone"
              type="tel"
              placeholder="Ej. 0991234567"
              aria-invalid={errors.phone ? "true" : "false"}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                errors.phone
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                  : "border-zinc-300 dark:border-zinc-700 focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
              } bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none transition-all`}
            />
            {errors.phone && (
              <p
                className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1"
                role="alert"
              >
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="contact-email"
            className="block text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300"
          >
            Correo Electrónico *
          </label>
          <input
            {...register("email")}
            id="contact-email"
            type="email"
            placeholder="tu.correo@ejemplo.com"
            aria-invalid={errors.email ? "true" : "false"}
            className={`w-full px-3.5 py-2.5 rounded-xl border ${
              errors.email
                ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                : "border-zinc-300 dark:border-zinc-700 focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
            } bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none transition-all`}
          />
          {errors.email && (
            <p
              className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1"
              role="alert"
            >
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="contact-message"
            className="block text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300"
          >
            ¿Qué mueble o espacio deseas amoblar? *
          </label>
          <textarea
            {...register("message")}
            id="contact-message"
            rows={3}
            placeholder="Cuéntanos detalles de tu espacio, medidas referenciales, tipo de acabado o si requieres clóset, cocina, mueble de TV u oficina..."
            aria-invalid={errors.message ? "true" : "false"}
            className={`w-full px-3.5 py-2.5 rounded-xl border ${
              errors.message
                ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                : "border-zinc-300 dark:border-zinc-700 focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
            } bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none transition-all resize-none`}
          />
          {errors.message && (
            <p
              className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1"
              role="alert"
            >
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.message.message}
            </p>
          )}
        </div>

        {isSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-800 dark:text-emerald-300 space-y-0.5">
              <strong className="block font-bold">
                ¡Mensaje enviado con éxito!
              </strong>
              <span>
                Hemos recibido tus datos y te contactaremos en menos de 24 horas
                laborables.
              </span>
            </div>
          </div>
        )}

        {serverError && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs text-red-800 dark:text-red-300 space-y-0.5">
              <strong className="block font-bold">
                No se pudo enviar el mensaje
              </strong>
              <span>{serverError}</span>
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#4A3728] hover:bg-[#3D2C1F] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md active:scale-98 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enviando Consulta...</span>
              </>
            ) : (
              <>
                <span>Enviar Consulta</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Tus datos son 100% confidenciales.</span>
          </div>
        </div>
      </form>
    </div>
  );

  if (variant === "compact") {
    return formElement;
  }

  return (
    <section
      id="contacto"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto"
    >
      <div className="bg-white dark:bg-[#0D0D0D] border border-zinc-200/90 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row transition-colors">
        <div className="w-full lg:w-5/12 relative min-h-80 lg:min-h-full flex flex-col justify-between p-8 sm:p-10 bg-gradient-to-br from-zinc-900 to-black text-white overflow-hidden">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
            <Image
              src="https://res.cloudinary.com/dwvruzkll/image/upload/v1769210579/contact-page_cbg6y3.webp"
              alt="Taller Maldonado Muebles"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold tracking-wider text-[#D4B896] uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Taller Maldonado
            </div>

            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white leading-snug">
              Hagamos realidad tu proyecto de mobiliario
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              Diseñamos, fabricamos e instalamos en Quito sin intermediarios.
              Recibe orientación técnica directa de nuestros carpinteros y
              ebanistas.
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-8 border-t border-white/15 space-y-3.5 text-xs">
            <div className="flex items-center gap-3 text-zinc-200">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#D4B896]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                  WhatsApp & Llamadas
                </span>
                <a
                  href="https://wa.me/593959504842"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline"
                >
                  095 950 4842
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-200">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#D4B896]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                  Correo Oficial
                </span>
                <span className="font-semibold">
                  mueblesmaldonadoec@gmail.com
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-200">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#D4B896]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                  Fábrica (Cita Previa)
                </span>
                <span className="font-semibold">
                  Norte de Quito, Sector Condado Alto
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 p-8 sm:p-12 flex flex-col justify-center bg-white dark:bg-[#0D0D0D]">
          {formElement}
        </div>
      </div>
    </section>
  );
}
