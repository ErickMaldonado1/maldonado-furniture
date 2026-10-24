"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "@/utils/icons/navigation";

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
      <p className="text-sm text-zinc-400 font-medium">
        Sé el primero en ver nuestras últimas actualizaciones.
      </p>
      <form className="relative flex items-center" onSubmit={handleSubscribe}>
        <label htmlFor="newsletter-email" className="sr-only">
          Correo electrónico para novedades
        </label>
        <input
          id="newsletter-email"
          name="newsletterEmail"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          aria-label="Correo electrónico para novedades"
          disabled={loading}
          className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#D4B896] transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          aria-label="Enviar suscripción"
          disabled={loading}
          className="absolute right-2 p-1.5 text-[#D4B896] hover:text-white transition-colors disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896] rounded-full"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-[#D4B896] border-t-transparent animate-spin rounded-full" />
          ) : (
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </form>
    </div>
  );
}
