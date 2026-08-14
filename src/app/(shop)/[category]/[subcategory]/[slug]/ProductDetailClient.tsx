"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import { ProductGallery } from "@/components/shop/product-detail/ProductGallery";
import { ProductInfo } from "@/components/shop/product-detail/ProductInfo";
import { ProductVariantSelector } from "@/components/shop/product-detail/ProductVariantSelector";
import { VariantDrawer } from "@/components/shop/product-detail/VariantDrawer";
import { ProductActions } from "@/components/shop/product-detail/ProductActions";
import { ProductDetailsContent } from "@/components/shop/product-detail/ProductDetailsContent";
import { RelatedProductsSection } from "@/components/shop/product/RelatedProductSection";
import { ProductWithRelations } from "@/types/product-service";
import Image from "next/image";
import { slugify } from "@/utils/slugify";

const RecentlyViewed = dynamic(
  () =>
    import("@/components/shop/product/RecentlyViewed").then(
      (mod) => mod.RecentlyViewed,
    ),
  { ssr: false },
);

export interface SiblingProduct {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  subcategory: string | null;
  colors: string[];
  images: Array<{ url: string; color: string | null }>;
}

export function ProductDetailClient({
  product,
  relatedProducts,
  siblingProducts = [],
  dbColors = [],
}: {
  product: ProductWithRelations;
  relatedProducts: Product[];
  siblingProducts?: SiblingProduct[];
  dbColors?: any[];
}) {
  const initialVariant = product.variants?.[0] || null;

  const [selectedVariant, setSelectedVariant] = useState<any>(initialVariant);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    initialVariant?.color || product.colors?.[0] || null,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    initialVariant?.sizeLabel || null,
  );
  const [selectedDimension, setSelectedDimension] = useState<string | null>(
    initialVariant?.dimensionLabel || null,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<"color" | "size">("color");

  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { addToCart, isInCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const colorParam = params.get("color");
      if (colorParam) {
        const match = product.variants?.find(
          (v: any) => v.color && slugify(v.color) === colorParam,
        );
        if (match?.color) {
          setSelectedColor(match.color);
          setSelectedVariant(match);
          if (match.sizeLabel) setSelectedSize(match.sizeLabel);
          if (match.dimensionLabel) setSelectedDimension(match.dimensionLabel);

          const targetColor = match.color.toLowerCase().trim();
          const imgIndex = (product.images || []).findIndex(
            (img: any) => img.color?.toLowerCase().trim() === targetColor,
          );
          if (imgIndex !== -1) setSelectedImageIndex(imgIndex);
        }
      }
    }
  }, [product.variants]);

  const galleryImages = useMemo(() => {
    const list = [...(product.images || [])];
    siblingProducts.forEach((sibling) => {
      sibling.images?.forEach((img) => {
        const exists = list.some((item) => item.url === img.url);
        if (!exists) {
          const siblingColorFromField = sibling.colors?.[0];
          const dashIdx = sibling.name.lastIndexOf(" - ");
          const siblingColorFromName =
            dashIdx !== -1
              ? sibling.name.substring(dashIdx + 3).trim()
              : sibling.name.trim();
          const siblingColor = siblingColorFromField || siblingColorFromName;

          list.push({
            id: sibling.id,
            url: img.url,
            publicId: sibling.id,
            color: siblingColor,
            productId: sibling.id,
            variantId: null,
            createdAt: new Date(),
          } as any);
        }
      });
    });
    return list;
  }, [product.images, siblingProducts]);

  const filteredImages = useMemo(() => {
    if (!selectedColor) return galleryImages;
    const targetColor = selectedColor.toLowerCase().trim();
    const filtered = galleryImages.filter(
      (img) => img.color?.toLowerCase().trim() === targetColor,
    );
    return filtered.length > 0 ? filtered : galleryImages;
  }, [galleryImages, selectedColor]);

  const findImageIndexForColor = useCallback(
    (colorName: string): number => {
      if (!galleryImages.length || !colorName) return -1;
      const normalizedColor = colorName.toLowerCase().trim();

      const exactIndex = galleryImages.findIndex(
        (img: any) => img.color?.toLowerCase().trim() === normalizedColor,
      );
      if (exactIndex !== -1) return exactIndex;

      const slugColor = normalizedColor.replace(/\s+/g, "-");
      const urlIndex = galleryImages.findIndex((img: any) =>
        img.url.toLowerCase().includes(slugColor),
      );
      if (urlIndex !== -1) return urlIndex;

      return -1;
    },
    [galleryImages],
  );

  const findMatchingVariant = useCallback(
    (
      targetColor: string | null,
      targetSize: string | null,
      targetDimension: string | null,
    ) => {
      if (!product.variants?.length) return null;

      const candidates = product.variants;

      let match = candidates.find(
        (v: any) =>
          (targetColor
            ? v.color?.toLowerCase().trim() === targetColor.toLowerCase().trim()
            : true) &&
          (targetSize ? v.sizeLabel === targetSize : true) &&
          (targetDimension ? v.dimensionLabel === targetDimension : true),
      );

      if (!match && targetColor && targetSize) {
        match = candidates.find(
          (v: any) =>
            v.color?.toLowerCase().trim() ===
              targetColor.toLowerCase().trim() && v.sizeLabel === targetSize,
        );
      }

      if (!match && targetColor && targetDimension) {
        match = candidates.find(
          (v: any) =>
            v.color?.toLowerCase().trim() ===
              targetColor.toLowerCase().trim() &&
            v.dimensionLabel === targetDimension,
        );
      }

      if (!match && targetColor) {
        match = candidates.find(
          (v: any) =>
            v.color?.toLowerCase().trim() === targetColor.toLowerCase().trim(),
        );
      }

      if (!match && targetSize) {
        match = candidates.find((v: any) => v.sizeLabel === targetSize);
      }

      return match || candidates[0];
    },
    [product.variants],
  );

  const handleOpenDrawer = (type: "color" | "size") => {
    setDrawerType(type);
    setIsDrawerOpen(true);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);

    const nextVariant = findMatchingVariant(
      color,
      selectedSize,
      selectedDimension,
    );
    if (nextVariant) {
      setSelectedVariant(nextVariant);
      if (nextVariant.sizeLabel) setSelectedSize(nextVariant.sizeLabel);
      if (nextVariant.dimensionLabel)
        setSelectedDimension(nextVariant.dimensionLabel);
    }

    setSelectedImageIndex(0);
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      window.history.replaceState(
        { color },
        "",
        `${currentPath}?color=${slugify(color)}`,
      );
    }
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);

    const nextVariant = findMatchingVariant(
      selectedColor,
      size,
      selectedDimension,
    );
    if (nextVariant) {
      setSelectedVariant(nextVariant);
      if (nextVariant.color) {
        setSelectedColor(nextVariant.color);
        const imgIndex = findImageIndexForColor(nextVariant.color);
        if (imgIndex !== -1) setSelectedImageIndex(imgIndex);
      }
    }
  };

  const handleSelectDimension = (dimension: string) => {
    setSelectedDimension(dimension);

    const nextVariant = findMatchingVariant(
      selectedColor,
      selectedSize,
      dimension,
    );
    if (nextVariant) {
      setSelectedVariant(nextVariant);
      if (nextVariant.color) {
        setSelectedColor(nextVariant.color);
        const imgIndex = findImageIndexForColor(nextVariant.color);
        if (imgIndex !== -1) setSelectedImageIndex(imgIndex);
      }
    }
  };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    const imgColor = filteredImages[index]?.color;
    if (imgColor && imgColor.toLowerCase() !== selectedColor?.toLowerCase()) {
      setSelectedColor(imgColor);
      const matchingVariant = findMatchingVariant(
        imgColor,
        selectedSize,
        selectedDimension,
      );
      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
      }
    }
  };

  const basePrice = selectedVariant?.price ?? product.price;
  const finalPrice = basePrice - (basePrice * (product.discount || 0)) / 100;
  const isFav = mounted ? isFavorite(product.id) : false;
  const inCart = mounted ? isInCart(product.id) : false;

  const handleAddToCart = () => {
    const activeColorName = selectedColor || selectedVariant?.color || "";
    const variantImage =
      filteredImages[selectedImageIndex]?.url || product.images?.[0]?.url || "";

    addToCart({
      id: product.id,
      name: selectedVariant?.name || product.name,
      price: finalPrice,
      quantity: quantity,
      image: variantImage,
      variantId: selectedVariant?.id || product.variants?.[0]?.id,
      sku: selectedVariant?.sku || product.sku || "N/A",
      variantName: activeColorName || "Estándar",
      dimensions: selectedVariant?.dimensions
        ? `${selectedVariant.dimensions.height}x${selectedVariant.dimensions.width}x${selectedVariant.dimensions.depth}cm`
        : selectedSize || "Estándar",
      materials: product.materials?.join(", ") || "Tapizado / Madera",
      category: product.category ?? undefined,
      subcategory: product.subcategory ?? undefined,
    });

    toast.success("¡Producto añadido al carrito con éxito!");
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
    <div className="space-y-12 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 lg:items-start">
        <div className="order-1 lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <ProductGallery
            productName={product.name}
            images={filteredImages}
            selectedImage={selectedImageIndex}
            onImageSelect={handleImageSelect}
            isFav={isFav}
            onToggleFav={handleToggleFav}
          />
        </div>
        <div className="order-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24 h-fit space-y-6">
          <ProductInfo product={product} selectedVariant={selectedVariant} />

          <ProductVariantSelector
            variants={product.variants || []}
            selectedVariant={selectedVariant}
            siblingProducts={siblingProducts}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            selectedDimension={selectedDimension}
            onOpenDrawer={handleOpenDrawer}
          />

          <ProductActions
            productName={selectedVariant?.name || product.name}
            sku={selectedVariant?.sku || product.sku}
            color={selectedColor || selectedVariant?.color || ""}
            size={selectedSize || selectedVariant?.sizeLabel || ""}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            isInCart={inCart}
            isFav={isFav}
            onToggleFav={handleToggleFav}
            price={basePrice}
            finalPrice={finalPrice}
            discount={product.discount}
            deliveryDays={product.deliveryDays}
            dimensions={selectedVariant?.dimensions}
            materials={product.materials as string[]}
            careInstructions={(product as any).careInstructions}
          />
        </div>
        <div className="order-3 lg:col-span-7 lg:col-start-1 lg:row-start-2">
          <ProductDetailsContent
            product={product}
            selectedVariant={selectedVariant}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
          />
        </div>
      </div>

      <VariantDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        drawerType={drawerType}
        productName={selectedVariant?.name || product.name}
        productImages={galleryImages}
        price={basePrice}
        finalPrice={finalPrice}
        discount={product.discount}
        sku={selectedVariant?.sku || product.sku}
        variants={product.variants || []}
        selectedVariant={selectedVariant}
        siblingProducts={siblingProducts}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        selectedDimension={selectedDimension}
        onSelectColor={handleSelectColor}
        onSelectSize={handleSelectSize}
        onSelectDimension={handleSelectDimension}
        dbColors={dbColors}
      />
      <RelatedProductsSection relatedProducts={relatedProducts} />
      <RecentlyViewed currentProduct={product} />
    </div>
  );
}
