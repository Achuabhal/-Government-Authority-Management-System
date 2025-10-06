import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, FileText, Gavel, Building } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ For internal navigation

const QuickServicesSection = () => {
  const items = [
    { icon: User, title: "What's New", description: "Latest updates and announcements", link: "/whats-new", type: "internal" },
    { icon: FileText, title: "Press Release", description: "Official press releases", link: "https://example.com/press", type: "external" },
    { icon: Gavel, title: "E-Auction", description: "Online auction services", link: "/e-auction", type: "internal" },
    { icon: Building, title: "Tenders", description: "Current tender notifications", link: "https://kppp.karnataka.gov.in/#/portal/portal-home", type: "external" },
    { icon: Building, title: "Flats", description: "BDA flat allotment services", link: "https://housing.bdabangalore.org/", type: "external" },
  ];

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-muted to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            const content = (
              <Card className="h-full border-0 ring-1 ring-black/5 bg-white/80 backdrop-blur rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/90 rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        →
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-base md:text-lg text-gray-900 mb-1 leading-snug">{item.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );

            // ✅ Conditional rendering
            return item.type === "external" ? (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.title}
                className="block focus-visible:outline-none"
              >
                {content}
              </a>
            ) : (
              <Link
                key={index}
                to={item.link}
                aria-label={item.title}
                className="block focus-visible:outline-none"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickServicesSection;
