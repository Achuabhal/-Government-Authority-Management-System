import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const GovernmentOrdersSection = () => {
  const documents = [
    {
      title: "Circular - April 2024",
      description: "Download the document to view Details",
      type: "Circular"
    },
    {
      title: "Report - April 2024", 
      description: "Download the document to view Details",
      type: "Report"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Government Orders</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access official government orders, circulars, and important documents
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {documents.map((doc, index) => (
            <Card key={index} className="bg-gradient-card hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-gov-red">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gov-red rounded-full w-12 h-12 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="bg-gov-red/10 text-gov-red px-3 py-1 rounded-full text-sm font-medium">
                      {doc.type}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight hover:text-primary transition-colors">
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  {doc.description}
                </CardDescription>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Download className="h-4 w-4 mr-2" />
                  Download Document
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovernmentOrdersSection;