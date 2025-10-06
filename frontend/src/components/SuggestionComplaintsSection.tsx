import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, MessageSquare, FileText } from "lucide-react";

const SuggestionComplaintsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Suggestion and Complaints</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Bringing everything that you want at your fingerprints!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center ring-1 ring-black/5 bg-white/90 backdrop-blur rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Phone className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-lg">Call on</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary font-bold text-lg"><a href="tel:9483166622">9483166622</a></p>
            </CardContent>
          </Card>

          

          {/* Website */}
          <Card className="text-center ring-1 ring-black/5 bg-white/90 backdrop-blur rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <FileText className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-lg">Website</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary font-bold"><a href="https://bda.karnataka.gov.in" target="_blank" rel="noreferrer">bda.karnataka.gov.in</a></p>
            </CardContent>
          </Card>

          <Card className="text-center ring-1 ring-black/5 bg-white/90 backdrop-blur rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-lg">Office Hrs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary font-bold">10:00AM-5.30PM</p>
            </CardContent>
          </Card>

          <Card className="text-center ring-1 ring-black/5 bg-white/90 backdrop-blur rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-lg">Suggestion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-3">
                <Button className="btn-primary font-semibold">Suggestion</Button>
                <Button variant="outline" className="btn-outline-primary font-semibold">Feedback-Box</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SuggestionComplaintsSection;