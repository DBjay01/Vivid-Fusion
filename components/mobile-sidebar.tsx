"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { Sheet,SheetContent,SheetTrigger } from "./ui/sheet";

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) return null;
    return(
        <Sheet>
        <SheetTrigger>
        <Button size="icon" variant="ghost" className="md:hidden">
            <Menu />
        </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar></Sidebar>
        </SheetContent>
      </Sheet>
    );
}

export default MobileSidebar