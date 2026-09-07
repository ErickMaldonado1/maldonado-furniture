import { ImageLoaderProps } from "next/image";

const FALLBACK_IMAGE_PUBLIC_ID = "dormitorio_ig6v5k.webp";

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const urlParts = src.split("/upload/");
  if (urlParts.length !== 2) return src;

  const baseUrl = urlParts[0];
  const imagePath = urlParts[1];
  const params = `f_auto,q_${quality || "auto"},w_${width},c_limit,d_${FALLBACK_IMAGE_PUBLIC_ID}`;

  return `${baseUrl}/upload/${params}/${imagePath}`;
}
