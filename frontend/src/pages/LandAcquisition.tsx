import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const LandAcquisition = () => {
  const notifications = [
    {
      slNo: "1.1",
      subject: "Arkavathy Layout",
      date: "2004",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "1.2",
      subject: "Arkavathy Layout",
      date: "2014",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "2.1",
      subject: "Banashankari and Mysore Road Layout - Stage 2.",
      date: "1971",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "2.2",
      subject: "Banashankari Layout - Stage 3.",
      date: "1971",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "2.3",
      subject: "Banashankari Layout - Stage 4 - Further Extension - Block 'H' 'T' 'B'",
      date: "-",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "2.4",
      subject: "Banashankari Layout - Stage 5.",
      date: "1997",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "2.5",
      subject: "Banashankari Layout - Stage 6.",
      date: "2001",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "2.6",
      subject: "Banashankari Layout - Stage 6 - Further Extension.",
      date: "2003",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "3",
      subject: "Nada Prabhu Kempe Gowda Layout",
      date: "2010",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "4.1",
      subject: "Sir M Vishweshwaraih Layout - Block 1 to 6",
      date: "2002",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "4.2",
      subject: "Sir M Vishweshwaraih Layout - Further Extension - Block 7 to 9",
      date: "2010",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "5",
      subject: "Binnamangala Layout",
      date: "-",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "6",
      subject: "Cambridge Road Layout",
      date: "-",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "7",
      subject: "Dommaluru Layout",
      date: "1960",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "8.1",
      subject: "HAL Layout - Stage 2",
      date: "1964",
      language: "",
      source: "LAQ",
    },
    {
      slNo: "8.2",
      subject: "HAL Layout - Stage 3",
      date: "1971",
      language: "",
      source: "LAQ",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Land Acquisition Section</h1>
            <div className="bg-muted/20 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-3 text-foreground">Land Acquisition Section:</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Land Acquisition section acquires land for various developmental schemes as approved by the Government of Karnataka under Section 35 and Section 36 of Bangalore Development Authority Act, 1976. After acquiring the land, the same will be handed over to the Engineering section of the Authority for execution of the project / developmental schemes as approved by the Government.
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
                      <TableHead className="w-20">Sl No</TableHead>
                      <TableHead className="min-w-[300px]">Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="w-32">Download</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.map((notification, index) => (
                      <TableRow key={index}>
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

export default LandAcquisition;