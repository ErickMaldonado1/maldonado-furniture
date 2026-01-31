"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import ProductCard from "@/components/shop/ProductCard";
import { RecentlyViewed } from "@/components/shop/RecentlyViewed";
import { ProductGallery } from "@/components/shop/product-detail/ProductGallery";
import { ProductInfo } from "@/components/shop/product-detail/ProductInfo";
import { ProductActions } from "@/components/shop/product-detail/ProductActions";
import { ProductSpecs } from "@/components/shop/product-detail/ProductSpecs";

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
  const { addToCart, isInCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const isFav = isFavorite(product.id);
  const inCart = isInCart(product.id);
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
    });
    toast.success("Producto añadido al carrito");
  };

  const handleToggleFav = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      image: product.images?.[0]?.url || "",
      price: finalPrice,
    });
  };

  return (
    <div className="space-y-24 animate-fade-in-up pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-6">
        <div className="lg:col-span-7">
          <ProductGallery
            product={product}
            selectedImage={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
            isFav={isFav}
            onToggleFav={handleToggleFav}
          />
        </div>

        <div className="lg:col-span-5 pt-4">
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
          />
        </div>
      </div>

      <ProductSpecs
        description={product.description || ""}
        materials={product.materials as string[]}
        dimensions={selectedVariant?.dimensions}
        careInstructions={(product as any).careInstructions}
      />

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="pt-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Los Clientes también{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
                vieron
              </span>
            </h2>
            <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-900 mx-8 hidden md:block" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.slice(0, 4).map((p, idx) => (
              <ProductCard key={p.id} product={p as any} index={idx} />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed currentProduct={product as unknown as Product} />
    </div>
  );
}
