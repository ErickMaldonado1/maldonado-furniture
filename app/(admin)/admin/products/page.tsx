import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import { DeleteProductBtn } from "@/app/(admin)/admin/DeleteProductBtn";
import { ProductSearchBtn } from "@/app/(admin)/admin/ProductSearchBtn";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { sku: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      images: true,
      _count: { select: { variants: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            Inventario de{" "}
            <span className="text-[#4A3728] dark:text-[#A6866A]">
              Productos
            </span>
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Gestiona tu catálogo, stock y variantes.
          </p>
        </div>
        <div className="flex gap-3">
          <ProductSearchBtn />
          <Link
            href="/admin/products/new"
            className="bg-zinc-900 dark:bg-[#A6866A] text-white dark:text-black px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-zinc-900/10 dark:shadow-none"
          >
            <Plus size={18} /> Nuevo Producto
          </Link>
        </div>
      </div>
      <div className="bg-white dark:bg-[#111111] rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800/60 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-100 dark:divide-zinc-800/50">
            <thead className="bg-zinc-50 dark:bg-zinc-900/30">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em]">
                  Preview
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em]">
                  Detalles Producto
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em]">
                  Categoría
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em]">
                  Precio
                </th>
                <th className="px-6 py-4 text-center text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em]">
                  Variantes
                </th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/40">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-20 text-zinc-500 text-sm italic"
                  >
                    No se encontraron productos en el catálogo.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="h-14 w-14 relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm">
                        <Image
                          src={product.images[0]?.url || "/placeholder.png"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-tight">
                        {product.name}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">
                        SKU: {product.sku || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-zinc-800 dark:text-zinc-100">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">
                        {product._count.variants} variantes
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-zinc-400 hover:text-[#4A3728] dark:hover:text-[#A6866A] transition-colors"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteProductBtn productId={product.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
