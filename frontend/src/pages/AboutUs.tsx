import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const AboutUs = () => {
  const actsRules = [
    {
      slNo: 1,
      title: "The Bangalore Development Authority Act, 1976",
      date: "1976",
      language: "En/Kn",
      source: "UDD 267 MNJ 2017",
      download: "Click Here",
      pdfFile: "/1976.pdf"
    },
    {
      slNo: 2,
      title: "The Bangalore Development Authority (Allotment of sites) (Amendment) Rules, 2017.",
      date: "17 August 2017",
      language: "En/Kn",
      source: "UDD 267 MNJ 2017",
      download: "Click Here",
      pdfFile: "/2017.pdf"
    },
    {
      slNo: 3,
      title: "The Bangalore Development Authority (Allotment of Sites) (Amendment) Rules, 2018.",
      date: "2018",
      language: "En/Kn",
      source: "BDA",
      download: "Click Here",
      pdfFile: "/2018.pdf"
    },
    {
      slNo: 4,
      title: "The Bangalore Development Authority (Allotment of unauthorised site with building) Rules, 2020.",
      date: "21 July 2020",
      language: "En/Kn",
      source: "UDD 91 MNJ 2020 (E)",
      download: "Click Here",
      pdfFile: "/2020.pdf"
    }
  ];

  const annualReports = [
    {
      slNo: 1,
      subject: "Annual Report 2020-21",
      date: "",
      language: "Kannada/English",
      source: "BDA",
      download: "Click Here"
    },
    {
      slNo: 2,
      subject: "Annual Report 2019-20",
      date: "",
      language: "Kannada/English",
      source: "BDA",
      download: "Click Here"
    },
    {
      slNo: 3,
      subject: "Annual Report 2018-19",
      date: "",
      language: "Kannada/English",
      source: "BDA",
      download: "Click Here"
    },
    {
      slNo: 4,
      subject: "Annual Report 2017-18",
      date: "",
      language: "Kannada/English",
      source: "BDA",
      download: "Click Here"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Vision and Mission Section */}
          <Card>
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-primary mb-6">Vision and Mission</h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  To transform Bengaluru to an ideal global destination with high quality infrastructure, better quality of life by ensuring sustainable and planned development based on effective monitoring, regulation, through participatory and innovative approach.
                </p>
                <p>
                  Plan, regulate, control, monitor and facilitate urban development in Bangalore Metropolitan Area, to ensure sustainable and orderly growth.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* About BDA Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">About BDA</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Bangalore Development Authority (BDA) came into being with effect from 6th January 1976 under a separate Act of the State Legislature viz. the BDA Act 1976. This Authority combined in itself the Planning functions of the City Planning Authority and the developmental functions of the erstwhile CITB.
                </p>
                <p>
                  The Bangalore Development Authority came into existence in 1976 as a successor to the erstwhile City Improvement Trust Board. Development of Bangalore in a planned manner, creating quality infrastructure, provision of sites and services and catering to the housing needs of the underprivileged are the focus areas of the BDA.
                </p>
                <p>
                  Since inception, the BDA has allotted 76,000 sites to individuals for construction of residential dwellings. In addition, more than 800 civic amenity sites have been given for use by various public utilities, as also organisations, catering to the felt needs of the particular locality.
                </p>
                <p>
                  B.D.A. Cadre and Recruitment Rules have been revised and sent to Government for approval during April 2001.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Organisation Structure Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Organisation Structure</h2>
              <div className="flex justify-center">
                <img
                  src="https://i.postimg.cc/XYMgnkvn/organization.png"
                  alt="Organization Structure"
                  className="rounded-lg shadow-md object-contain w-full h-auto max-h-[600px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Acts / Rules Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Act / Rules</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold">Sl No</th>
                      <th className="text-left p-3 font-semibold">Acts and Rules</th>
                      <th className="text-left p-3 font-semibold">Date</th>
                      <th className="text-left p-3 font-semibold">Language</th>
                      <th className="text-left p-3 font-semibold">Source</th>
                      <th className="text-left p-3 font-semibold">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actsRules.map((item) => (
                      <tr key={item.slNo} className="border-b hover:bg-muted/30">
                        <td className="p-3">{item.slNo}</td>
                        <td className="p-3">{item.title}</td>
                        <td className="p-3">{item.date}</td>
                        <td className="p-3">{item.language}</td>
                        <td className="p-3">{item.source}</td>
                        <td className="p-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-2"
                            onClick={() => window.open(item.pdfFile, '_blank')}
                          >
                            <Download className="h-4 w-4" />
                            {item.download}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Annual Reports Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Annual Reports</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold">Sl No</th>
                      <th className="text-left p-3 font-semibold">Subject</th>
                      <th className="text-left p-3 font-semibold">Date</th>
                      <th className="text-left p-3 font-semibold">Language</th>
                      <th className="text-left p-3 font-semibold">Source</th>
                      <th className="text-left p-3 font-semibold">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annualReports.map((item) => (
                      <tr key={item.slNo} className="border-b hover:bg-muted/30">
                        <td className="p-3">{item.slNo}</td>
                        <td className="p-3">{item.subject}</td>
                        <td className="p-3">{item.date}</td>
                        <td className="p-3">{item.language}</td>
                        <td className="p-3">{item.source}</td>
                        <td className="p-3">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            {item.download}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;