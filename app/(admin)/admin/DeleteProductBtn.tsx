"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteFullProduct } from "@/features/admin/product.actions";

export function DeleteProductBtn({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        "¿Estás seguro? Esto eliminará el producto y sus fotos en Cloudinary.",
      )
    )
      return;

    setLoading(true);
    const res = await deleteFullProduct(productId);

    if (!res.success) {
      alert("Error: " + res.error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-all"
    >
      <Trash2 size={18} className={loading ? "animate-pulse" : ""} />
    </button>
  );
}
