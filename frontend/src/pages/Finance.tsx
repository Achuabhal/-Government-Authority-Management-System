import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Finance = () => {
  const notifications = [
    {
      slNo: 1,
      subject: "Revision of CA Sites Allotment rates.",
      date: "",
      language: "Kannada",
      source: "",
    },
    {
      slNo: 2,
      subject: "Revision of maintenance Charges on flats under BDA limits.",
      date: "",
      language: "Kannada",
      source: "",
    },
    {
      slNo: 3,
      subject: "Amendment to BDA Act Rule 38D.",
      date: "",
      language: "Kannada",
      source: "",
    },
    {
      slNo: 4,
      subject: "Fixation of Allotment rates for marginal land adjecent to properties allotted/ Auctioned by BDA.",
      date: "",
      language: "Kannada",
      source: "",
    },
    {
      slNo: 5,
      subject: "Revision of Khata transfer fee, Application fee, Registration fee, Vacant Site Penalty and Maintenance fee by BDA.",
      date: "",
      language: "Kannada",
      source: "",
    },
    {
      slNo: 6,
      subject: "5% Rebate on Property Tax by BDA.",
      date: "",
      language: "Kannada",
      source: "",
    },
    {
      slNo: 7,
      subject: "Incentive site Rate Fixation.",
      date: "",
      language: "Kannada",
      source: "",
    },
    {
      slNo: 8,
      subject: "Alternate site rate fixation circular.",
      date: "",
      language: "Kannada",
      source: "",
    },
    {
      slNo: 9,
      subject: "Slum Sites Rate Fixation.",
      date: "",
      language: "Kannada",
      source: "",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Finance Section</h1>
            <div className="bg-muted/20 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-3 text-foreground">About Finance Section:</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Finance Section renders advice to the Authority on various financial issues and is also entrusted with the responsibility for maintenance of the accounts of the Authority. This Department also oversees the demand, collection and balance of dues to the Authority.
              </p>
            </div>
          </div>

          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Govt.Notification/Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Sl No</TableHead>
                      <TableHead className="min-w-[300px]">Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="w-32">Download</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.map((notification) => (
                      <TableRow key={notification.slNo}>
                        <TableCell className="font-medium">{notification.slNo}</TableCell>
                        <TableCell>{notification.subject}</TableCell>
                        <TableCell>{notification.date}</TableCell>
                        <TableCell>{notification.language}</TableCell>
                        <TableCell>{notification.source}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Click Here
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Finance;