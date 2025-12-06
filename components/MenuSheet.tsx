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
          <Menu size={25} />
        </AppButton>
      </SheetTrigger>

<SheetContent
  side="left"
  className="
    bg-white/10!
    !dark:bg-black/10
    backdrop-blur-2xl!
    border-white/20!
    !dark:border-white/10
    border-r
    duration-700
    ease-[cubic-bezier(0.22,1,0.36,1)]
  "
>        
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
        </SheetHeader>
            
                <MenuBar variant="mobile" />
      </SheetContent>
    </Sheet>
  );
}
