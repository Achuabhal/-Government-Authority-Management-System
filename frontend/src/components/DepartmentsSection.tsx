import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  MapPin, 
  FileText, 
  Users, 
  Wrench, 
  Building2,
  ArrowRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DepartmentsSection = () => {
  const navigate = useNavigate();
  const departments = [
    {
      icon: Calculator,
      title: "Finance",
      description: "The Finance Section renders advice to the Authority on various financial issues and is also entrusted with the responsibility for maintenance of the accounts of the Authority.",
      color: "bg-blue-500"
    },
    {
      icon: MapPin,
      title: "Land Acquisition",
      description: "The Land Acquisition section acquires land for various developmental schemes as approved by the Government of Karnataka under Section 35 and Section 36 of Bangalore Development Authority Act, 1976.",
      color: "bg-green-500"
    },
    {
      icon: FileText,
      title: "CA and TDR",
      description: "Development Rights Certificates (DRC's) in lieu of Monetary compensation for lands acquired by the public authority for public purposes is being issued at TDR Cell of Estate.",
      color: "bg-purple-500"
    },
    {
      icon: Users,
      title: "Administration",
      description: "The Administration section is entrusted with the responsibility of all establishment and general administrative matters. The section also handles all matters related to allotment of sites, flats and their post allotment work.",
      color: "bg-orange-500"
    },
    {
      icon: Wrench,
      title: "Engineering",
      description: "The Engineering Department is primarily concerned with the execution of various developmental schemes in the layouts and also construction of infrastructure works. The department also monitors...",
      color: "bg-red-500"
    },
    {
      icon: Building2,
      title: "Town Planning",
      description: "The Bangalore Development Authority is the statutory Planning Authority under the provisions of section 2-7(a)(i) and (81-B) of Karnataka Town and Country Planning Act, 1961 for the Local Planning...",
      color: "bg-indigo-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Explore our Sections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the various departments and their specialized services that work together to serve the citizens of Bangalore
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => {
            const IconComponent = dept.icon;
            return (
              <Card key={index} className="group ring-1 ring-black/5 rounded-xl bg-white/90 backdrop-blur shadow-md hover:shadow-lg transition-all">
                <CardHeader className="text-center pb-4">
                  <div className={`${dept.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {dept.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {dept.description}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    className="group/btn btn-outline-primary"
                    onClick={() => {
                      if (dept.title === "Finance") navigate("/finance");
                      if (dept.title === "Land Acquisition") navigate("/land-acquisition");
                      if (dept.title === "CA and TDR") navigate("/ca-tdr");
                      if (dept.title === "Administration") navigate("/administration");
                      if (dept.title === "Engineering") navigate("/engineering");
                      if (dept.title === "Town Planning") navigate("/town-planning");
                    }}
                  >
                    Know More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;