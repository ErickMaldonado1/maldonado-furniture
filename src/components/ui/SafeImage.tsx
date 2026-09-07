import { useState } from "react";
import Image, { ImageProps } from "next/image";
import cloudinaryLoader from "@/utils/cloudinaryLoader";

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "https://res.cloudinary.com/dwvruzkll/image/upload/v1769123783/dormitorio_ig6v5k.webp";

export function SafeImage({ src, fallbackSrc, alt, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);

  const activeSrc = error ? (fallbackSrc || DEFAULT_FALLBACK) : src;

  return (
    <Image
      {...props}
      loader={cloudinaryLoader}
      src={activeSrc}
      alt={alt || "Image"}
      onError={() => setError(true)}
    />
  );
}
