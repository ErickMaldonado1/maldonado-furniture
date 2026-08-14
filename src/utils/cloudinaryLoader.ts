import { ImageLoaderProps } from "next/image";

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const urlParts = src.split("/upload/");
  if (urlParts.length !== 2) return src;

  const baseUrl = urlParts[0];
  const imagePath = urlParts[1];

  const params = `f_auto,q_${quality || "auto"},w_${width},c_limit`;

  return `${baseUrl}/upload/${params}/${imagePath}`;
}
