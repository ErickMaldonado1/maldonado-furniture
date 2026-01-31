"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icons } from "@/utils/icons";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;
  const phoneNumber = "593959504842";
  const message = "Hola! Necesito ayuda con un pedido.";

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
      onMouseLeave={() => setIsOpen(false)}
    >
      {isOpen && (
        <div className="relative bg-white dark:bg-zinc-800 p-4 rounded-sm shadow-xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-100 dark:border-white/5 max-w-62.5 animate-in fade-in zoom-in duration-200 origin-bottom-right">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
            className="absolute -top-2 -left-2 bg-zinc-100 dark:bg-zinc-700 rounded-full p-1 text-zinc-500 hover:text-red-500 transition-colors shadow-sm"
            aria-label="whatsapp-button"
          >
            <Icons.XMark className="w-6 h-6" />
          </button>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
            👋 ¿Necesitas ayuda? <br />
            <span className="text-[#4A3728] dark:text-white font-bold">
              ¡Escríbenos al WhatsApp!
            </span>
          </p>

          <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-4 h-4 bg-white dark:bg-zinc-800 border-r border-b border-zinc-100 dark:border-white/5"></div>
        </div>
      )}

      {/* Button */}
      <Link
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 active:scale-95"
        aria-label="Abrir WhatsApp"
        onMouseEnter={() => setIsOpen(true)}
        onClick={(e) => {
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <Icons.Whatsapp className="w-6 h-6" />

        <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-20"></span>
      </Link>
    </div>
  );
}
