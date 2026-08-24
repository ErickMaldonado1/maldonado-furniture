import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { uploadImage } from "../../media/image.actions";

export interface ProductImageForm {
  url: string;
  publicId: string | null;
  color?: string | null;
  variantId?: string | null;
}

interface UseProductImagesOptions {
  showModal: (type: "success" | "error", title: string, message: string) => void;
}

export function useProductImages({ showModal }: UseProductImagesOptions) {
  const { control, setValue } = useFormContext();
  const [uploading, setUploading] = useState(false);

  const watchedImages = (useWatch({ control, name: "images" }) || []) as ProductImageForm[];
  const watchedColors = (useWatch({ control, name: "colors" }) || []) as string[];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: ProductImageForm[] = [...watchedImages];

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return uploadImage(formData, "products");
      });

      const results = await Promise.all(uploadPromises);

      let hasError = false;
      let errorMessage = "";

      for (const res of results) {
        if (res.success && res.imageUrl) {
          newImages.push({
            url: res.imageUrl,
            publicId: res.publicId || null,
            color: null,
          });
        } else {
          hasError = true;
          errorMessage = res.error || "Ocurrió un error inesperado al subir una o más imágenes.";
        }
      }

      if (hasError) {
        showModal(
          "error",
          "Error al subir imagen(es)",
          errorMessage
        );
      }

      setValue("images", newImages, { shouldDirty: true });
    } catch (error) {
      console.error("Upload error:", error);
      showModal("error", "Error al subir imagen(es)", "No fue posible subir las imágenes.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const current = [...watchedImages];
    current.splice(index, 1);
    setValue("images", current, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return {
    watchedImages,
    watchedColors,
    uploading,
    handleImageUpload,
    removeImage,
  };
}
