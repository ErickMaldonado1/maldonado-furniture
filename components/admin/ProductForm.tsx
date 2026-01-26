"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  HiOutlineCheck,
  HiOutlineTrash,
  HiOutlineCloudArrowUp,
} from "react-icons/hi2";
import Image from "next/image";

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    discount: initialData?.discount || 0,
    category: initialData?.category || "",
    subcategory: initialData?.subcategory || "",
    isFlashDeal: initialData?.isFlashDeal || false,
    isActive: initialData?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = initialData
        ? `/api/products/${initialData.id}`
        : "/api/products";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Error al guardar el producto");

      toast.success(initialData ? "Producto actualizado" : "Producto creado");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            {initialData ? `Editar: ${initialData.name}` : "Nuevo Producto"}
          </h1>
          <p className="text-zinc-500 font-medium">
            Completa todos los campos para continuar
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#4A3728] text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <HiOutlineCheck className="text-lg" />
          {loading ? "Guardando..." : "Guardar Producto"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#0D0D0D] p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
          <h2 className="text-lg font-black uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-4">
            Información General
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
              Nombre del Producto
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4A3728]/20 outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                SKU
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4A3728]/20 outline-none font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                Categoría
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4A3728]/20 outline-none font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
              Subcategoría
            </label>
            <input
              type="text"
              required
              value={formData.subcategory}
              onChange={(e) =>
                setFormData({ ...formData, subcategory: e.target.value })
              }
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4A3728]/20 outline-none font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
              Descripción
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4A3728]/20 outline-none font-medium"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-[#0D0D0D] p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
            <h2 className="text-lg font-black uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-4">
              Precio & Ofertas
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Precio Base ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4A3728]/20 outline-none font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Descuento (%)
                </label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discount: parseFloat(e.target.value),
                    })
                  }
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4A3728]/20 outline-none font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.isFlashDeal}
                  onChange={(e) =>
                    setFormData({ ...formData, isFlashDeal: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-zinc-300 text-[#4A3728] focus:ring-[#4A3728]"
                />
                <span className="text-sm font-bold uppercase tracking-wider text-zinc-600 group-hover:text-zinc-900 transition-colors">
                  Es una oferta flash
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-zinc-300 text-[#4A3728] focus:ring-[#4A3728]"
                />
                <span className="text-sm font-bold uppercase tracking-wider text-zinc-600 group-hover:text-zinc-900 transition-colors">
                  Producto activo (visible en tienda)
                </span>
              </label>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white dark:bg-[#0D0D0D] p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
            <h2 className="text-lg font-black uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-4">
              Imágenes
            </h2>

            <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center space-y-4 hover:border-[#4A3728] transition-colors cursor-pointer group">
              <HiOutlineCloudArrowUp className="text-4xl mx-auto text-zinc-300 group-hover:text-[#4A3728] transition-colors" />
              <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Click para subir imágenes
              </p>
            </div>

            {initialData?.images?.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {initialData.images.map((img: any, i: number) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
                  >
                    <Image
                      src={img.url}
                      alt="product"
                      fill
                      className="object-cover"
                    />
                    <button className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <HiOutlineTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
