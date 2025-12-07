"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

import type { User as SupabaseUser } from "@supabase/supabase-js";
import { User as UserIcon } from "lucide-react";

import AppButton from "@/components/AppButton";


export default function ProfileSheet() {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<SupabaseUser | null>(null);

  const supabase = createClient();

  // Load user on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data?.user || null);
      });
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* OPEN BUTTON */}
      <SheetTrigger asChild>
        <AppButton
  type="icon"
  icon={<UserIcon size={23} />}
  ariaLabel="Profile"
/>
      </SheetTrigger>

      {/* SHEET CONTENT */}
      <SheetContent className="w-[85%] sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="text-xl">My Account</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-4">

          {/* If NOT logged in → show login + signup */}
          {!user && (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>
                <AppButton type="primary" className="w-full py-3 text-lg">
                  Login
                </AppButton>
              </Link>

              <Link href="/signup" onClick={() => setOpen(false)}>
                <AppButton type="secondary" className="w-full py-3 text-lg">
                  Sign Up
                </AppButton>
              </Link>
            </>
          )}

          {/* If logged in → show logout */}
          {user && (
            <>
              <div className="text-lg font-medium">
                Logged in as:
                <br />
                <span className="text-blue-600">{user.email}</span>
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