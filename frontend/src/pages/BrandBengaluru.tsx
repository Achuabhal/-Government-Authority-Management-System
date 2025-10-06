import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandBengaluruSection from "@/components/BrandBengaluruSection";

const BrandBengaluru = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-gradient-nav text-white">
          <div className="container mx-auto px-4 py-10 md:py-16">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Brand Bengaluru</h1>
            <p className="mt-3 md:mt-4 text-white/90 max-w-3xl text-base md:text-lg">
              Join the mission to build a more livable, walkable, and people-first Bengaluru. Share your ideas and help shape the future of our city.
            </p>
          </div>
        </section>
        <BrandBengaluruSection />
      </main>
      <Footer />
    </div>
  );
};

export default BrandBengaluru;


