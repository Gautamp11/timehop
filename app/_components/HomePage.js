import CTA from "./CTA";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

export default function HomePage() {
  return (
    <section>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </section>
  );
}
