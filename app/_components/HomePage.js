import CTA from "./CTA";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Testimonials from "./Testimonials";

export default function HomePage() {
  return (
    <section className="max-w-6xl">
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </section>
  );
}
