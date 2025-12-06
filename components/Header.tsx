"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

import AppButton from "@/components/AppButton";
import ProfileSheet from "@/components/ProfileSheet";
import MenuBar from "@/components/MenuBar";
import MenuSheet from "@/components/MenuSheet";

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
    <header className="
  sticky top-0 z-50 
  bg-white/10 dark:bg-black/10 
  backdrop-blur-xl 
  border-b border-white/20 dark:border-white/10 
  shadow-lg
">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">

        {/* ---------- LOGO ---------- */}
        <Link
          href="/"
          className="text-2xl font-semibold text-blue-600 dark:text-blue-300"
        >
          Ilya Portfolio
        </Link>

        {/* ---------- RIGHT SIDE ---------- */}
        <div className="flex items-center gap-4">

          {/* DESKTOP MENU */}
        <div className="hidden md:flex">
           <MenuBar variant="header" />
        </div>

          {/* MOBILE MENU */}
          <div className="md:hidden ">
            <MenuSheet />
          </div>

          {/* THEME BUTTON */}
          <AppButton
            type="icon"
            onClick={toggleTheme}
            icon={theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            ariaLabel="Toggle Theme"
          />

          {/* PROFILE SHEET */}
          <ProfileSheet />
        </div>
      </div>
    </header>
  );
}