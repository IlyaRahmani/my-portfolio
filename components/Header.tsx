"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, User } from "lucide-react";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";

export default function Header() {
  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  // Switch theme
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

        <Link href="/" className="text-2xl font-semibold text-blue-600 dark:text-blue-300">
          MyPortfolio
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          {/* About Me */}

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2563eb", 
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.2,
              fontSize: "15px",
              "&:hover": {
                backgroundColor: "#1d4ed8",
              },
            }}
          >
            Home
          </Button>

          {/* Projects */}

          <Button
            variant="outlined"
            sx={{
              color: theme === "light" ? "#374151" : "#ffffff",
              borderColor: theme === "light" ? "#d1d5db" : "#4b5563",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.2,
              fontSize: "15px",
              backgroundColor: theme === "light" ? "#f3f4f6" : "#374151",
              "&:hover": {
                backgroundColor: theme === "light" ? "#e5e7eb" : "#4b5563",
                borderColor: theme === "light" ? "#9ca3af" : "#6b7280",
              },
            }}
          >
            Projects
          </Button>

          <Button
            variant="outlined"
            sx={{
              color: theme === "light" ? "#374151" : "#ffffff",
              borderColor: theme === "light" ? "#d1d5db" : "#4b5563",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.2,
              fontSize: "15px",
              backgroundColor: theme === "light" ? "#f3f4f6" : "#374151",
              "&:hover": {
                backgroundColor: theme === "light" ? "#e5e7eb" : "#4b5563",
                borderColor: theme === "light" ? "#9ca3af" : "#6b7280",
              },
            }}
          >
            Contact
          </Button>

          {/* Dark mode toggle */}

          <IconButton
            onClick={toggleTheme}
            sx={{
              backgroundColor: theme === "light" ? "#e5e7eb" : "#374151",
              color: theme === "light" ? "#1f2937" : "#facc15",
              width: 42,
              height: 42,
              "&:hover": {
                backgroundColor: theme === "light" ? "#d1d5db" : "#4b5563",
              },
            }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>

          {/* Profile button */}
          <IconButton
          sx={{
              backgroundColor: theme === "light" ? "#e5e7eb" : "#374151",
              color: theme === "light" ? "#1f2937" : "#facc15",
              width: 42,
              height: 42,
              "&:hover": {
                backgroundColor: theme === "light" ? "#d1d5db" : "#4b5563",
              },
            }}
          >
            <User size={20} />
          </IconButton>

        </div>
      </div>
    </header>
  );
}
