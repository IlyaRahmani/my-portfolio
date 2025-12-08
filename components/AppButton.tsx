"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AppButtonProps = {
  type?: "primary" | "secondary" | "icon";
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
};

export default function AppButton({
  type = "primary",
  children,
  className,
  icon,
  onClick,
  ariaLabel,
  disabled = false,
}: AppButtonProps) {
  const base = cn(
    "transition-all duration-200 ease-in-out",
    "rounded-lg flex items-center justify-center",
    "focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
  );

  const styles = {
    primary:
      "bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700",
    secondary:
      "bg-gray-200 text-gray-700 px-4 py-2 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:active:bg-gray-500",
    icon:
      "p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 active:bg-gray-400 dark:hover:bg-gray-600 dark:active:bg-gray-500",
  };

  const disabledStyles =
    "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        base,
        type === "icon"
          ? styles.icon
          : type === "secondary"
          ? styles.secondary
          : styles.primary,
        disabled && disabledStyles,
        className
      )}
    >
      {icon ? icon : children}
    </button>
  );
}