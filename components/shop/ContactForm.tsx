"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactFormData } from "@/lib/contact-validation";
import { ArrowLongRight } from "@/utils/icons/index";
import { sendEmail } from "@/features/contact/actions";

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
    <section id="contacto" className="py-16 px-6 max-w-6xl mx-auto">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-sm shadow-sm overflow-hidden flex flex-col lg:flex-row max-h-none lg:h-100">
        <div className="w-full lg:w-2/5 relative h-48 lg:h-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <img
            src="https://res.cloudinary.com/dwvruzkll/image/upload/v1769210579/contact-page_cbg6y3.webp"
            alt="Muebles Maldonado"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-3/5 p-6 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Consulta tu <span className="text-[#4A3728]">Proyecto</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
              {/* Nombre */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold tracking-widest text-zinc-400 uppercase">
                  Nombre
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className={`bg-transparent border-b ${errors.name ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"} py-1 text-sm outline-none focus:border-[#4A3728] transition-all text-zinc-900 dark:text-white`}
                />
                {errors.name && (
                  <span className="text-[10px] text-red-500 font-bold uppercase">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold tracking-widest text-zinc-400 uppercase">
                  Teléfono
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="09XXXXXXXX"
                  className={`bg-transparent border-b ${errors.phone ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"} py-1 text-sm outline-none focus:border-[#4A3728] transition-all text-zinc-900 dark:text-white`}
                />
                {errors.phone && (
                  <span className="text-[10px] text-red-500 font-bold uppercase">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-[12px] font-bold tracking-widest text-zinc-400 uppercase">
                  Correo electrónico
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className={`bg-transparent border-b ${errors.email ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"} py-1 text-sm outline-none focus:border-[#4A3728] transition-all text-zinc-900 dark:text-white`}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-500 font-bold uppercase">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-[12px] font-bold tracking-widest text-zinc-400 uppercase">
                  ¿Cómo ayudamos?
                </label>
                <textarea
                  {...register("message")}
                  rows={1}
                  className={`bg-transparent border-b ${errors.message ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"} py-1 text-sm outline-none focus:border-[#4A3728] transition-all text-zinc-900 dark:text-white resize-none`}
                />
                {errors.message && (
                  <span className="text-[10px] text-red-500 font-bold uppercase">
                    {errors.message.message}
                  </span>
                )}
              </div>
            </div>

            {isSuccess && (
              <p className="text-green-600 text-[12px] font-bold uppercase tracking-widest">
                ¡Consulta enviada con éxito!
              </p>
            )}
            {serverError && (
              <p className="text-red-600 text-[12px] font-bold uppercase tracking-widest">
                {serverError}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-[#4A3728] hover:bg-black text-white px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-[0.2em] transition-all group disabled:bg-zinc-400"
              >
                {isSubmitting ? "Enviando..." : "Enviar Consulta"}
                <ArrowLongRight className="w-5 h-6 group-hover:translate-x-2 transition-transform text-xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
