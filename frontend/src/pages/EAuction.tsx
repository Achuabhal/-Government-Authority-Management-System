import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const EAuction = () => {
  const auctionNotifications = [
    {
      date: "17.09.2025",
      items: [
        {
          slNo: 1,
          subject: "E-Auction Notification",
          startDate: "17.09.2025",
          endDate: "06.10.2025",
          language: "English",
          source: "BDA"
        }
      ]
    },
    {
      date: "25.08.2025",
      items: [
        {
          slNo: 1,
          subject: "E-Auction Notification",
          startDate: "25.08.2025",
          endDate: "06.09.2025",
          language: "English",
          source: "BDA"
        },
        {
          slNo: 2,
          subject: "Geo-tag of the E-Auction Sites",
          startDate: "25.08.2025",
          endDate: "06.09.2025",
          language: "English",
          source: "BDA"
        },
        {
          slNo: 3,
          subject: "Google map link",
          startDate: "25.08.2025",
          endDate: "06.09.2025",
          language: "English",
          source: "BDA"
        }
      ]
    },
    {
      date: "11.08.2025",
      items: [
        {
          slNo: 1,
          subject: "E-Auction Notification",
          startDate: "11.08.2025",
          endDate: "25.08.2025",
          language: "English",
          source: "BDA"
        },
        {
          slNo: 2,
          subject: "Geo-tag of the E-Auction Sites",
          startDate: "11.08.2025",
          endDate: "25.08.2025",
          language: "English",
          source: "BDA"
        },
        {
          slNo: 3,
          subject: "Google map link",
          startDate: "11.08.2025",
          endDate: "25.08.2025",
          language: "English",
          source: "BDA"
        }
      ]
    },
    {
      date: "28.07.2025",
      items: [
        {
          slNo: 1,
          subject: "E-Auction Notification",
          startDate: "28.07.2025",
          endDate: "18.08.2025",
          language: "English",
          source: "BDA"
        }
      ]
    },
    {
      date: "01.07.2025",
      items: [
        {
          slNo: 1,
          subject: "E-Auction Notification",
          startDate: "14.07.2025",
          endDate: "30.07.2025",
          language: "English",
          source: "BDA"
        },
        {
          slNo: 2,
          subject: "E-Auction Corrigendum",
          startDate: "14.07.2025",
          endDate: "30.07.2025",
          language: "English",
          source: "BDA"
        }
      ]
    },
    {
      date: "01.07.2025",
      items: [
        {
          slNo: 1,
          subject: "E-Auction Notification",
          startDate: "01.07.2025",
          endDate: "19.07.2025",
          language: "English",
          source: "BDA"
        },
        {
          slNo: 2,
          subject: "E-Auction Terms and Conditions",
          startDate: "01.07.2025",
          endDate: "19.07.2025",
          language: "English",
          source: "BDA"
        },
        {
          slNo: 3,
          subject: "Geo-tag of the E-Auction Sites",
          startDate: "01.07.2025",
          endDate: "19.07.2025",
          language: "English",
          source: "BDA"
        },
        {
          slNo: 4,
          subject: "Google map link",
          startDate: "01.07.2025",
          endDate: "19.07.2025",
          language: "English",
          source: "BDA"
        }
      ]
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">E-Auction</h1>
            <p className="text-muted-foreground text-lg">
              BDA E-Auction notifications and related documents
            </p>
          </div>

          <div className="space-y-8">
            {auctionNotifications.map((notification, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    E-Auction Notification Dated: {notification.date}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Sl No</TableHead>
                          <TableHead className="min-w-[200px]">Subject</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Language</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead className="w-32">Download</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {notification.items.map((item) => (
                          <TableRow key={item.slNo}>
                            <TableCell className="font-medium">{item.slNo}</TableCell>
                            <TableCell>{item.subject}</TableCell>
                            <TableCell>{item.startDate}</TableCell>
                            <TableCell>{item.endDate}</TableCell>
                            <TableCell>{item.language}</TableCell>
                            <TableCell>{item.source}</TableCell>
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EAuction;