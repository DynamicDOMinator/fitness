import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";
import Services from "@/app/components/Experiences";
import Experiences from "@/app/components/Services";
import Testimonials from "@/app/components/Testimonials";
import Transformations from "@/app/components/Transformations";
import Journey from "@/app/components/Journey";
import FAQs from "@/app/components/FAQs";
import Pricing from "@/app/components/Pricing";
import FitnessTools from "@/app/components/FitnessTools";

export default function Home() {
  return (
    <div>
      <Header />
      <section id="home">
        <HeroSection />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="experiences">
        <Experiences />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="fitness-tools">
        <FitnessTools />
      </section>
      <section id="transformations">
        <Transformations />
      </section>
      <section id="journey">
        <Journey />
      </section>
      <section id="faqs">
        <FAQs />
      </section>
    </div>
  );
}
