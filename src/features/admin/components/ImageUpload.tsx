"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiPhotograph, HiX } from "react-icons/hi";
import { toast } from "sonner";

type ImageUploadProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  maxSize?: number;
};

export default function ImageUpload({
  value,
  onChange,
  maxSize = 5,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!value) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(value);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Solo se permiten imágenes JPG, PNG o WEBP.");
      e.target.value = "";
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      toast.error(
        `La imagen no puede superar los ${maxSize} MB.`
      );
      e.target.value = "";
      return;
    }

    onChange(file);
  };

  const handleRemove = () => {
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Imagen
      </label>

      {!preview ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-28 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition flex flex-col items-center justify-center gap-2 text-zinc-500"
        >
          <HiPhotograph size={28} />

          <span className="text-sm font-medium">
            Seleccionar imagen
          </span>

          <span className="text-xs text-zinc-400">
            JPG, PNG o WEBP · Máx. {maxSize} MB
          </span>
        </button>
      ) : (
        <div className="relative h-28 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100">
          <Image
            src={preview}
            alt="Vista previa"
            fill
            sizes="100%"
            className="object-cover"
            unoptimized
          />

          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
            title="Eliminar imagen"
          >
            <HiX size={18} />
          </button>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-2 left-2 px-3 py-1.5 rounded-lg bg-white/90 text-zinc-800 text-xs font-medium hover:bg-white transition"
          >
            Cambiar
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />

      {value && (
        <p className="text-xs text-zinc-400 truncate">
          {value.name}
        </p>
      )}
    </div>
  );
}