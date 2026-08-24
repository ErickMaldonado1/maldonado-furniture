import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

export function SafeImage({ src, fallbackSrc, alt, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);
  const defaultFallback = "https://res.cloudinary.com/dwvruzkll/image/upload/v1769123783/dormitorio_ig6v5k.webp";

  return (
    <Image
      {...props}
      src={error ? (fallbackSrc || defaultFallback) : src}
      alt={alt || "Image"}
      onError={() => setError(true)}
    />
  );
}
