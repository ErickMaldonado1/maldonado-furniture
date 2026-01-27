"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icons } from "@/utils/icons";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Error al suscribirse");
      toast.success("¡Gracias por suscribirte!");
      setEmail("");
    } catch (error: any) {
      toast.error(error.message || "Error al suscribirse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <p className="text-md text-zinc-500 font-medium">
        Sé el primero en ver nuestras últimas actualizaciones.
      </p>
      <form className="relative flex items-center" onSubmit={handleSubscribe}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          disabled={loading}
          className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-md text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#4A3728] transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          aria-label="Enviar suscripción"
          disabled={loading}
          className="absolute right-2 p-1.5 text-[#8B735B] hover:text-[#4A3728] transition-colors disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-[#8B735B] border-t-transparent animate-spin rounded-full" />
          ) : (
            <Icons.ArrowRight className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
}
