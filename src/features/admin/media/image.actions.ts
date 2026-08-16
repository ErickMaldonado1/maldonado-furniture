"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function uploadImage(
  formData: FormData,
  folder: string
) {
  try {
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return {
        success: false as const,
        error: "No se recibió ninguna imagen.",
      };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false as const,
        error: "Solo se permiten imágenes JPG, PNG o WEBP.",
      };
    }

    if (file.size > MAX_SIZE) {
      return {
        success: false as const,
        error: "La imagen no puede superar los 5 MB.",
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `maldonado-furniture/${folder}`,
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);

            if (!result) {
              return reject(
                new Error(
                  "Cloudinary no devolvió la imagen."
                )
              );
            }

            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          }
        )
        .end(buffer);
    });

    return {
      success: true as const,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo subir la imagen.",
    };
  }
}

export async function deleteImage(
  publicId: string
) {
  try {
    if (!publicId) {
      return {
        success: false as const,
        error: "Imagen no válida.",
      };
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    return {
      success: true as const,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la imagen.",
    };
  }
}