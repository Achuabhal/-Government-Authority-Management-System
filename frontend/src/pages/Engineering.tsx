import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Engineering = () => {
  const governmentOrders = [
    {
      slNo: 1,
      subject: "Duties of Tender inviting Authority",
      date: "23.05.2022",
      language: "English",
      source: "",
      download: "#"
    },
    {
      slNo: 2,
      subject: "Tender approval for works",
      date: "27.04.2022",
      language: "English",
      source: "",
      download: "#"
    },
    {
      slNo: 3,
      subject: "Fixing Time lines for tenders in e-procurement",
      date: "15.12.2021",
      language: "English",
      source: "",
      download: "#"
    },
    {
      slNo: 4,
      subject: "Cess for Plan Sanction, Commencement Certificate, Occupancy Certificate",
      date: "26.02.2020",
      language: "English",
      source: "",
      download: "#"
    },
    {
      slNo: 5,
      subject: "Fees for Plan Sanction, Commencement Certificate, Occupancy Certificate",
      date: "16.10.2015",
      language: "English",
      source: "",
      download: "#"
    },
    {
      slNo: 6,
      subject: "Karnataka Public works Departmental code-2014",
      date: "2014",
      language: "English",
      source: "",
      download: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Engineering Section</h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              The Engineering Department is primarily concerned with the execution of various developmental schemes in the layouts and also construction of infrastructure works. 
              The department also monitors the execution of water supply and underground drainage works in BDA layouts taken up by BWSSB and electrification works executed by BESCOM.
            </p>
          </div>

          {/* Government Notifications */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-6">Government Notification/Order</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Sl No</TableHead>
                        <TableHead className="min-w-[400px]">Subject</TableHead>
                        <TableHead className="w-32">Date</TableHead>
                        <TableHead className="w-24">Language</TableHead>
                        <TableHead className="w-24">Source</TableHead>
                        <TableHead className="w-32">Download</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {governmentOrders.map((order) => (
                        <TableRow key={order.slNo}>
                          <TableCell className="font-medium">{order.slNo}</TableCell>
                          <TableCell>{order.subject}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.language}</TableCell>
                          <TableCell>{order.source}</TableCell>
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
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Engineering;