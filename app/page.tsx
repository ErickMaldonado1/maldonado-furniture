import HeroSlider from "@/components/home/HeroSlider";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import ServicesHero from "@/components/home/ServicesHero";
import ValueProps from "@/components/home/ValueProps";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import prisma from "@/lib/prisma";

const HomePage = async () => {
  const featuredProducts = await prisma.product.findMany({
    where: { isActive: true },
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  return (
    <div className="flex flex-col w-full dark:bg-[#121212] overflow-x-hidden">
      <HeroSlider />
      <ValueProps />
      <FeaturedCarousel products={featuredProducts} />
      <CategoryShowcase />
      <ServicesHero />
    </div>
  );
};
export default HomePage;
