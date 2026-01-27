"use client";
import { motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineClock,
  HiArrowUpRight,
} from "react-icons/hi2";
import { Icons } from "@/utils/icons";
import { ContactForm } from "@/components/shop/ContactForm";

export default function ContactoPage() {
  const whatsappNumber = "593959504842";
  const message = encodeURIComponent(
    "Hola, vengo de su sitio web. Necesito información personalizada sobre sus productos.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <main className="mt-20 min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300">
      <section className="pt-16 pb-8 max-w-340 mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 border-b border-zinc-100 dark:border-zinc-900 pb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter dark:text-white leading-[0.8]">
              Atención al{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
                Cliente
              </span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-sm w-full md:w-auto"
          >
            <div className="relative border-l-2 border-[#4A3728] pl-6 py-0">
              <p className="text-sm md:text-base lg:text-lg font-medium text-zinc-500 dark:text-zinc-400 leading-[1.2]  text-left">
                "Estamos aquí para materializar tus ideas. Conecta con nuestro
                equipo especializado en diseño y fabricación de alta gama."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#050505]">
        <div className="max-w-340 mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800">
            <a
              href="https://api.whatsapp.com/send/?phone=593959504842&text=Hola%21+Necesito+ayuda+con+un+pedido.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-10 bg-white dark:bg-[#050505] min-h-75 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
            >
              <div>
                <Icons.Whatsapp className="w-8 h-8 text-[#4A3728] mb-4" />
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-4">
                  Escríbenos
                </h3>
                <p className="text-[14px] font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Asesoría técnica y ventas en tiempo real con expertos de
                  fábrica.
                </p>
              </div>
              <span className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-[#4A3728] mt-4">
                Enviar Mensaje <HiArrowUpRight />
              </span>
            </a>

            <div className="flex flex-col justify-between p-10 bg-white dark:bg-[#050505] min-h-75">
              <div>
                <Icons.Mail className="w-8 h-8 text-[#4A3728] mb-4" />
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-4">
                  Email
                </h3>
                <p className="text-[14px] font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Proyectos, planos y solicitudes de proformas detalladas.
                </p>
              </div>
              <span className="text-[14px] font-bold text-zinc-400 break-all mt-8">
                mueblesmaldonadoec@gmail.com
              </span>
            </div>

            <div className="flex flex-col justify-between p-10 bg-white dark:bg-[#050505] min-h-75">
              <div>
                <Icons.Phone className="w-8 h-8 text-[#4A3728] mb-4" />
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-4">
                  Llamadas
                </h3>
                <p className="text-[14px] font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Atención telefónica personalizada de lunes a viernes.
                </p>
              </div>
              <span className="text-[14px] font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-widest mt-4">
                095 950 4842
              </span>
            </div>

            <div className="flex flex-col justify-between p-10 bg-white dark:bg-[#050505] min-h-75">
              <div>
                <Icons.Users className="text-3xl text-[#4A3728] mb-4 w-8 h-8" />

                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-4">
                  Comunidad
                </h3>
                <p className="text-[14px] font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Síguenos para conocer nuestro proceso artesanal.
                </p>
              </div>
              <span className="text-[14px] font-black text-zinc-400 uppercase tracking-widest mt-8">
                @muebles_maldonado
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-340 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="flex flex-col h-full order-2 lg:order-1">
            <div className="mb-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white mb-2">
                Solicita una Proforma
              </h2>
              <p className="text-sm text-zinc-400 uppercase tracking-widest">
                Completa tus datos y te contactaremos.
              </p>
            </div>
            <div className="grow border border-zinc-100 dark:border-zinc-900 rounded-sm bg-white dark:bg-[#050505]">
              <ContactForm />
            </div>
          </div>
          <div className="flex flex-col h-full order-1 lg:order-2">
            <div className="mb-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white mb-2">
                Nuestra Fábrica
              </h2>
              <p className="text-sm text-zinc-400 uppercase tracking-widest">
                Visítanos bajo previa cita.
              </p>
            </div>

            <div className="flex flex-col grow space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-100 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 rounded-sm overflow-hidden">
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 flex gap-4">
                  <HiOutlineMapPin className="text-2xl text-[#4A3728] shrink-0" />
                  <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
                    El Condado Alto, Quito <br />
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 flex gap-4">
                  <HiOutlineClock className="text-2xl text-[#4A3728] shrink-0" />
                  <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
                    Horario{" "}
                    <span className="text-[12px] font-normal text-zinc-400 uppercase">
                      Lun - Vie: 08:30 - 18:00
                    </span>
                  </p>
                </div>
              </div>
              <div className="relative grow min-h-100 overflow-hidden rounded-sm shadow-xl border border-zinc-100 dark:border-zinc-900">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8131877759606!2d-78.52207852622!3d-0.09190273548446162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5854e128da845%3A0xe91f40a9dd58a38a!2sMuebles%20Maldonado%20Ec!5e0!3m2!1ses-419!2sec!4v1765848391688!5m2!1ses-419!2sec"
                  className="absolute inset-0 w-full h-full grayscale contrast-125 dark:invert hover:grayscale-0 transition-all duration-1000"
                  allowFullScreen
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4">
                  <a
                    href="https://goo.gl/maps/..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#4A3728] hover:bg-[#5D4037] text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-colors shadow-2xl"
                  >
                    Abrir en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
