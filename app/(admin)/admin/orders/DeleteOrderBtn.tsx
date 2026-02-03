"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteOrderAction } from "@/features/orders/order.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeleteOrderBtn({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        "¿Estás seguro de que deseas eliminar esta orden permanentemente? Esta acción no se puede deshacer.",
      )
    )
      return;

    setLoading(true);
    const res = await deleteOrderAction(orderId);

    if (res.success) {
      toast.success("Orden eliminada correctamente");
      router.refresh();
    } else {
      toast.error(res.error || "Error al eliminar la orden");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-all disabled:opacity-50"
      title="Eliminar orden"
    >
      <Trash2 size={18} className={loading ? "animate-pulse" : ""} />
    </button>
  );
}
