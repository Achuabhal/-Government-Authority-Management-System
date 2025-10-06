import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Clock } from "lucide-react";

const CATdr = () => {
  const govNotifications = [
    {
      slNo: 1,
      subject: "Govt Circular Reg granting of DRC's in lieu of monetary compensation in such cases wherein Hon. Courts have directed the concerned agencies to pay monetary compensation for lands and regarding cases pending at Hon. High Court/ Supreme Court.",
      date: "15.10.2022",
      language: "English",
      source: "TDR",
    },
    {
      slNo: 2,
      subject: "Granting of Development Rights Certificate (DRC) to land owners in cases initiated prior to the commencement of the Karnataka Town and Country Planning (Amendment) Act, 2021.",
      date: "23.09.2022",
      language: "English",
      source: "TDR",
    },
  ];

  const drcCertificates = [
    {
      slNo: 1,
      subject: "List of Utilisation certificates issued by TDR Cell.",
      date: "31.05.2025",
      language: "English",
      source: "TDR",
    },
    {
      slNo: 2,
      subject: "List of DRC certificates issued by TDR Cell.",
      date: "31.05.2025",
      language: "English",
      source: "TDR",
    },
  ];

  const caSiteDetails = [
    {
      slNo: 1,
      subject: "Civil Amenity Sites (CA Sites) Notification 2025-26",
      date: "04.04.2025",
      language: "English",
      source: "CA Sites",
    },
    {
      slNo: 2,
      subject: "Civic Amenity Sites General Terms and Conditions 2025-26",
      date: "04.04.2025",
      language: "Kannada",
      source: "CA Sites",
    },
    {
      slNo: 3,
      subject: "Civic Amenity Sites Allotment Rules-1989",
      date: "04.04.2025",
      language: "English",
      source: "CA Sites",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">CA and TDR</h1>
            
            {/* About Section */}
            <div className="bg-muted/20 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-3 text-foreground">About CA and TDR:</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Development Rights Certificates (DRC's) in lieu of Monetary compensation for lands acquired by the public authority for public purposes is being issued at TDR Cell of Estate Office as per the section 14-B of K.T.C.P (Amendment) Act, 2021. Transfer of Development Rights Certificates (TDRC's) and Utilization Certificates (UC's) are also issued. The "Veracity" of DRC's issued by BBMP before commencement of K.T.C.P (Amendment) Act, 2015 as per the K.T.C.P (Benefit of Development Rights) Rules, 2016 is also being verified and certified here.
              </p>
            </div>

            {/* Public Visiting Hours */}
            <div className="bg-primary/10 p-4 rounded-lg mb-8 border-l-4 border-l-primary">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Public Visiting Hours:</h3>
              </div>
              <p className="text-muted-foreground font-medium">3:00 pm to 5:00 pm (Working Days)</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Government Notifications */}
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
                        <TableHead className="min-w-[400px]">Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="w-32">Download</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {govNotifications.map((notification) => (
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

            {/* DRC & UC Certificate Details */}
            <Card className="border-l-4 border-l-secondary">
              <CardHeader>
                <CardTitle className="text-xl text-secondary">
                  DRC & UC Certificate Details
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
                      {drcCertificates.map((certificate) => (
                        <TableRow key={certificate.slNo}>
                          <TableCell className="font-medium">{certificate.slNo}</TableCell>
                          <TableCell>{certificate.subject}</TableCell>
                          <TableCell>{certificate.date}</TableCell>
                          <TableCell>{certificate.language}</TableCell>
                          <TableCell>{certificate.source}</TableCell>
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

            {/* CA Site Details */}
            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <CardTitle className="text-xl text-accent">
                  CA Site Details
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
                      {caSiteDetails.map((site) => (
                        <TableRow key={site.slNo}>
                          <TableCell className="font-medium">{site.slNo}</TableCell>
                          <TableCell>{site.subject}</TableCell>
                          <TableCell>{site.date}</TableCell>
                          <TableCell>{site.language}</TableCell>
                          <TableCell>{site.source}</TableCell>
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
      </div>
      <Footer />
    </>
  );
};

export default CATdr;