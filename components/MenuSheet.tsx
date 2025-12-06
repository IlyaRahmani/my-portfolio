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
import AppButton from "./AppButton";

export default function MenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AppButton type="icon">
          <Menu className="w-7 h-7" />
        </AppButton>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
        </SheetHeader>
            
                <MenuBar variant="mobile" />
      </SheetContent>
    </Sheet>
  );
}
