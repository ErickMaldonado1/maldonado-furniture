import { ProductService } from "@/features/products/product.service";
import FlashSaleCarousel from "@/components/home/FlashSaleCarousel";

export default async function FlashSale() {
  const flashSaleProducts = await ProductService.getFlashSaleProducts(8);

  if (flashSaleProducts.length === 0) {
    return null;
  }

  return (
    <FlashSaleCarousel
      products={JSON.parse(JSON.stringify(flashSaleProducts))}
    />
  );
}
