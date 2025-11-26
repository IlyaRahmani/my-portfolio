"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, User } from "lucide-react";
import Link from "next/link";
import AppButton from "@/components/AppButton";
import ProfileSheet from "./ProfileSheet";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-semibold text-blue-600 dark:text-blue-300"
        >
          MyPortfolio
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <AppButton type="primary">Home</AppButton>
          <AppButton type="secondary">Projects</AppButton>
          <AppButton type="secondary">Contact</AppButton>

          <AppButton
            type="icon"
            onClick={toggleTheme}
            icon={theme === "light" ? <Moon size={25} /> : <Sun size={25} />}
            ariaLabel="Toggle Theme"
          />
          <ProfileSheet />

        </div>
      </div>
    </header>
  );
}
