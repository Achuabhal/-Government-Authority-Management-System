import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RTITableData {
  slNo: number;
  subject: string;
  date?: string;
  language: string;
  source: string;
}

const RTI = () => {
  const publicInfoOfficers: RTITableData[] = [
    {
      slNo: 1,
      subject: "Public Information Officers List",
      date: "",
      language: "En/Kn",
      source: "BDA"
    }
  ];

  const rtiDocuments: RTITableData[] = [
    {
      slNo: 1,
      subject: "RTI 4(1)(A)",
      date: "",
      language: "En/Kn",
      source: "BDA"
    },
    {
      slNo: 2,
      subject: "RTI 4(1)(B)",
      date: "",
      language: "En/Kn",
      source: "BDA"
    },
    {
      slNo: 3,
      subject: "RTI 26(3)(B)",
      date: "",
      language: "En/Kn",
      source: "BDA"
    },
    {
      slNo: 4,
      subject: "RTI 4(1)(A)",
      date: "",
      language: "En/Kn",
      source: "BDA"
    },
    {
      slNo: 5,
      subject: "RTI 4(1)(B)",
      date: "",
      language: "En/Kn",
      source: "BDA"
    }
  ];

  const appointmentDocs: RTITableData[] = [
    {
      slNo: 1,
      subject: "OM - Appointment of Nodal Officer for Online RTI Application.",
      date: "11/05/2023",
      language: "En/Kn",
      source: "BDA"
    },
    {
      slNo: 2,
      subject: "OM - Usage of Online RTI Application.",
      date: "03/06/2023",
      language: "En/Kn",
      source: "BDA"
    }
  ];

  const TableComponent = ({ title, data }: { title: string, data: RTITableData[] }) => (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-gray-300">
          <thead>
            <tr className="bg-primary/10">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Sl No</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Subject</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Date</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Language</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Source</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Download</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={`${item.slNo}-${item.subject}`} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3">{item.slNo}</td>
                <td className="border border-gray-300 px-4 py-3">{item.subject}</td>
                <td className="border border-gray-300 px-4 py-3">{item.date}</td>
                <td className="border border-gray-300 px-4 py-3">{item.language}</td>
                <td className="border border-gray-300 px-4 py-3">{item.source}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary hover:text-white transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Right to Information (RTI)</h1>
          <p className="text-gray-600">Access information and documents under the Right to Information Act</p>
        </div>

        <div className="space-y-8">
          <TableComponent 
            title="Public Information Officers"
            data={publicInfoOfficers} 
          />
          
          <TableComponent 
            title="RTI Documents"
            data={rtiDocuments} 
          />
          
          <TableComponent 
            title="Office Memorandums & Appointments"
            data={appointmentDocs} 
          />
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About RTI</h2>
          <p className="text-gray-700 leading-relaxed">
            The Right to Information Act, 2005 is an Act of the Parliament of India which sets out the rules and procedures 
            regarding citizens' right to information. It replaced the Freedom of Information Act, 2002. Under the provisions 
            of RTI Act, any citizen of India may request information from a "public authority" which is required to reply 
            expeditiously or within thirty days.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RTI;