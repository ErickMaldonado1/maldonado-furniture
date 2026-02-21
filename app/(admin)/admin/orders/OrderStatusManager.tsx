"use client";
import { useState } from "react";
import { OrderStatus } from "@prisma/client";
import { toast } from "sonner";
import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface StatusBadgeProps {
  orderId: string;
  initialStatus: OrderStatus;
}

const statusColors = {
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  PAID: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  COMPLETED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
};

export function OrderStatusManager({
  orderId,
  initialStatus,
}: StatusBadgeProps) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleUpdate = async (newStatus: OrderStatus) => {
    if (newStatus === status) return;
    setIsLoading(true);
    setIsOpen(false);

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error();

      setStatus(newStatus);
      toast.success("Estado actualizado");
      router.refresh();
    } catch {
      toast.error("Error al actualizar estado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${statusColors[status]}`}
      >
        {isLoading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <>
            {status}
            <ChevronDown className="w-3 h-3" />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          {Object.values(OrderStatus).map((s) => (
            <button
              key={s}
              onClick={() => handleUpdate(s)}
              className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
