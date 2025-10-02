
import HeroSection from "@/app/components/HeroSection";
import Services from "@/app/components/Experiences";
import Experiences from "@/app/components/Services";
import Testimonials from "@/app/components/Testimonials";
import Transformations from "@/app/components/Transformations";
import Journey from "@/app/components/Journey";
import FAQs from "@/app/components/FAQs";
import Pricing from "@/app/components/Pricing";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <Services />
      <Testimonials />
      <Experiences />
      <Transformations />
      <Journey />
      <Pricing />
      <FAQs />
    </div>
  );
}
