import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Contact = () => {
  const contactData = [
    {
      slNo: 1,
      name: "Sri N A HARIS, MLA",
      designation: "CHAIRMAN",
      contact: "23342716",
      email: "chmn@bdabangalore.org",
      fax: "23365036",
      address: "HEAD OFFICE, Bangalore Development Authority, Kumara Park West, T.Chowdaiah Road,Bengaluru - 560020."
    },
    {
      slNo: 2,
      name: "Sri Major Manivannan P, I.A.S",
      designation: "COMMISSIONER",
      contact: "23442273",
      email: "commissioner-bda@ka.gov.in",
      fax: "23345799",
      address: "HEAD OFFICE, Bangalore Development Authority, Kumara Park West, T.Chowdaiah Road,Bengaluru - 560020."
    },
    {
      slNo: 3,
      name: "C L SHIVAKUMAR , K.A.S",
      designation: "SECRETARY",
      contact: "23365151",
      email: "secy@bdabangalore.org",
      fax: "23340651",
      address: "",
      section: "ADMINISTRATION/ALLOTMENT DIVISION"
    },
    {
      slNo: 4,
      name: "MANJUNATH C , K.A.S",
      designation: "ADDITIONAL SECRETARY",
      contact: "23365151",
      email: "",
      fax: "23340651",
      address: ""
    },
    {
      slNo: 5,
      name: "UMESH D S,K.A.S",
      designation: "DEPUTY SECRETARY-1",
      contact: "23449993",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 6,
      name: "PRATIBHA R, K.A.S",
      designation: "DEPUTY SECRETARY-2",
      contact: "23449995",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 7,
      name: "VISHNU VARDHANA REDDY T S, K.A.S",
      designation: "DEPUTY SECRETARY-3",
      contact: "23449990",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 8,
      name: "G M Ravindra",
      designation: "DEPUTY SECRETARY-4",
      contact: "23449996",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 9,
      name: "SUMA R , K.A.S.",
      designation: "DEPUTY COMMISSIONER (LAND ACQUISITION)",
      contact: "23368614",
      email: "deputycommissionerbda@gmail.com",
      fax: "23368614",
      address: "",
      section: "LAND ACQUISITION DEPARTMENT"
    },
    {
      slNo: 10,
      name: "JAGADISH K.H , K.A.S.",
      designation: "DEPUTY COMMISSIONER (ADDITIONAL LAND ACQUISITION)",
      contact: "23368614",
      email: "",
      fax: "23368614",
      address: ""
    },
    {
      slNo: 11,
      name: "KRIPALINI G K, K.A.S",
      designation: "LAND ACQUISITION OFFICER",
      contact: "EXTN:221",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 12,
      name: "KRIPALINI G K, K.A.S(IN CHARGE)",
      designation: "ADDITIONAL LAND ACQUISITION OFFICER",
      contact: "EXTN:210",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 13,
      name: "MANJUNATH DOMBARA, K.A.S",
      designation: "SPECIAL LAND ACQUISITION OFFICER",
      contact: "EXTN:216",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 14,
      name: "KRIPALINI G K, K.A.S(IN CHARGE)",
      designation: "SPECIAL ADDITIONAL LAND ACQUISITION OFFICER",
      contact: "EXTN:214",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 15,
      name: "MANJUNATH DOMBARA, K.A.S(IN CHARGE)",
      designation: "ASSISTANT COMMISSIONER (RE-ALLOCATION & RE-ALLOCATION)",
      contact: "EXTN:288",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 16,
      name: "Dr. H R SHANTHARAJANNA , K.E.S",
      designation: "ENGINEER MEMBER",
      contact: "23340258",
      email: "embda@bdabangalore.org",
      fax: "23340641",
      address: "",
      section: "ENGINEERING SECTION"
    },
    {
      slNo: 17,
      name: "UMESH B R , K.E.S",
      designation: "ENGINEER OFFICER-1",
      contact: "EXTN:236",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 18,
      name: "SRI SATHISH KUMAR S, K.E.S",
      designation: "ENGINEER OFFICER-2",
      contact: "EXTN:235",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 19,
      name: "SRI MALIKARJUNA SWAMY S , K.E.S",
      designation: "ENGINEER OFFICER-3",
      contact: "EXTN:234",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 20,
      name: "L SHASIKUMAR, B.E.(Civil), M.U.R.P",
      designation: "TOWN PLAN MEMBER",
      contact: "23443206",
      email: "tpm@bdabangalore.org",
      fax: "23465529",
      address: "",
      section: "TOWN PLANNING SECTION"
    },
    {
      slNo: 21,
      name: "SANNAPPAYYA (IN CHARGE)",
      designation: "ADDITIONAL DIRECTOR",
      contact: "EXTN:287",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 22,
      name: "SANNAPPAYYA",
      designation: "JOINT DIRECTOR",
      contact: "EXTN:695",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 23,
      name: "HANUMANTA REDDY",
      designation: "JOINT DIRECTOR",
      contact: "EXTN:245",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 24,
      name: "SHANTHARAJU",
      designation: "JOINT DIRECTOR",
      contact: "EXTN:245",
      email: "",
      fax: "",
      address: ""
    },
    {
      slNo: 25,
      name: "YASHODA.R,K.A.S",
      designation: "T D R DEPARTMENT",
      contact: "EXTN:247",
      email: "estatetdr@gmail.com",
      fax: "",
      address: "",
      section: "ESTATE/T D R SECTION"
    }
  ];

  const renderSection = (sectionName: string, startIndex: number, endIndex: number) => {
    const sectionData = contactData.slice(startIndex, endIndex + 1);
    
    return (
      <div key={sectionName} className="mb-8">
        {sectionName && (
          <h3 className="text-xl font-semibold text-foreground mb-4 bg-muted p-3 rounded">
            {sectionName}
          </h3>
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">SL NO</TableHead>
                <TableHead className="min-w-[200px]">NAME</TableHead>
                <TableHead className="min-w-[200px]">DESIGNATION</TableHead>
                <TableHead className="w-32">CONTACT NUMBER</TableHead>
                <TableHead className="min-w-[200px]">E-MAIL</TableHead>
                <TableHead className="w-24">FAX</TableHead>
                <TableHead className="min-w-[300px]">ADDRESS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectionData.map((contact) => (
                <TableRow key={contact.slNo}>
                  <TableCell className="font-medium">{contact.slNo}</TableCell>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.designation}</TableCell>
                  <TableCell>{contact.contact}</TableCell>
                  <TableCell>
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                        {contact.email}
                      </a>
                    )}
                  </TableCell>
                  <TableCell>{contact.fax}</TableCell>
                  <TableCell>{contact.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Contact Us</h1>
          
          {/* Top Level Contacts */}
          {renderSection("", 0, 1)}
          
          {/* Administration/Allotment Division */}
          {renderSection("ADMINISTRATION/ALLOTMENT DIVISION", 2, 7)}
          
          {/* Land Acquisition Department */}
          {renderSection("LAND ACQUISITION DEPARTMENT", 8, 14)}
          
          {/* Engineering Section */}
          {renderSection("ENGINEERING SECTION", 15, 18)}
          
          {/* Town Planning Section */}
          {renderSection("TOWN PLANNING SECTION", 19, 23)}
          
          {/* Estate/TDR Section */}
          {renderSection("ESTATE/T D R SECTION", 24, 24)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;