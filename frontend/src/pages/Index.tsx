import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsSection from "@/components/NewsSection";
import DepartmentsSection from "@/components/DepartmentsSection";
import BrandBengaluruSection from "@/components/BrandBengaluruSection";
import AboutSection from "@/components/AboutSection";
import VideoSection from "@/components/VideoSection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import SuggestionComplaintsSection from "@/components/SuggestionComplaintsSection";
import GovernmentOrdersSection from "@/components/GovernmentOrdersSection";
import Footer from "@/components/Footer";
import QuickServicesSection from "@/components/QuickServicesSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
         <QuickServicesSection />
         <AboutSection />
         <VideoSection />
        
        <NewsSection />
        <BrandBengaluruSection />
        <DepartmentsSection />
      
        <SuggestionComplaintsSection />
        <GovernmentOrdersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
