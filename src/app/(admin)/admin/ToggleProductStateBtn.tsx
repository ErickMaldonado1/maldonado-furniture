"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toggleProductStatus } from "@/features/admin/products/product.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ToggleProductStateBtn({
  productId,
  isActive,
}: {
  productId: string;
  isActive: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    const res = await toggleProductStatus(productId, !isActive);
    if (res.success) {
      toast.success(
        !isActive ? "Producto activado" : "Producto desactivado",
        {
          description: "El cambio se ha reflejado en la tienda.",
        }
      );
      router.refresh();
    } else {
      toast.error("Error al cambiar estado", {
        description: res.error,
      });
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`transition-all ${
        isActive
          ? "text-emerald-500 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
      } disabled:opacity-40`}
      aria-label={isActive ? "Desactivar producto" : "Activar producto"}
      title={isActive ? "Ocultar producto" : "Mostrar producto"}
    >
      {isActive ? (
        <Eye size={18} className={loading ? "animate-pulse" : ""} />
      ) : (
        <EyeOff size={18} className={loading ? "animate-pulse" : ""} />
      )}
    </button>
  );
}
