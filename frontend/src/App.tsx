import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import BrandBengaluru from "./pages/BrandBengaluru";
import EODB from "./pages/EODB";
import EAuction from "./pages/EAuction";
import Finance from "./pages/Finance";
import LandAcquisition from "./pages/LandAcquisition";
import CATdr from "./pages/CATdr";
import Administration from "./pages/Administration";
import Engineering from "./pages/Engineering";
import TownPlanning from "./pages/TownPlanning";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Ongoingproject from "./pages/Ongoingproject";
import NotFound from "./pages/NotFound";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import NewsArticle from "./pages/NewsArticle";
import RTI from "./pages/RTI";

import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import SetupDemo from "./admin/SetupDemo";
import HeroAdmin from "./admin/HeroAdmin";
import SubAdmins from "./admin/SubAdmins";
import SuperAdminEmail from "./admin/SuperAdminEmail";
import NewsAdmin from "./admin/NewsAdmin";
import PhotoGalleryAdmin from "./admin/PhotoGalleryAdmin";
import PhotoGallery from "./pages/PhotoGallery";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TranslationProvider } from "./contexts/TranslationContext";
import "./index.css";
import { useDataStore } from './store/store';
import { useEffect } from "react";
import ProtectedRoute from "./components/protect";



import AdminLayout1 from "./leadadmin/AdminLayout";
import HeroAdmin1 from "./leadadmin/HeroAdmin";
import SubAdmins1 from "./leadadmin/SubAdmins";
import SuperAdminEmail1 from "./leadadmin/SuperAdminEmail";
import NewsAdmin1 from "./leadadmin/NewsAdmin";
import PhotoGalleryAdmin1 from "./leadadmin/PhotoGalleryAdmin";


import Admin2 from "./subadmin/AdminLayout";
import HeroAdmin2 from "./subadmin/HeroAdmin";
import SubAdmins2 from "./subadmin/SubAdmins";
import SuperAdminEmail2 from "./subadmin/SuperAdminEmail";
import NewsAdmin2 from "./subadmin/NewsAdmin";
import PhotoGalleryAdmin2 from "./subadmin/PhotoGalleryAdmin";

import Admin3 from "./superadminupdate/AdminLayout";
import HeroAdmin3 from "./superadminupdate/HeroAdmin";
import SubAdmins3 from "./subadmin/SubAdmins";
import SuperAdminEmail3 from "./superadminupdate/SuperAdminEmail";
import NewsAdmin3 from "./superadminupdate/NewsAdmin";
import PhotoGalleryAdmin3 from "./superadminupdate/PhotoGalleryAdmin";







const queryClient = new QueryClient();

function App() {
  const fetchData = useDataStore((state) => state.fetchData);

  useEffect(() => {
    fetchData(); // fetch when app starts
  }, [fetchData]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <TranslationProvider>
            <SetupDemo />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/news" element={<NewsList />} />
                <Route path="/news/:id" element={<NewsArticle />} />
                <Route path="/photo-gallery" element={<PhotoGallery />} />
                <Route path="/brand-bengaluru" element={<BrandBengaluru />} />
                <Route path="/eodb" element={<EODB />} />
                <Route path="/e-auction" element={<EAuction />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/land-acquisition" element={<LandAcquisition />} />
                <Route path="/ca-tdr" element={<CATdr />} />
                <Route path="/administration" element={<Administration />} />
                <Route path="/engineering" element={<Engineering />} />
                <Route path="/town-planning" element={<TownPlanning />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/ongoingproject" element={<Ongoingproject />} />
                <Route path="/rti" element={<RTI />} />
                <Route path="/admin/login" element={<AdminLogin />} />


               <Route
                  path="/admin3"
                  element={
                    <ProtectedRoute>
                      <Admin3 />
                    </ProtectedRoute>
                  }
                >
                  <Route path="banner3" element={<HeroAdmin3 />} />
                  <Route path="sub-admins3" element={<SubAdmins3 />} />
                  <Route path="super-email3" element={<SuperAdminEmail3 />} />
                  <Route path="news3" element={<NewsAdmin3 />} />
                  <Route path="photo-gallery3" element={<PhotoGalleryAdmin3 />} />
                </Route>
                  <Route
                  path="/admin2"
                  element={
                    <ProtectedRoute>
                      <Admin2 />
                    </ProtectedRoute>
                  }
                >
                  <Route path="banner2" element={<HeroAdmin2 />} />
                  <Route path="sub-admins2" element={<SubAdmins2 />} />
                  <Route path="super-email2" element={<SuperAdminEmail2 />} />
                  <Route path="news2" element={<NewsAdmin2 />} />
                  <Route path="photo-gallery2" element={<PhotoGalleryAdmin2 />} />
                </Route>

                {/* Admin routes */}
                
                  <Route
                  path="/admin1"
                  element={
                    <ProtectedRoute>
                      <AdminLayout1 />
                    </ProtectedRoute>
                  }
                > 
                  <Route path="layout1" element={<AdminLayout1/>} />
                  <Route path="banner1" element={<HeroAdmin1 />} />
                  <Route path="sub-admins1" element={<SubAdmins1 />} />
                  <Route path="super-email1" element={<SuperAdminEmail1 />} />
                  <Route path="news1" element={<NewsAdmin1 />} />
                  <Route path="photo-gallery1" element={<PhotoGalleryAdmin1 />} />
                </Route>

                   <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="banner" element={<HeroAdmin />} />
                  <Route path="sub-admins" element={<SubAdmins />} />
                  <Route path="super-email" element={<SuperAdminEmail />} />
                  <Route path="news" element={<NewsAdmin />} />
                  <Route path="photo-gallery" element={<PhotoGalleryAdmin />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TranslationProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
