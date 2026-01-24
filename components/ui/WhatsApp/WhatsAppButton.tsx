"use client";

import { useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

export default function WhatsAppButton() {
  // 1. Iniciamos en false para que no estorbe al cargar
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "584120000000";
  const message = "Hola! Necesito ayuda con un pedido.";

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
      // 2. Controlamos que se cierre al alejar el mouse del contenedor completo
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Tooltip Message */}
      {isOpen && (
        <div className="relative bg-white dark:bg-zinc-800 p-4 rounded-sm shadow-xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-100 dark:border-white/5 max-w-[250px] animate-in fade-in zoom-in duration-200 origin-bottom-right">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
            className="absolute -top-2 -left-2 bg-zinc-100 dark:bg-zinc-700 rounded-full p-1 text-zinc-500 hover:text-red-500 transition-colors shadow-sm"
          >
            <HiXMark size={14} />
          </button>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
            👋 ¿Necesitas ayuda? <br />
            <span className="text-[#4A3728] dark:text-white font-bold">
              ¡Escríbenos al WhatsApp!
            </span>
          </p>
          {/* Flechita del tooltip */}
          <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-4 h-4 bg-white dark:bg-zinc-800 border-r border-b border-zinc-100 dark:border-white/5"></div>
        </div>
      )}

      {/* Button */}
      <Link
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 active:scale-95"
        onMouseEnter={() => setIsOpen(true)}
        onClick={(e) => {
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <FaWhatsapp className="text-3xl" />

        <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-20"></span>
      </Link>
    </div>
  );
}
