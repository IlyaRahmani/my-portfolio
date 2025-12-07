"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import Link from "next/link";

import AppButton from "../AppButton";
import LogoutConfirmation from "../LogoutConfirmation";

export default function ProfileSheet() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      
            <SheetTrigger asChild>
        <AppButton
          type="icon"
          icon={<User size={25} />}
          ariaLabel="Profile"
        />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="
          bg-white/10 
          dark:bg-black/10
          backdrop-blur-2xl
          border-white/20 
          dark:border-white/10
          border-l
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
        "
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-6">

          {/* ----------- GUEST VIEW ----------- */}
          <SignedOut>
            <div className="flex flex-col items-center gap-4">
              <User size={60} className="text-primary" />
              <h1 className="text-xl font-semibold">Guest Account</h1>

              <SignUpButton>
                <AppButton
                  type="primary"
                  className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg"
                >
                  Sign up
                </AppButton>
              </SignUpButton>

              <SignInButton>
                <AppButton
                  type="primary"
                  className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg"
                >
                  Login
                </AppButton>
              </SignInButton>
            </div>
          </SignedOut>

          {/* ----------- LOGGED IN VIEW ----------- */}
          <SignedIn>
            <div className="flex flex-col items-center gap-4">
              
              <img
                src={user?.imageUrl || ""}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border"
              />

              <h1 className="text-xl font-semibold">{user?.fullName}</h1>

              <Link
                href="/profile"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                <AppButton
                  type="secondary"
                  className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg"
                >
                  Profile
                </AppButton>
              </Link>

              {/* DASHBOARD — CLOSE SHEET ON CLICK */}
              <Link
                href="/dashboard"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                <AppButton
                  type="primary"
                  className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg"
                >
                  Dashboard
                </AppButton>
              </Link>

              <LogoutConfirmation
                triggerClassName="w-full py-3 text-lg text-red-600 rounded-xl shadow"
              />

            </div>
          </SignedIn>

          {/* Settings */}
          <AppButton
            type="secondary"
            className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg"
          >
            Settings
          </AppButton>

        </div>
      </SheetContent>
    </Sheet>
  );
}