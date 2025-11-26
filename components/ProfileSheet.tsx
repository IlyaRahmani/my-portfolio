import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'

import { useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import AppButton from "./AppButton";

// 👇 Add the type here
type UserType = {
  name: string;
};

export default function ProfileSheet() {
  // 👇 user can be real user OR null
  const { user } = useUser();
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

              </SheetTitle>

              <div className="mt-6 flex flex-col gap-4">
                <SignedOut>
                  <User size={60} className="text-primary" />
                  <h1 className="text-xl font-semibold">{"Guest Account"}</h1>
                  <SignUpButton>
                   <AppButton type="primary"
                   className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg transition">
                   Sign up
                   </AppButton>
                 </SignUpButton>
                 <SignInButton>
                   <AppButton type="primary"
                   className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg transition">
                   Login
                   </AppButton>
                 </SignInButton>
               </SignedOut>
               <SignedIn>
                <div className="flex flex-col items-center justify-center gap-4 mt-4">
                  <img
                    src={user?.imageUrl}
                    alt="Profile"
                   className="w-60 h-60 rounded-full object-cover border"/>
                  <h1 className="text-xl font-semibold">{user?.fullName}</h1>

                 <AppButton type="primary"
                   className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg transition">
                   Dashboard
                 </AppButton>

                 <SignOutButton>
                  <AppButton
                     type="secondary"
                     className="w-full py-3 text-lg text-red-600 dark:text-red-600 rounded-xl shadow hover:shadow-lg transition">
                     Log out
                   </AppButton>
                 </SignOutButton>
                 
                </div>
             </SignedIn>
                <AppButton type="secondary"
               className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg transition">
               Settings
               </AppButton>
              </div>
            </SheetHeader>
          </SheetContent>
</Sheet>
  );
}





