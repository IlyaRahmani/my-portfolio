"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // helper to join Tailwind classes

type AppButtonProps = {
  type?: "primary" | "secondary" | "icon";
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  ariaLabel?: string;
};

export default function AppButton({
  type = "primary",
  children,
  className,
  icon,
  onClick,
  ariaLabel,
}: AppButtonProps) {
  // Base styles for all buttons
  const base = cn (
    "transition-all duration-200 ease-in-out", // smooth transition
    "rounded-lg flex items-center justify-center",
    "focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500" // focus ring
  );

  // Variant styles
  const styles = {
    primary:
      "bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700",
    secondary:
      "bg-gray-200 text-gray-700 px-4 py-2 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:active:bg-gray-500",
    icon:
      "p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 active:bg-gray-400 dark:hover:bg-gray-600 dark:active:bg-gray-500",
  };

  return (
    <button
      onClick={onClick}
      className={cn(base, type === "icon" ? styles.icon : type === "secondary" ? styles.secondary : styles.primary, className)}
      aria-label={ariaLabel}
    >
      {icon ? icon : children}
    </button>
  );
}
