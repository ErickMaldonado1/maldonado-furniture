"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { XMark } from "@/utils/icons/actions";
import { Whatsapp } from "@/utils/icons/social";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        if (!hasClosed) setIsOpen(true);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasClosed, isHomePage]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;
  const phoneNumber = "593959504842";
  const message =
    "Hola Muebles Maldonado, me gustaría recibir asesoría para cotizar un mueble fabricado a medida";

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      onMouseLeave={() => setIsOpen(false)}
    >
      {isOpen && (
        <div className="relative w-[300px] rounded-2xl overflow-hidden shadow-2xl shadow-black/15 dark:shadow-black/50 border border-zinc-200/80 dark:border-zinc-700/60 animate-in fade-in zoom-in duration-300 origin-bottom-right">
          <div className="bg-[#1a1a1a] px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">

              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-white border border-white/20">
                  <Image
                    src="/assets/images/logoA.webp"
                    alt="Muebles Maldonado"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#1a1a1a]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white leading-tight">Muebles Maldonado</p>
                <p className="text-[11px] text-[#25D366] font-medium">En línea</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                setHasClosed(true);
              }}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Cerrar notificación de WhatsApp"
            >
              <XMark className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>


          <div className="bg-[#ECE5DD] dark:bg-[#0d1117] px-4 py-4">
            <div className="bg-white dark:bg-[#1e2733] rounded-xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[90%]">
              <p className="text-[13px] text-zinc-800 dark:text-zinc-100 leading-relaxed">
                Bienvenido a{" "}
                <span className="font-semibold">Muebles Maldonado</span>. Diseñamos y fabricamos muebles a medida.
              </p>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2">
                ¿En qué espacio podemos ayudarte? Cotiza sin compromiso.
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-right mt-2">ahora ✓✓</p>
            </div>
          </div>


          <Link
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Iniciar conversación por WhatsApp"
            className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13px] font-semibold py-3.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <Whatsapp className="w-4 h-4" aria-hidden="true" />
            Iniciar conversación
          </Link>
          <div className="absolute -bottom-2 right-[26px] w-4 h-4 bg-[#25D366] rotate-45" />
        </div>
      )}

      <Link
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg shadow-[#25D366]/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
        aria-label="Contactar a Muebles Maldonado por WhatsApp"
        onMouseEnter={() => setIsOpen(true)}
      >
        <Whatsapp className="w-6 h-6" aria-hidden="true" />
        <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-20" aria-hidden="true" />
      </Link>
    </div>
  );
}
