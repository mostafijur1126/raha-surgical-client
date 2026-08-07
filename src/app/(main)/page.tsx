import Banner from "@/components/home/banner/Banner";
import BannerSlider from "@/components/home/banner/BannerSlider";
import CategoriSection from "@/components/home/categoriProducts/CategoriSection";
import FeaturedProducts from "@/components/home/featuredProducts/FeaturedProducts";
import FeaturesSection from "@/components/home/FeaturesSection";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <CategoriSection></CategoriSection>
      <FeaturedProducts></FeaturedProducts>
      <FeaturesSection></FeaturesSection>
    </div>
  );
}
