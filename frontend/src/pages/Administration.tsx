import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Administration = () => {
  const siteAllotments = [
    {
      date: "24.03.25",
      title: "Allotment of alternative sites from Arkavathi Layout to Nada Prabhu Kempegowda Layout through randomization on 24.03.25",
      authority: "Under the Chairmanship of Hon'ble Chairman,Bangalore Development Authority.",
      items: [
        { slNo: 1, subject: "Arkavathi to NPKL(9*12)", download: "#" }
      ]
    },
    {
      date: "30.01.2025",
      title: "Allotment of alternative sites from Arkavathi Layout to Nada Prabhu Kempegowda Layout through randomization on 30.01.2025",
      authority: "Under the Chairmanship of Hon'ble Chairman,Bangalore Development Authority.",
      items: [
        { slNo: 1, subject: "Arkavathi to NPKL(6*9)", download: "#" },
        { slNo: 2, subject: "Arkavathi to NPKL(9*12)", download: "#" },
        { slNo: 3, subject: "Arkavathi to NPKL(12*18)", download: "#" },
        { slNo: 4, subject: "Arkavathi to NPKL(15*24)", download: "#" }
      ]
    },
    {
      date: "06.12.2024",
      title: "Allotment of alternative sites from Surabhi Seva Sangha Revenue to Nada Prabhu Kempegowda Layout through randomization on 06.12.2024",
      authority: "Under the Chairmanship of Hon'ble Commissioner, Bangalore Development Authority",
      items: [
        { slNo: 1, subject: "Surabhi Seva Sangha Revenue to NPKL(9*12)", download: "#" }
      ]
    },
    {
      date: "11.09.2024",
      title: "Allotment of alternative sites from Arkavathi Layout to Nada Prabhu Kempegowda Layout through randomization on 11.09.2024",
      authority: "Under the Chairmanship of Hon'ble Chairman,Bangalore Development Authority.",
      items: [
        { slNo: 1, subject: "Arkavathi to NPKL(6*9)", download: "#" },
        { slNo: 2, subject: "Arkavathi to NPKL(9*12)", download: "#" },
        { slNo: 3, subject: "Arkavathi to NPKL(12*18)", download: "#" },
        { slNo: 4, subject: "Arkavathi to NPKL(15*24)", download: "#" }
      ]
    }
  ];

  const governmentOrders = [
    {
      slNo: 1,
      subject: "Instructions regarding completion of auction site registration process within stipulated period.",
      date: "16.05.2023",
      language: "-",
      source: "-",
      download: "#"
    },
    {
      slNo: 2,
      subject: "Implementation of E-Office –Software in BDA.",
      date: "12.05.2023",
      language: "",
      source: "",
      download: "#"
    },
    {
      slNo: 3,
      subject: "Redressal of Public Grievances.",
      date: "16.01.2023",
      language: "",
      source: "",
      download: "#"
    },
    {
      slNo: 4,
      subject: "Implementation of E-Office in BDA.",
      date: "07.12.2022",
      language: "",
      source: "",
      download: "#"
    },
    {
      slNo: 5,
      subject: "Revision of maintenance charges levied along with property tax of residential complexes.",
      date: "09.11.2022",
      language: "",
      source: "",
      download: "#"
    },
    {
      slNo: 6,
      subject: "Fixation of rates for BDA Developed Housing Project.",
      date: "22.06.2022",
      language: "",
      source: "",
      download: "#"
    },
    {
      slNo: 7,
      subject: "Revision of rates in respect of Incentive Sites and Alternate Sites allotted in lieu of Revenue Sites.",
      date: "09.03.2021",
      language: "",
      source: "",
      download: "#"
    },
    {
      slNo: 8,
      subject: "Revision of rates for Khata Transfer fee, Application fee, Registration fee, Vacant site penalty and maintenance fee.",
      date: "",
      language: "",
      source: "",
      download: "#"
    }
  ];

  const arkavathiData = [
    {
      slNo: 1,
      subject: "Total extent of land notified in the Preliminary notification, with a graphical description by overlaying it with the village map/Google map/RMP etc.,",
      details: "PN 2003 - Total: 3339-12 acres covering 16 villages",
      pdf: "#",
      map: "#"
    },
    {
      slNo: 2,
      subject: "Total extent of land notified in the Final notification with a graphical description by overlaying it with the village map/Google map/RMP etc.,",
      details: "FN 2004: 2750-00 acres, FN 2014: 1766-07 acres",
      pdf: "#",
      map: "#"
    },
    {
      slNo: 3,
      subject: "Extent of land denotified with details of reasons for de-notification and copies of the denotifications with a graphical description",
      details: "Acre-544, Guntas-31",
      pdf: "#",
      map: "#"
    },
    {
      slNo: 4,
      subject: "Extent of land taken possession of with details of when possession was taken",
      details: "Complete possession details with notices and notifications",
      pdf: "#",
      map: "#"
    },
    {
      slNo: 5,
      subject: "Total extent of land handed over to the engineering department survey number wise",
      details: "Survey-wise handover details",
      pdf: "#",
      map: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Administration Section</h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              The Administration section is entrusted with the responsibility of all establishment and general administrative matters. 
              The section also handles all matters related to allotment of sites, flats and their post allotment work. 
              The functions also include assessment and collection of property tax for sites / buildings and collection of lease amount from commercial shops owned by the Authority.
            </p>
          </div>

          {/* Site Allotments */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-6">Site Allotment Details</h2>
            
            {siteAllotments.map((allotment, index) => (
              <Card key={index} className="w-full">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{allotment.title}</CardTitle>
                  <p className="text-muted-foreground">{allotment.authority}</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-20">Sl No</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead className="w-32">Download</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allotment.items.map((item) => (
                          <TableRow key={item.slNo}>
                            <TableCell className="font-medium">{item.slNo}</TableCell>
                            <TableCell>{item.subject}</TableCell>
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
            ))}
          </section>

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

          {/* Arkavathi Layout Information */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-6">Arkavathi Layout Information</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Sl.No</TableHead>
                        <TableHead className="min-w-[400px]">Subject</TableHead>
                        <TableHead className="min-w-[300px]">Details</TableHead>
                        <TableHead className="w-24">PDF</TableHead>
                        <TableHead className="w-24">MAP</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {arkavathiData.map((item) => (
                        <TableRow key={item.slNo}>
                          <TableCell className="font-medium">{item.slNo}</TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>{item.details}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Download className="h-4 w-4" />
                              Click Here
                            </Button>
                          </TableCell>
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

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Information regarding the list of land that are included in the Notified area of Arkavathi Layout and the list of Writ Petitions 
                  that are being considered by the Honorable Justice K.N Keshavanarayana Committee, established as per the order passed in 
                  Writ Petition No. 51929/2014 dated: 27/09/2021 by the Honorable High Court of Karnataka.
                </p>
                <p className="text-muted-foreground mb-4">
                  The Committee has commenced hearings on the aforementioned Writ Petition application as well as the applications received 
                  through the paper notification.
                </p>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Click Here
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Administration;