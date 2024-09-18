import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";



export const Navbar = async () => {
    return (
      
      <div className="flex items-center p-4">
        <MobileSidebar></MobileSidebar>
        <div className="flex w-full justify-end">
            <UserButton afterSignOutUrl="/"></UserButton>
        </div>
      </div>
     
    );
  };
  