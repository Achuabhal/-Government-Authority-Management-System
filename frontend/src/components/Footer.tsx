import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Footer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const policies = [
    "Copyright Policy",
    "Security Policy", 
    "Privacy Policy",
    "Screen Reader Access",
    "Hyperlinking Policy",
    "Help",
    "Terms & Conditions",
    "Guidelines", 
    "Disclaimer"
  ];

  const handlePolicyClick = (policy: string) => {
    if (policy === "Copyright Policy") {
      setIsDialogOpen(true);
    }
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Policies & Guidelines */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Policies & Guidelines</h3>
            <div className="grid grid-cols-2 gap-2">
              {policies.slice(0, 6).map((policy, index) => (
                <Button 
                  key={index} 
                  variant="ghost" 
                  className="justify-start text-gray-300 hover:text-white hover:bg-gray-700 p-2 h-auto text-sm"
                  onClick={() => handlePolicyClick(policy)}
                >
                  {policy}
                </Button>
              ))}
            </div>
          </div>

          {/* Additional Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Additional Information</h3>
            <div className="space-y-2">
              {policies.slice(6).map((policy, index) => (
                <Button key={index} variant="ghost" className="justify-start text-gray-300 hover:text-white hover:bg-gray-700 p-2 h-auto text-sm w-full">
                  {policy}
                </Button>
              ))}
            </div>
          </div>

          {/* Visitor Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Statistics</h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">50,534</p>
                <p className="text-gray-300 text-sm">Visitor Count</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              <p>Development Version: CeG/KRN 3.0</p>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-600 mb-6" />

        {/* Important Notice */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-300 leading-relaxed">
            Please note that this page also provides links to the websites / web pages of Govt. Ministries/Departments/Organisations. 
            The content of these websites are owned by the respective organisations and they may be contacted for any further information or suggestion.
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="text-center text-sm text-gray-300 space-y-2">
          <p>Content owned by: <span className="text-white">Bangalore Development Authority, Government of Karnataka.</span></p>
          <p>
            Contact: <a href="tel:9483166622" className="text-white hover:underline">9483166622</a>
            <span className="mx-2">|</span>
            <a href="https://bda.karnataka.gov.in" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">bda.karnataka.gov.in</a>
          </p>
          <p>
            Designed, Developed & Hosted By: <span className="text-primary">Bangalore Development Authority</span>
          </p>
        </div>
      </div>

      {/* Copyright Policy Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Copyright Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                Copyright policy (if the published information is available free of any charge)
              </h3>
              <div className="space-y-3">
                <p>
                  <strong>1.</strong> Information featured on this website can be re-published in any media form free of any charge only with prior permission from us(CeG) or concerned respective authority which is owning the website, through email.
                </p>
                <p>
                  <strong>2.</strong> Information can be republished as it is available and not to be used in a distorted or misleading manner.
                </p>
                <p>
                  <strong>3.</strong> Where the material is being published or suggested to others, the source must be prominently acknowledged.
                </p>
                <p>
                  <strong>4.</strong> However, the permission to reproduce this material does not extend to any material on this site, which is explicitly identified as being the copyright of a third party.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                Copyright policy (if there is a provision to reuse published information)
              </h3>
              <div className="space-y-3">
                <p>
                  <strong>1)</strong> The information published on the website comes under copyright policy and obtaining authorization for their republish is a pre-requisite.
                </p>
                <p>
                  <strong>2)</strong> To get permission one can mail to info@bda.karnataka.gov.in
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;