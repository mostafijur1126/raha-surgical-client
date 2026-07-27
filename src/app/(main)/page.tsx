import BannerSlider from "@/components/home/banner/BannerSlider";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedProducts from "@/components/home/products/FeaturedProducts";

export default function Home() {
  return (
    <div className="">
      <BannerSlider></BannerSlider>
      <FeaturedProducts></FeaturedProducts>
      <FeaturesSection></FeaturesSection>
    </div>
  );
}
