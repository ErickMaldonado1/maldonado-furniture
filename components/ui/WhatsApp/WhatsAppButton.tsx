"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XMark } from "@/utils/icons/actions";
import { Whatsapp } from "@/utils/icons/social";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setTimeout(() => {
        if (!hasClosed) setIsOpen(true);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasClosed]);

  if (!isVisible) return null;
  const phoneNumber = "593959504842";
  const message = "👋 ¡Hola Muebles Maldonado! Me gustaría recibir asesoría personalizada para realizar un pedido. ¿Me pueden ayudar?";

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
      onMouseLeave={() => setIsOpen(false)}
    >
      {isOpen && (
        <div className="relative bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-100 dark:border-zinc-800 max-w-[280px] animate-in fade-in zoom-in duration-300 origin-bottom-right">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              setHasClosed(true);
            }}
            className="absolute top-2 right-2 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <XMark className="w-4 h-4" />
          </button>
          
          <div className="flex items-start gap-3 pt-1"> 
            <div className="flex-1 pr-4">
              <h4 className="text-[14px] font-black  text-zinc-900 dark:text-white mb-0.5">
                Asesoría en línea
              </h4>
              <p className="text-[14px]  text-zinc-500 dark:text-zinc-400">
                ¡Hola! 👋 Escríbenos si tienes dudas sobre nuestros muebles.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-zinc-900 border-r border-b border-zinc-100 dark:border-zinc-800 rotate-45 transform"></div>
        </div>
      )}

      <Link
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 active:scale-95"
        aria-label="Abrir WhatsApp"
        onMouseEnter={() => setIsOpen(true)}
      >
        <Whatsapp className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-20"></span>
      </Link>
    </div>
  );
}
