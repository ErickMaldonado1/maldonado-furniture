"use client";
import { HiArrowLongRight } from "react-icons/hi2";

export function ContactForm() {
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
              Iniciemos tu <span className="text-[#4A3728]">Proyecto</span>
            </h2>
          </div>

          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold tracking-widest text-zinc-400 uppercase">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  className="bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-1 text-sm outline-none focus:border-[#4A3728] transition-all text-zinc-900 dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold tracking-widest text-zinc-400 uppercase">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  className="bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-1 text-sm outline-none focus:border-[#4A3728] transition-all text-zinc-900 dark:text-white"
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-[12px] font-bold tracking-widest text-zinc-400 uppercase">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  className="bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-1 text-sm outline-none focus:border-[#4A3728] transition-all text-zinc-900 dark:text-white"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-[12px] font-bold tracking-widest text-zinc-400 uppercase">
                  ¿Cómo ayudamos?
                </label>
                <textarea
                  rows={1}
                  required
                  className="bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-1 text-sm outline-none focus:border-[#4A3728] transition-all text-zinc-900 dark:text-white resize-none"
                />
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-[#4A3728] hover:bg-black text-white px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-[0.2em] transition-all group"
              >
                Enviar Consulta
                <HiArrowLongRight className="group-hover:translate-x-2 transition-transform text-xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
