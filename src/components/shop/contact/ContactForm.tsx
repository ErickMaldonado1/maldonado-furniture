"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactFormData } from "@/lib/contact-validation";
import { ArrowLongRight } from "@/utils/icons/navigation";
import { sendEmail } from "@/features/contact/actions";
import Image from "next/image";

export function ContactForm() {
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
    console.log("Datos capturados:", data);
    setServerError(null);
    const result = await sendEmail(data);

    if (result.success) {
      setIsSuccess(true);
      reset();

      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setServerError(result.error || "Ocurrió un error inesperado.");
    }
  };

  return (
    <section id="contacto" className="py-24 px-6 md:px-8 max-w-6xl mx-auto">
      <div className="bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-sm overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/5 relative min-h-75 lg:min-h-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src="https://res.cloudinary.com/dwvruzkll/image/upload/v1769210579/contact-page_cbg6y3.webp"
            alt="Muebles Maldonado"
            fill
            className="object-cover grayscale-[0.1]"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>

        <div className="w-full lg:w-3/5 p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-[13px] font-bold uppercase  text-[#4A3728] block mb-2">
              Hablemos
            </span>
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-medium  text-zinc-900 dark:text-white leading-none">
              Consulta tu <span className="text-[#4A3728]">Proyecto</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase"
                >
                  Nombre
                </label>
                <input
                  {...register("name")}
                  id="contact-name"
                  type="text"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`bg-transparent border-b ${errors.name ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"} py-2 text-sm outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728] transition-all text-zinc-900 dark:text-white font-medium`}
                />
                {errors.name && (
                  <span id="name-error" className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase" role="alert">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-phone"
                  className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase"
                >
                  Teléfono
                </label>
                <input
                  {...register("phone")}
                  id="contact-phone"
                  type="tel"
                  placeholder="09XXXXXXXX"
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`bg-transparent border-b ${errors.phone ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"} py-2 text-sm outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728] transition-all text-zinc-900 dark:text-white font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-500`}
                />
                {errors.phone && (
                  <span id="phone-error" className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase" role="alert">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase"
                >
                  Correo electrónico
                </label>
                <input
                  {...register("email")}
                  id="contact-email"
                  type="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`bg-transparent border-b ${errors.email ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"} py-2 text-sm outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728] transition-all text-zinc-900 dark:text-white font-medium`}
                />
                {errors.email && (
                  <span id="email-error" className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase" role="alert">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase"
                >
                  ¿Cómo ayudamos?
                </label>
                <textarea
                  {...register("message")}
                  id="contact-message"
                  rows={2}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`bg-transparent border-b ${errors.message ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"} py-2 text-sm outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728] transition-all text-zinc-900 dark:text-white font-medium resize-none`}
                />
                {errors.message && (
                  <span id="message-error" className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase" role="alert">
                    {errors.message.message}
                  </span>
                )}
              </div>
            </div>

            {isSuccess && (
              <p className="text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase ">
                ¡Consulta enviada con éxito!
              </p>
            )}
            {serverError && (
              <p className="text-red-600 text-[11px] font-bold uppercase ">
                {serverError}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-[#4A3728] hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900 text-white px-8 py-3.5 rounded-sm text-[11px] font-black uppercase -[0.2em] transition-all duration-300 group disabled:bg-zinc-400 cursor-pointer"
              >
                {isSubmitting ? "Enviando..." : "Enviar Consulta"}
                <ArrowLongRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
