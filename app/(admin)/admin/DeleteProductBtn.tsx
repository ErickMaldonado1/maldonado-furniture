"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteFullProduct } from "@/features/admin/product.actions";

export function DeleteProductBtn({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        "¿Estás seguro? Esto eliminará el producto y sus fotos en Cloudinary."
      )
    )
      return;

    setLoading(true);
    const res = await deleteFullProduct(productId);

    if (res.success) {
      router.refresh(); // ← refresca el Server Component para actualizar la tabla
    } else {
      alert("Error al eliminar: " + res.error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-40 transition-all"
      aria-label="Eliminar producto"
      title="Eliminar producto"
    >
      <Trash2 size={18} className={loading ? "animate-pulse" : ""} />
    </button>
  );
}
