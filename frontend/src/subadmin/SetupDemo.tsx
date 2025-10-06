import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// This component sets up demo data for testing
const SetupDemo = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Check if demo data is already set up
    const existingEmails = localStorage.getItem('adminEmails');
    
    if (!existingEmails) {
      // Create demo super admin
      const demoAdmins = [
        {
          id: "demo-super-admin",
          email: "superadmin@bda.gov.in",
          role: "super",
          addedAt: new Date().toISOString(),
          otp: "123456"
        },
        {
          id: "demo-sub-admin",
          email: "subadmin@bda.gov.in", 
          role: "sub",
          addedAt: new Date().toISOString(),
          otp: "654321"
        }
      ];

      localStorage.setItem('adminEmails', JSON.stringify(demoAdmins));
      
      toast({
        title: "Demo Data Setup",
        description: "Demo admin accounts created. Use superadmin@bda.gov.in (OTP: 123456) or subadmin@bda.gov.in (OTP: 654321)",
        duration: 8000,
      });
    }
  }, [toast]);

  return null; // This component doesn't render anything
};

export default SetupDemo;
