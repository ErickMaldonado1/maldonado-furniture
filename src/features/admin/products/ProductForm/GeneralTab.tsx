import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/features/admin/products/product.schema";

export function GeneralTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  return (
    <div className="bg-white dark:bg-[#111111] p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-[#A6866A] rounded-full"></span>
        Información Básica
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 lg:col-span-2">
          <label className="block text-xs font-semibold uppercase text-zinc-500 mb-2">
            Nombre del Producto
          </label>
          <input
            {...register("name")}
            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white"
            placeholder="Ej. Cama King Size Moderna"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
            SKU (Código Único)
          </label>
          <input
            {...register("sku")}
            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white font-mono"
            placeholder="Ej. CAM-KS-001"
          />
          {errors.sku && (
            <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
            Precio Base ($)
          </label>
          <input
            {...register("price")}
            type="number"
            step="0.01"
            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white font-mono"
            placeholder="0.00"
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
            Descuento (%)
          </label>
          <input
            {...register("discount")}
            type="number"
            step="0.01"
            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white font-mono"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
            Días de Envío Estimados
          </label>
          <input
            {...register("deliveryDays")}
            type="number"
            min="1"
            max="365"
            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white font-mono"
            placeholder="8"
          />
          {errors.deliveryDays && (
            <p className="text-red-500 text-xs mt-1">
              {errors.deliveryDays.message}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
            Estado del Producto
          </label>
          <div className="flex items-center gap-3 mt-1">
            <input
              {...register("isActive")}
              type="checkbox"
              id="isActive"
              className="w-5 h-5 accent-[#A6866A] bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 rounded cursor-pointer"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer select-none">
              Activo (Visible en tienda)
            </label>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-xs font-semibold uppercase text-zinc-500 mb-2">
            Descripción Detallada
          </label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white resize-none"
            placeholder="Describe las características, materiales y beneficios del producto..."
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
