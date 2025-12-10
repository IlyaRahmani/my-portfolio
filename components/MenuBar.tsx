"use client";

import AppButton from "@/components/AppButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MenuBar({ variant = "header" }: { variant?: "header" | "mobile" }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const userEmail = data.user?.email;
      setIsAdmin(userEmail === "eiliarhmani1177@gmail.com");
    };
    getUser();
  }, []);

  // While checking user, hide the Projects button
  if (isAdmin === null) return null;

  // CORRECT ROUTES:
  const projectsLink = isAdmin ? "/admin/admin-projects" : "/user-projects";

  return (
    <div
      className={
        variant === "header"
          ? "flex gap-4"
          : "flex flex-col gap-3 p-4"
      }
    >
      <Link href="/contact">
        <AppButton
          type={variant === "mobile" ? "secondary" : "primary"}
          className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg"
        >
          Contact
        </AppButton>
      </Link>

      <Link href={projectsLink}>
        <AppButton
          type={variant === "mobile" ? "primary" : "secondary"}
          className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg"
        >
          Projects
        </AppButton>
      </Link>
    </div>
  );
}