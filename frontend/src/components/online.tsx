import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Online = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="px-2.5 py-2 text-[13px] font-semibold hover:bg-white/20 rounded-lg transition-all duration-200 hover:shadow-lg backdrop-blur-sm text-white flex items-center gap-1"
        >
          ONLINE SERVICES
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-white border shadow-lg z-50"
        align="start"
      >

        <DropdownMenuItem asChild>
          <a
            href="https://gisbda.karnataka.gov.in/BDALandManagement/gisapplication/login.jsp"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            GIS Information
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href="https://ipgrs.karnataka.gov.in/"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            Integrated Public Grievance Redressal System
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href="https://sakala.kar.nic.in/procedure.aspx"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            Sakala Services
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href="https://housing.bdabangalore.org/"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            Housing (Flats & Villas)
          </a>
        </DropdownMenuItem>
         <DropdownMenuItem asChild>
          <a
            href="https://bda.karnataka.gov.in/grievance/public"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            Public Grievance
          </a>
        </DropdownMenuItem>

         <DropdownMenuItem asChild>
          <a
            href="https://bda.karnataka.gov.in/grievance/public/dept_login/en"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            Public Grievance Officers login
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href="https://institute.bdabangalore.org/#/signin"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            Purchase Leased CA Sites
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href="https://app.bda.karnataka.gov.in/bdaptax-citizen/login"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            BDA Property Tax Portal
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href="https://app.bda.karnataka.gov.in/bdabt-citizen/login"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            DSKL Betterment Tax Payment
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href="https://app.bda.karnataka.gov.in/bdaappt-citizen/"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            Resolve Your Issues
          </a>
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Online;
