import HeroSlider from "@/components/home/HeroSlider";
import ValueProps from "@/components/home/ValueProps";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import { ProductService } from "@/features/products/product.service";

const HomePage = async () => {
  const [featured, bedroom, living, office] = await Promise.all([
    ProductService.getAll({ isFeatured: true, limit: 8 }),
    ProductService.getByCategory("Dormitorio", 8),
    ProductService.getByCategory("Sala", 8),
    ProductService.getByCategory("Oficina", 8),
  ]);

  return (
    <div className="flex flex-col w-full dark:bg-[#050505] overflow-x-hidden mb-20">
      <HeroSlider />
      <FeaturedCarousel products={featured} />
      <ValueProps />
      <CategoryCarousel
        products={bedroom}
        title="Ideas para Dormitorio"
        categorySlug="dormitorio"
      />
      <CategoryCarousel
        products={living}
        title="Tu sala con estilo"
        categorySlug="sala"
      />
      <CategoryShowcase />

      <CategoryCarousel
        products={office}
        title="Muebles de oficina"
        categorySlug="oficina"
      />
    </div>
  );
};

export default HomePage;
