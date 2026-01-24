import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { redirect } from "next/navigation";
import Image from "next/image";
import { HiOutlineCube } from "react-icons/hi2";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  // AQUÍ ESTÁ LA CORRECCIÓN DE LA CONSULTA
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: true, // Esto permite acceder a item.variant.product.name
            },
          },
        },
      },
    },
  });

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#FDFCFB] dark:bg-[#050505] transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-2">
            Mis Pedidos
          </h1>
          <p className="text-zinc-500 font-medium">Historial de compras</p>
        </div>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-sm text-center">
              <HiOutlineCube className="text-4xl text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500 font-medium">No hay pedidos aún.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-[#111] border border-zinc-100 dark:border-zinc-800 rounded-sm overflow-hidden shadow-sm"
              >
                {/* Header de la orden */}
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="block text-md font-black uppercase">
                        FECHA
                      </span>
                      <span className="font-bold">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="border-l border-zinc-200 pl-4">
                      <span className="block text-md font-black uppercase">
                        TOTAL
                      </span>
                      <span className="font-bold">
                        ${order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 relative bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                          {/* Comentamos esto temporalmente porque 'images' no existe en tu modelo Product 
    o cámbialo por el nombre correcto si es 'image' o 'imageUrl'
  */}
                          <div className="absolute inset-0 flex items-center justify-center text-md text-zinc-400 font-bold">
                            {item.variant?.product?.name
                              .substring(0, 2)
                              .toUpperCase() || "IMG"}
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="font-bold text-zinc-900 dark:text-white text-sm line-clamp-1">
                            {/* CORRECCIÓN LÍNEA 95: Acceso seguro al nombre del producto */}
                            {item.variant?.product?.name || "Producto"}
                          </h4>
                          <p className="text-xs text-zinc-500">
                            Cant: {item.quantity} x ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
