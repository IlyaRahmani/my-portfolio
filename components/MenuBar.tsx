"use client";

import AppButton from "@/components/AppButton";

export default function MenuBar({ variant = "header" }: { variant?: "header" | "mobile" }) {
  return (
    <div
      className={
        variant === "header"
          ? "flex gap-4"
          : "flex flex-col gap-3 p-4" // mobile styles
      }
    >
      <AppButton
        type={variant === "mobile" ? "secondary" : "primary"}
      >
        About Me
      </AppButton>

      <AppButton
        type={variant === "mobile" ? "primary" : "secondary"}
      >
        Projects
      </AppButton>

      <AppButton
        type={variant === "mobile" ? "secondary" : "secondary"}
      >
        Contact
      </AppButton>
    </div>
  );
}