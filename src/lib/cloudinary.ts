import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "Faltan las variables de entorno de Cloudinary: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY o CLOUDINARY_API_SECRET",
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

/**
 * Sube una imagen a Cloudinary.
 *
 * @param file 
 * @param folder 
 */
export const uploadImage = async (
  file: string,
  folder: string = "products",
) => {
  try {
    if (!file) {
      throw new Error("No se recibió ninguna imagen para subir.");
    }

    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "image",
      type: "upload",
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    throw new Error(
      `Cloudinary upload failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    if (!publicId) {
      throw new Error("No se recibió el publicId de Cloudinary.");
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      type: "upload",
    });

    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);

    throw new Error(
      `Cloudinary delete failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
};

export default cloudinary;