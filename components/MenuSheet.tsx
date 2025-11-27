"use client";

import MenuBar from "./MenuBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function MenuSheet() {
  return (
    <Sheet>
      {/* The trigger MUST BE inside <SheetTrigger /> */}
      <SheetTrigger asChild>
        <button>
          <Menu className="w-7 h-7" />
        </button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
        </SheetHeader>
            
                <MenuBar />
      </SheetContent>
    </Sheet>
  );
}
