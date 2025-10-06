import brandBanner from "@/assets/brand bangloure.png";
import { Button } from "@/components/ui/button";

const BrandBengaluruSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-muted/40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 md:mb-6">
              Shape the Future of Brand Bengaluru
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Imagine a city where walkable, pedestrian-friendly roads put people first — safe, convenient, and vibrant. Together, we can make this vision a reality. Share your thoughts, lend your voice, and be a part of building the Bengaluru we’re all proud of — Brand Bengaluru.
            </p>
              {/* 
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
              <Button className="bg-primary text-primary-foreground hover:opacity-90 px-6 py-5 text-base font-semibold">
                Share Your Ideas
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-5 text-base font-semibold">
                Learn More
              </Button>
            </div>
             */}
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-white">
              <img
                src="https://i.postimg.cc/hvWLbV5S/brand-bangloure.png"
                alt="Brand Bengaluru"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandBengaluruSection;


