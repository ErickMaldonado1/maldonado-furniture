"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { toast } from "sonner";
import { Product } from "@prisma/client";
const RecentlyViewed = dynamic(
  () =>
    import("@/components/shop/product/RecentlyViewed").then(
      (mod) => mod.RecentlyViewed,
    ),
  { ssr: false },
);
import { ProductGallery } from "@/components/shop/product-detail/ProductGallery";
import { ProductInfo } from "@/components/shop/product-detail/ProductInfo";
import { ProductActions } from "@/components/shop/product-detail/ProductActions";
import { RelatedProductsSection } from "@/components/shop/product/RelatedProductSection";
import { ProductWithRelations } from "@/types/product-service";

export interface SiblingProduct {
  id: string;
  name: string;
  category: string | null;
  subcategory: string | null;
  colors: string[];
  images: Array<{ url: string; color: string | null }>;
}

export function ProductDetailClient({
  product,
  relatedProducts,
  siblingProducts = [],
}: {
  product: ProductWithRelations;
  relatedProducts: Product[];
  siblingProducts?: SiblingProduct[];
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(
    product.variants?.[0] || null,
  );

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    const imageColor = product.images?.[index]?.color;
    if (imageColor && product.variants?.length) {
      const normalizedImageColor = imageColor.toLowerCase().trim();
      const matchingVariant = product.variants.find(
        (v: any) => v.color?.toLowerCase().trim() === normalizedImageColor
      );
      if (matchingVariant && matchingVariant.id !== selectedVariant?.id) {
        setSelectedVariant(matchingVariant);
      }
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { addToCart, isInCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFav = mounted ? isFavorite(product.id) : false;
  const inCart = mounted ? isInCart(product.id) : false;

  const basePrice = selectedVariant?.price ?? product.price;
  const finalPrice = basePrice - (basePrice * (product.discount || 0)) / 100;

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
    if (variant.color && product.images?.length) {
      const normalizedColor = variant.color.toLowerCase().trim();
      const matchingImageIndex = product.images.findIndex(
        (img: any) =>
          img.color?.toLowerCase() === normalizedColor ||
          img.url.toLowerCase().includes(normalizedColor.replace(/\s+/g, "-")),
      );
      if (matchingImageIndex !== -1) {
        setSelectedImageIndex(matchingImageIndex);
      }
    }
  };

  const handleAddToCart = () => {
    const normalizedSelectedColor = selectedVariant?.color?.toLowerCase().trim() || "";
    const variantImage = product.images?.find(
      (img: any) =>
        img.color?.toLowerCase() === normalizedSelectedColor ||
        img.url.toLowerCase().includes(normalizedSelectedColor.replace(/\s+/g, "-")),
    )?.url;

    const cartImage =
      variantImage ||
      product.images?.[selectedImageIndex]?.url ||
      product.images?.[0]?.url ||
      "";

    addToCart({
      id: product.id,
      name: selectedVariant?.name || product.name,
      price: finalPrice,
      quantity: quantity,
      image: cartImage,
      variantId: selectedVariant?.id || product.variants?.[0]?.id,
      sku: selectedVariant?.sku || product.variants?.[0]?.sku || "N/A",
      variantName: selectedVariant?.color || "No especificado",
      dimensions: selectedVariant?.dimensions
        ? `${selectedVariant.dimensions.height}x${selectedVariant.dimensions.width}x${selectedVariant.dimensions.depth}cm`
        : "Estándar",
      materials: product.materials?.join(", ") || "Melamina",
      category: product.category ?? undefined,
      subcategory: product.subcategory ?? undefined,
    });
    toast.success("Producto añadido al carrito");
  };

  const handleToggleFav = () => {
    toggleFavorite({
      id: product.id,
      name: selectedVariant?.name || product.name,
      image: product.images?.[0]?.url || "",
      price: finalPrice,
      category: product.category ?? undefined,
      subcategory: product.subcategory ?? undefined,
    });
  };

  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-6 items-start">
        <div className="lg:col-span-7 lg:sticky lg:top-20 h-fit">
          <ProductGallery
            product={product}
            selectedImage={selectedImageIndex}
            onImageSelect={handleImageSelect}
            isFav={isFav}
            onToggleFav={handleToggleFav}
          />
        </div>
        <div className="lg:col-span-5 space-y-12">
          <ProductInfo
            product={product}
            finalPrice={finalPrice}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            siblingProducts={siblingProducts}
          />

          <ProductActions
            productName={selectedVariant?.name || product.name}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            isInCart={inCart}
            price={basePrice}
            finalPrice={finalPrice}
            discount={product.discount}
            sku={selectedVariant?.sku || product.sku || ""}
            color={selectedVariant?.color || ""}
            dimensions={selectedVariant?.dimensions}
            materials={product.materials as string[]}
            careInstructions={(product as any).careInstructions}
            variants={product.variants || []}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
          />
        </div>
      </div>

      <RelatedProductsSection relatedProducts={relatedProducts} />

      <RecentlyViewed currentProduct={product} />
    </div>
  );
}
