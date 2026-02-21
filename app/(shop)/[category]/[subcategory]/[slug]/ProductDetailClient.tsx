"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import { RecentlyViewed } from "@/components/shop/product/RecentlyViewed";
import { ProductGallery } from "@/components/shop/product-detail/ProductGallery";
import { ProductInfo } from "@/components/shop/product-detail/ProductInfo";
import { ProductActions } from "@/components/shop/product-detail/ProductActions";
import { RelatedProductsSection } from "@/components/shop/product/RelatedProductSection";

interface ProductWithRelations extends Product {
  images: any[];
  variants: any[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: ProductWithRelations;
  relatedProducts: Product[];
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(
    product.variants?.[0] || null,
  );
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { addToCart, isInCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFav = mounted ? isFavorite(product.id) : false;
  const inCart = mounted ? isInCart(product.id) : false;
  const finalPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
    if (variant.color && product.images?.length) {
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: quantity,
      image: product.images?.[0]?.url || "",
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
      name: product.name,
      image: product.images?.[0]?.url || "",
      price: finalPrice,
      category: product.category ?? undefined,
      subcategory: product.subcategory ?? undefined,
    });
  };

  return (
    <div className="space-y-24 animate-fade-in-up pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-6 items-start">
        <div className="lg:col-span-7 lg:sticky lg:top-40 h-fit">
          <ProductGallery
            product={product}
            selectedImage={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
            isFav={isFav}
            onToggleFav={handleToggleFav}
          />
        </div>
        <div className="lg:col-span-5 space-y-12 pb-12">
          <ProductInfo
            product={product}
            finalPrice={finalPrice}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
          />

          <ProductActions
            productName={product.name}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            isInCart={inCart}
            price={product.price}
            finalPrice={finalPrice}
            discount={product.discount}
            sku={selectedVariant?.sku || product.sku || ""}
            color={selectedVariant?.color || ""}
            dimensions={selectedVariant?.dimensions}
            materials={product.materials as string[]}
            careInstructions={(product as any).careInstructions}
          />
        </div>
      </div>

      <RelatedProductsSection relatedProducts={relatedProducts} />

      <RecentlyViewed currentProduct={product as unknown as Product} />
    </div>
  );
}
