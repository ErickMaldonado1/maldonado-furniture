"use client";
import { Whatsapp } from "@/utils/icons/index";
import Image from "next/image";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName?: string;
  total: number;
  isLoading?: boolean;
}

export const WhatsAppModal = ({
  isOpen,
  onClose,
  onConfirm,
  customerName,
  total,
  isLoading,
}: WhatsAppModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-zinc-950/80 backdrop-blur-md transition-all">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2.5rem] p-1 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.3rem] p-8 border border-zinc-100 dark:border-zinc-800">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#4A3728]/20 blur-2xl rounded-md" />
              <div className="relative w-20 h-20  text-white flex items-center justify-center mx-auto">
                <Image
                  src="/assets/images/logoA.webp"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                Solicitud de Pedido
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-[280px] mx-auto">
                Tu selección de muebles está lista para ser procesada por un
                asesor experto.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-5 rounded-3xl text-left border border-zinc-100 dark:border-zinc-700/50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  Detalles
                </span>
                <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700 ml-4" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500">Cliente</span>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {customerName || "Invitado"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500">Valor Estimado</span>
                  <span className="text-lg font-black text-[#4A3728] dark:text-[#a38a75]">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`group relative w-full h-14 bg-[#25D366] hover:bg-[#1fb356] text-white rounded-2xl font-bold transition-all shadow-[0_10px_30px_-10px_rgba(37,211,102,0.4)] active:scale-[0.97] ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Whatsapp
                      width={24}
                      height={24}
                      className="group-hover:scale-110 transition-transform"
                    />
                  )}
                  <span className="uppercase text-xs tracking-[0.15em]">
                    {isLoading ? "Procesando..." : "Enviar a WhatsApp"}
                  </span>
                </div>
              </button>

              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
              >
                Revisar Carrito
              </button>
            </div>
            <div className="pt-4 flex items-center justify-center gap-2 opacity-40">
              <div className="h-1 w-1 bg-zinc-400 rounded-full" />
              <p className="text-[12px] font-medium uppercase tracking-widest text-zinc-500">
                Compra Segura & Privada
              </p>
              <div className="h-1 w-1 bg-zinc-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
