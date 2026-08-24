"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { ChevronDown, Upload, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useProductImages, ProductImageForm } from "../hooks/useProductImages";

interface ImagesTabProps {
  showModal: (type: "success" | "error", title: string, message: string) => void;
}

export function ImagesTab({ showModal }: ImagesTabProps) {
  const { register } = useFormContext();
  const {
    watchedImages,
    watchedColors,
    uploading,
    handleImageUpload,
    removeImage,
  } = useProductImages({ showModal });
  return (
    <div className="bg-white dark:bg-[#111111] p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800/60">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#A6866A] rounded-full"></span>

          Galería de Imágenes
        </h2>

        <p className="text-xs text-zinc-500 mt-2">
          Agrega las imágenes del producto y, si deseas,
          asígnales un color específico.
        </p>
      </div>

     
      <div
        className={`border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-12 text-center transition-all ${
          uploading
            ? "bg-zinc-50 dark:bg-zinc-900/50 opacity-50"
            : "hover:bg-zinc-50 dark:hover:bg-zinc-900/30 hover:border-[#A6866A] cursor-pointer"
        }`}
      >
        <input
          type="file"
          id="imageUpload"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageUpload}
          disabled={uploading}
          className="hidden"
        />

        <label
          htmlFor="imageUpload"
          className="cursor-pointer flex flex-col items-center gap-3 w-full h-full"
        >
          <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-zinc-500 mb-2">
            {uploading ? (
              <span className="animate-spin text-2xl">
                ⏳
              </span>
            ) : (
              <Upload
                size={28}
                className="text-[#A6866A]"
              />
            )}
          </div>

          <span className="text-base font-bold text-zinc-900 dark:text-zinc-200">
            {uploading
              ? "Subiendo imágenes..."
              : "Arrastra o haz clic para subir imágenes"}
          </span>

          <span className="text-sm text-zinc-400">
            Soporta JPG, PNG, WEBP
            {" · "}
            Recomendado 1000x1000px
          </span>
        </label>
      </div>

     
      {watchedImages.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase">
                Imágenes cargadas
              </h3>

              <p className="text-[11px] text-zinc-500 mt-1">
                {watchedImages.length}{" "}
                {watchedImages.length === 1
                  ? "imagen"
                  : "imágenes"}{" "}
                agregadas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {watchedImages.map(
              (img: ProductImageForm, index: number) => (
                <div
                  key={`${img.publicId || img.url}-${index}`}
                  className="relative group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-50 dark:bg-zinc-900/50 transition-all hover:shadow-md"
                >
                  <div className="aspect-square relative">
                    <SafeImage
                      src={img.url}
                      alt={`Imagen del producto ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>

                 
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-zinc-700 dark:text-zinc-300 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                    title="Eliminar imagen"
                  >
                    <X size={14} />
                  </button>

              
                  <div className="p-2 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="relative">
                      <select
                        {...register(
                          `images.${index}.color`
                        )}
                        className="w-full text-xs font-medium p-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 outline-none appearance-none cursor-pointer hover:border-[#A6866A] transition-colors"
                      >
                        <option value="">
                          Sin color específico
                        </option>

                        {watchedColors.map(
                          (colorName: string) => (
                            <option
                              key={colorName}
                              value={colorName}
                            >
                              {colorName}
                            </option>
                          )
                        )}
                      </select>

                      <ChevronDown
                        size={14}
                        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
      {watchedImages.length === 0 && !uploading && (
        <div className="mt-6 p-5 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-sm text-zinc-400">
            Todavía no has agregado imágenes al producto.
          </p>
        </div>
      )}
    </div>
  );
}