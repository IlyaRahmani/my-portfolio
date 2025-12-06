"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";

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
  const { signOut } = useClerk();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* The logout button (trigger) */}
      <DialogTrigger asChild>
        <AppButton
          type="secondary"
          className={
            "w-full py-3 text-lg text-red-600 dark:text-red-600 rounded-xl shadow hover:shadow-lg"
          }
        >
          Log out
        </AppButton>
      </DialogTrigger>

      {/* Confirmation popup */}
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3">
          {/* Cancel */}
          <AppButton type="secondary" onClick={() => setOpen(false)}>
            Cancel
          </AppButton>

          {/* YES logout */}
          <AppButton
            type="primary"
            className="bg-red-600 text-white"
            onClick={() => {
              signOut();
            }}
          >
            Yes, Log out
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}