import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom"; // or "preact-router" if you use that


const RTIDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="px-2.5 py-2 text-[13px] font-semibold hover:bg-white/20 rounded-lg transition-all duration-200 hover:shadow-lg backdrop-blur-sm text-white flex items-center gap-1"
        >
          RTI
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-48 bg-white border shadow-lg z-50"
        align="start"
      >
      <DropdownMenuItem asChild>
  <Link
    to="/rti"
    className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
  >
    RTI Info
  </Link>
</DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <a
            href="https://rtionline.karnataka.gov.in/"
            className="w-full px-3 py-2 text-sm font-medium hover:bg-blue-50 cursor-pointer"
          >
            Online RTI
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RTIDropdown;