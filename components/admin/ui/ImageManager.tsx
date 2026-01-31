"use client";

import { useState } from "react";
import { Icons } from "@/utils/icons";
import Image from "next/image";

interface ImageItem {
  url: string;
  publicId: string;
  color?: string;
}

interface ImageManagerProps {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
}

export function ImageManager({ images, onChange }: ImageManagerProps) {
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleAddImage = () => {
    if (!imageUrlInput) return;

    const newImage: ImageItem = {
      url: imageUrlInput,
      publicId: `upload/${Date.now()}`,
      color: selectedColor || undefined,
    };

    onChange([...images, newImage]);
    setImageUrlInput("");
    setSelectedColor("");
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const updateImageColor = (index: number, color: string) => {
    const newImages = [...images];
    newImages[index].color = color;
    onChange(newImages);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        Galería de Imágenes
      </h3>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="URL de la imagen (https://...)"
          value={imageUrlInput}
          onChange={(e) => setImageUrlInput(e.target.value)}
          className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4A3728]/20 outline-none font-medium text-sm"
        />
        <input
          type="text"
          placeholder="Color asociado (Opcional)"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full md:w-48 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4A3728]/20 outline-none font-medium text-sm"
        />
        <button
          type="button"
          onClick={handleAddImage}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2 justify-center"
        >
          <Icons.CloudArrowUp className="text-xl" />
          <span>Agregar</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative aspect-square rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          >
            <Image src={img.url} alt="preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
              >
                <Icons.XMark />
              </button>
              <input
                type="text"
                placeholder="Color"
                className="w-full text-xs bg-white text-black px-2 py-1 rounded text-center"
                value={img.color || ""}
                onChange={(e) => updateImageColor(idx, e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            {img.color && (
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] font-bold rounded uppercase">
                {img.color}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
