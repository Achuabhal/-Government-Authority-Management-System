import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TownPlanning = () => {
  const masterPlans = [
    {
      slNo: 1,
      description: "Out line Development Plan (ODP)",
      dateOfApproval: "22/05/1972",
      conurbationLimit: "220",
      agricultureZone: "280",
      localPlanningArea: "500"
    },
    {
      slNo: 2,
      description: "Comprehensive Development Plan (CDP)",
      dateOfApproval: "12/10/1984",
      conurbationLimit: "449",
      agricultureZone: "830",
      localPlanningArea: "1279"
    },
    {
      slNo: 3,
      description: "Revised Comprehensive Development Plan (RCDP)",
      dateOfApproval: "05/01/1995",
      conurbationLimit: "597",
      agricultureZone: "682",
      localPlanningArea: "1279"
    },
    {
      slNo: 4,
      description: "Revised Master Plan (RMP-2015)",
      dateOfApproval: "25/06/2007",
      conurbationLimit: "800",
      agricultureZone: "419.50",
      localPlanningArea: "1219.50 (Excluding BMICAPA Area)"
    },
    {
      slNo: 5,
      description: "Draft Revised Master Plan(RMP 2031)",
      dateOfApproval: "22/11/2017",
      conurbationLimit: "884.31",
      agricultureZone: "322.66",
      localPlanningArea: "1206.97 (Excluding BMICAPA Area)"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-6">Town Planning Section</h1>
          </div>

          {/* About Section */}
          <section className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">About Town Planning Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The city of Bangalore was a planned city earlier. The Bangalore Development Committee was constituted in the year 1952 by the Government to work out a Development Plan for Bangalore. This committee prepared a report indicating the growth and development of Bangalore. Subsequently, in the year 1961, the Bangalore Metropolitan Planning Board(BMPB) was constituted to prepare a Development Plan for Bangalore considering the trend of growth of Bangalore. The BMPB prepared an Outline Development Plan for Bangalore which was submitted to Government in February 1963.
                </p>
                
                <p>
                  The Town & Country Planning Act, of 1961 was enacted to enable the preparation of Development Plans for the settlements in the State of Karnataka. This Act came into force on 15/01/1965. The State Government declared the Bangalore Local Planning Area in the year 1966 according to section 4(a) of the Act. This area was the same as the Metropolitan Area proposed by the Bangalore Metropolitan Planning Board.
                </p>
                
                <p>
                  A city Planning Authority was constituted on 8/8/1967 for Bangalore metropolitan area under section 4(c) of the Act to prepare a Development Plan for the Bangalore Metropolitan area according to the provisions of the Act. The Planning Authority held its first meeting on 4/12/1967 and submitted the Outline Development Plan(ODP)previously prepared by the Metropolitan Planning Board, for provisional approval under the Act. The Outline Development Plan was provisionally approved by Government and was published as per section 13(1) of the Act. The Planning Authority modified the ODP, which was finally approved by the State Government in GO.No.HMA 38 MNP 68 dt 22.5.1972
                </p>
                
                <p>
                  The Bangalore Development Authority was constituted by the government under a special act called the Bangalore Development Authority Act,1976 which came into force on the 20th day of December 1975. This Authority was inaugurated on 16/1/1976.The Bangalore Development Authority is the statutory Planning Authority under the provisions of section 2-7(a)(i) and (81-B)of Karnataka Town and Country Planning Act,1961 for the Local Planning Area of Bangalore.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Master Plans Table */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-6">Details of Master Plans Proposed by BDA</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Sl No</TableHead>
                        <TableHead className="min-w-[300px]">Description</TableHead>
                        <TableHead className="w-32">Date of Approval</TableHead>
                        <TableHead className="w-40">Conurbation Limit in Sqkm</TableHead>
                        <TableHead className="w-40">Agriculture zone in Sqkm</TableHead>
                        <TableHead className="min-w-[200px]">Local Planning Area in Sqkm</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {masterPlans.map((plan) => (
                        <TableRow key={plan.slNo}>
                          <TableCell className="font-medium">{plan.slNo}</TableCell>
                          <TableCell className="font-medium">{plan.description}</TableCell>
                          <TableCell>{plan.dateOfApproval}</TableCell>
                          <TableCell>{plan.conurbationLimit}</TableCell>
                          <TableCell>{plan.agricultureZone}</TableCell>
                          <TableCell>{plan.localPlanningArea}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Placeholder Sections */}
          <section className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Annual Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">Data will be added later</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Organisation Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">Data will be added later</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Act / Rules / Amendments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">Data will be added later</p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TownPlanning;