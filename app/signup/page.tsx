"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import AppButton from "@/components/AppButton";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Check your email to confirm your account.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-6">Create account</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-4 rounded border"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-4 rounded border"
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <AppButton type="primary" onClick={handleSignup} >
        Sign Up
      </AppButton>
    </div>
  );
}