"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_EMAIL = "eiliarhmani1177@gmail.com";

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email !== ADMIN_EMAIL) {
      setLoading(false);
      setError("Only admin can log in.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    const user = data.user;

    if (user?.email === ADMIN_EMAIL) {
      router.push("/admin/admin-projects");
    } else {
      router.push("/user-projects");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-[#0d0d0d] transition-colors duration-300">
      
      {/* BIGGER, MORE RESPONSIVE CARD */}
      <div className="
        w-full max-w-lg 
        backdrop-blur-xl 
        bg-white/30 dark:bg-black/30 
        border border-white/20 dark:border-white/10
        shadow-2xl 
        rounded-2xl 
        p-10 
        transition-all 
        duration-300
      ">
        
        <h1 className="text-4xl font-bold text-center mb-8  text-blue-600 dark:text-blue-300">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              className="
                mt-2 w-full px-4 py-3 
                rounded-xl 
                bg-white dark:bg-black/40 
                border border-gray-300 dark:border-gray-700 
                text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-purple-600 
                outline-none 
                transition-all
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              className="
                mt-2 w-full px-4 py-3 
                rounded-xl 
                bg-white dark:bg-black/40 
                border border-gray-300 dark:border-gray-700 
                text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-purple-600 
                outline-none 
                transition-all
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* SUBMIT USING YOUR AppButton */}
          <AppButton
            type="primary"
            disabled={loading}
            className="
              w-full 
             font-semibold 
              py-3 px-6 rounded-xl 
              transition-all duration-200 
              shadow-lg hover:shadow-xl 
              active:scale-[0.97]
            "
          >
            {loading ? "Logging in..." : "Login"}
          </AppButton>

        </form>
      </div>
    </div>
  );
}