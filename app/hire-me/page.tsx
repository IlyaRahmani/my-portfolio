"use client";

import { useState } from "react";
import AppButton from "@/components/AppButton";

export default function HireMePage() {
  const [loading, setLoading] = useState(false);

  return (
    <section className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-6">Hire Me</h1>
      <p className="text-neutral-600 dark:text-neutral-300 text-center mb-10">
        Tell me about your project and I will get back to you.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);

          setTimeout(() => {
            setLoading(false);
            alert("Request sent! (Backend not connected yet)");
          }, 1000);
        }}
        className="flex flex-col gap-5"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          className="p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl"
          required
        />

        <textarea
          placeholder="Tell me about your project..."
          className="p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl h-32"
          required
        />

        <AppButton
          type="primary"
          className="py-3 text-lg rounded-xl"
        >
          Send Request
        </AppButton>
      </form>
    </section>
  );
}