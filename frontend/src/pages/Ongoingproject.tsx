import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const OnlineServices = () => {
  const npklPlans = [
    { id: 1, subject: "Nadaprabhu Kempegowda Layout Plan(Full)", date: "", language: "English", source: "EM Section" },
    { id: 2, subject: "Nadaprabhu Kempegowda Layout Block 1 Plan", date: "", language: "English", source: "EM Section" },
    { id: 3, subject: "Nadaprabhu Kempegowda Layout Block 2 Plan", date: "", language: "English", source: "EM Section" },
    { id: 4, subject: "Nadaprabhu Kempegowda Layout Block 3 Plan", date: "", language: "English", source: "EM Section" },
    { id: 5, subject: "Nadaprabhu Kempegowda Layout Block 4 Plan", date: "", language: "English", source: "EM Section" },
    { id: 6, subject: "Nadaprabhu Kempegowda Layout Block 5 Plan", date: "", language: "English", source: "EM Section" },
    { id: 7, subject: "Nadaprabhu Kempegowda Layout Block 6 Plan", date: "", language: "English", source: "EM Section" },
        { id: 8, subject: "Nadaprabhu Kempegowda Layout Block 7 Plan", date: "", language: "English", source: "EM Section" },
    { id: 9, subject: "Nadaprabhu Kempegowda Layout Block 8 Plan", date: "", language: "English", source: "EM Section" },
    { id: 10, subject: "Nadaprabhu Kempegowda Layout Block 9 (Kenchanpura) Plan", date: "", language: "English", source: "EM Section" },
    { id: 11, subject: "Nadaprabhu Kempegowda Layout Block 9 (Seegehalli) Layout Plan", date: "", language: "English", source: "EM Section" },

  ];

  const progressReports = [
    { id: 1, subject: "NPKL Progress Report June 2025", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/June 2025 LAYOUT PROGRESS_0001_0001.pdf" },
    { id: 2, subject: "Major Arterial Road (MAR) Progress Report June 2025", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/Major Arterial Road (MAR) Progress Report June 2025.pdf" },
    { id: 3, subject: "6-NPKL(WS&UGD) Division Progress Report for the month of June-2025 RERA", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/6-NPKL(WS&UGD) Division Progress Report for the month of June-2025  RERA-67.pdf" },
    { id: 4, subject: "6-NPKL(WS&UGD) Division Progress Report for the month of June-2025 EDP", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/6-NPKL(WS&UGD) Division Progress Report for the month of June-2025 EDP-68.pdf" },
    { id: 5, subject: "Major Arterial Road (MAR) Progress Report May-2025", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/Major Arterial Road (MAR) Progress Report May-2025.pdf" },
    { id: 6, subject: "NPKL Progress report May-2025", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/NPKL Progress report May-2025.pdf" },
    { id: 7, subject: "Major Arterial Road (MAR) Progress Report April-2025", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/Major Arterial Road (MAR) Progress Report April-2025.pdf" },
    { id: 8, subject: "NPKL Progress report April-2025", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/NPKL Progress report April-2025.pdf" },
    { id: 9, subject: "Major Arterial Road (MAR) Progress Report March-2025", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/Major Arterial Road (MAR) Progress Report March-2025.pdf" },
    { id: 10, subject: "NPKL Progress report March-2025", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/NPKL Progress report March-2025.pdf" },
    { id: 11, subject: "Major Arterial Road (MAR) Progress Report February-2025", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/Major Arterial Road (MAR) Progress Report February-2025.pdf" },
    { id: 12, subject: "NPKL Progress report February-2025", date: "", language: "English", source: "EM Section", link: "Click Here", pdfFile: "/NPKL/NPKL Progress report February-2025.pdf" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Online Services</h1>
          <p className="text-gray-600">Access NPKL plans and progress reports</p>
        </div>

        {/* NPKL Plan Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">NPKL Plan</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Sl No</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Subject</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Language</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Source</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Download</th>
                </tr>
              </thead>
              <tbody>
                {npklPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{plan.id}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{plan.subject}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">{plan.date}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">{plan.language}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">{plan.source}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* NPKL Progress Report Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">NPKL Progress Report</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Sl No</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Subject</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Language</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Source</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Download</th>
                </tr>
              </thead>
              <tbody>
                {progressReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{report.id}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{report.subject}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">{report.date}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">{report.language}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">{report.source}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-blue-600 hover:text-blue-800"
                        onClick={() => window.open(report.pdfFile, '_blank')}
                      >
                        {report.link}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OnlineServices;