import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Menu, X, Search } from "lucide-react";
import bdaLogo from "../bda.png";
import LoginModal from "./LoginModal";
import { useTranslation } from "@/contexts/TranslationContext";
import { useTheme } from "@/contexts/ThemeContext";
import RTIDropdown from "./RTIDropdown";
import { Link } from "react-router-dom";
import Online from "./online";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const mainLinks = [
    { label: "ABOUT US", href: "/about-us" },
// { label: "SECTIONS", href: "#sections" },
    { label: "IPGRS", href: "https://ipgrs.karnataka.gov.in/" },
    { label: "ONGOING PROJECTS", href: "/ongoingproject" },
    { label: "PHOTO GALLERY", href: "/photo-gallery" },
    { label: "E-AUCTION", href: "/e-auction" },
    { label: "EODB", href: "/eodb" },
    { label: "CONTACT US", href: "/contact" },
  ];

  const handleTranslate = (lang: string) => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://translate.google.com/translate?sl=auto&tl=${lang}&u=${url}`, "_blank");
  };

  return (
    <header
      className={`w-full sticky top-0 left-0 z-50 shadow-md ${
        theme === "independence-day" ? "bg-[#FFFFFF] text-[#000080]" : "bg-white text-black"
      }`}
    >
      {/* Top Bar */}
      <div
        className={`text-white text-[11px] relative overflow-hidden ${
          theme === "independence-day" ? "bg-[#FF9933]" : "bg-[#1A237E]"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-3 py-1.5 relative z-10">
          <div className="flex items-center gap-2 min-w-0 max-w-[60%]">
           <img src="https://i.postimg.cc/V0CG3g9m/your-image.png" alt="BDA Logo" className="h-4 w-4 rounded-sm" />

            <span
              className={`font-medium truncate drop-shadow ${
                theme === "independence-day" ? "text-[#000080]" : "text-white"
              }`}
            >
              Bangalore Development Authority
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className={`h-6 px-2 text-[11px] font-medium ${
                language === "en"
                  ? theme === "independence-day"
                    ? "bg-[#FFFFFF]/30 text-[#000080]"
                    : "bg-white/30 text-white"
                  : theme === "independence-day"
                  ? "text-[#000080] hover:bg-[#FFFFFF]/20"
                  : "text-white hover:bg-white/20"
              }`}
              onClick={() => setLanguage("en")}
            >
              ENGLISH
            </Button>
            <span className={theme === "independence-day" ? "text-[#000080]/70" : "text-white/70"}>|</span>
            <Button
              variant="ghost"
              className={`h-6 px-2 text-[11px] font-medium ${
                language === "kn"
                  ? theme === "independence-day"
                    ? "bg-[#FFFFFF]/30 text-[#000080]"
                    : "bg-white/30 text-white"
                  : theme === "independence-day"
                  ? "text-[#000080] hover:bg-[#FFFFFF]/20"
                  : "text-white hover:bg-white/20"
              }`}
              onClick={() => setLanguage("kn")}
            >
              ಕನ್ನಡ
            </Button>
            <Button
              className={`h-6 px-3 rounded-full text-[11px] font-semibold ${
                theme === "independence-day"
                  ? "bg-[#000080] text-white hover:bg-[#000080]/80"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              onClick={() => setLoginOpen(true)}
            >
              Resolve Your Issue
            </Button>
           
          </div>
        </div>
      </div>

      {/* Logo + Search Row */}
      <div className="bg-white py-2 md:py-3 px-3 md:px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2 overflow-x-hidden">
          <div className="flex items-center gap-2 min-w-0">
           <img
  src="https://i.postimg.cc/rshBRYK0/bda-logo.png"
  alt="BDA Logo"
  className="h-10 md:h-12"
/>

          </div>
          <div className="hidden md:block relative w-full max-w-xs">
            <input
              type="search"
              placeholder="Search…"
              className={`w-full rounded-full border ${
                theme === "independence-day" ? "border-[#FF9933] focus:ring-[#FF9933]" : "border-gray-300 focus:ring-blue-400"
              } pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2`}
            />
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                theme === "independence-day" ? "text-[#000080]" : "text-gray-500"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={theme === "independence-day" ? "bg-[#138808] text-white" : "bg-[#1A237E] text-white"}
      >
        <div className="container mx-auto flex items-center px-3 md:px-4 py-1.5 md:py-2">
          <div className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button
                variant="ghost"
                className={`p-2 hover:bg-white/20 ${
                  theme === "independence-day" ? "text-white" : "text-white"
                } rounded-full shadow-lg`}
              >
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-1">
              {mainLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-2.5 py-2 text-[13px] font-semibold hover:bg-white/20 rounded-lg transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
                >
                  {link.label}
                </a>
              ))}
              <RTIDropdown />
              <Online />
            </div>
          </div>
          <Button
            onClick={() => setMobileOpen(!mobileOpen)}
            variant="ghost"
            className="md:hidden ml-auto p-2 hover:bg-white/20 text-white rounded-full"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        {mobileOpen && (
          <div
            className={`md:hidden px-4 py-3 space-y-2 ${
              theme === "independence-day" ? "bg-[#138808]" : "bg-[#1A237E]"
            }`}
          >
            <Link to="/">
              <div className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg font-semibold transition-all hover:bg-white/10">
                <Home className="h-4 w-4" />
                <span>HOME</span>
              </div>
            </Link>
            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm py-2 px-3 rounded-lg font-semibold transition-all hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
};

export default Header;