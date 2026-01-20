import HeroSlider from "@/components/home/HeroSlider";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import ServicesHero from "@/components/home/ServicesHero";
import ValueProps from "@/components/home/ValueProps";
const HomePage = async () => {
  return (
    <div className="flex flex-col w-full dark:bg-[#121212]">
      <HeroSlider />
      <ValueProps />
      <CategoryShowcase />
      <ServicesHero />
    </div>
  );
};
export default HomePage;
