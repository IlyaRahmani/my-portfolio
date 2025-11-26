import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { User } from "lucide-react";
import AppButton from "./AppButton";

// 👇 Add the type here
type UserType = {
  name: string;
};

export default function ProfileSheet() {
  // 👇 user can be real user OR null
  const user: UserType | null = null;
  // const user: UserType | null = { name: "Ilya Rahmani" };

  return (
        <Sheet>
          <SheetTrigger>
           <AppButton
            type="icon"
            icon={<User size={25} />}
            ariaLabel="Profile"
            />
          </SheetTrigger>
         <SheetContent side="right" className="p-6">
           <SheetHeader>
              <SheetTitle className="flex flex-col items-center gap-3 text-center">

               <User size={60} className="text-primary" />

               <h1 className="text-xl font-semibold">
                 {"Guest Account"}
               </h1>
              </SheetTitle>

              <div className="mt-6 flex flex-col gap-4">
  <AppButton
    type="secondary"
    className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg transition"
  >
    Login & Sign in
  </AppButton>

  <AppButton
    type="secondary"
    className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg transition"
  >
    Settings
  </AppButton>
</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
  );
}





