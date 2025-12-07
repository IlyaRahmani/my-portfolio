"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import AppButton from "@/components/AppButton";

interface LogoutConfirmationProps {
  triggerClassName?: string;
}

export default function LogoutConfirmation({
  triggerClassName,
}: LogoutConfirmationProps) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // ← logout supabase user
    setOpen(false); // close popup

    // optional: redirect to home page
    window.location.href = "/";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <AppButton
          type="secondary"
          className={
            triggerClassName ??
            "w-full py-3 text-lg text-red-600 rounded-xl shadow hover:shadow-lg"
          }
        >
          Log out
        </AppButton>
      </DialogTrigger>

      {/* Popup content */}
      <DialogContent className="w-[90%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3">
          <AppButton type="secondary" onClick={() => setOpen(false)}>
            Cancel
          </AppButton>

          <AppButton
            type="primary"
            className="bg-red-600 text-white"
            onClick={handleLogout}
          >
            Yes, Log out
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}