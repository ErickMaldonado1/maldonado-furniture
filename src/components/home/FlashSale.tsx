import { ProductService } from "@/features/products/product.service";
import FlashSaleCarousel from "@/components/home/FlashSaleCarousel";

export default async function FlashSale() {
  const allProducts = await ProductService.getAll({});

  const flashSaleProducts = allProducts
    .filter((product) => (product.discount ?? 0) >= 10)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
    .slice(0, 8);

  if (flashSaleProducts.length === 0) {
    return null;
  }

  return (
    <FlashSaleCarousel
      products={JSON.parse(JSON.stringify(flashSaleProducts))}
    />
  );
}
