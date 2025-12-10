"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User as UserIcon } from "lucide-react";

import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

import AppButton from "@/components/AppButton";

export default function ProfileSheet() {
  const [open, setOpen] = useState(false);
  const user = useUser(); // ✅ single source of truth

  // Close sheet automatically when auth state changes (login/logout)
  useEffect(() => {
    if (user) setOpen(false);
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <SheetTrigger asChild>
        <AppButton
          type="icon"
          icon={<UserIcon size={23} />}
          ariaLabel="Profile"
        />
      </SheetTrigger>

      {/* Sheet content */}
      <SheetContent
  side="right"
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
          <SheetTitle className="text-xl">My Account</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-4">
          {/* NOT LOGGED IN */}
          {!user && (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>
                <AppButton type="primary" className="w-full py-3 text-lg">
                  Login
                </AppButton>
              </Link>

            </>
          )}

          {/* LOGGED IN */}
          {user && (
            <>
              <div className="text-lg font-medium">
                Logged in as:
                <br />
                <span className="text-blue-600 break-all">
                  {user.email}
                </span>
              </div>

              <AppButton
                type="secondary"
                className="w-full py-3 text-lg text-red-600"
                onClick={handleLogout}
              >
                Log Out
              </AppButton>
            </>
          )}
        </div>

        <SheetFooter />
      </SheetContent>
    </Sheet>
  );
}