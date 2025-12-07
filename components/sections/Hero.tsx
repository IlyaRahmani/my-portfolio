"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import AppButton from "@/components/AppButton";
import Link from "next/link";


export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
      
      {/* PHOTO */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image
          src="/me.png"
          alt="Ilya"
          fill
          className="object-cover rounded-full shadow-2xl"
        />
      </div>

      {/* TEXT AREA */}
      <div className="flex flex-col gap-4 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold">
          Hi, I’m <span className="text-blue-600">Ilya</span>
        </h1>

        <h2 className="text-xl md:text-2xl font-medium text-neutral-600 dark:text-neutral-300">
          Full Stack Web Developer • Next.js
        </h2>

        <p className="max-w-lg text-neutral-600 dark:text-neutral-400">
          I build clean, modern and responsive web applications using 
          Next.js, Tailwind CSS and TypeScript.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex gap-4 justify-center md:justify-start mt-4">
          <Link href="/hire-me" >
              <AppButton
                  type="primary"
                  className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg"
                >
                  {`Hire Me >`}
              </AppButton>
            </Link>
            <Link href="/my-team" >
              <AppButton
                  type="secondary"
                  className="w-full py-3 text-lg rounded-xl shadow hover:shadow-lg"
                >
                  My Team
              </AppButton>
            </Link>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 justify-center md:justify-start mt-4">

          {/* Telegram */}
          <a
            href="https://t.me/EiliaRH"
            target="_blank"
            className="hover:text-blue-600"
          >
            <Send className="w-6 h-6" />
          </a>

          <a href="https://github.com/IlyaRahmani" target="_blank">
            <Github className="w-6 h-6 hover:text-blue-600" />
          </a>

          <a href="https://linkedin.com" target="_blank">
            <Linkedin className="w-6 h-6 hover:text-blue-600" />
          </a>

          <a href="mailto:eiliarhmani1177@gmail.com">
            <Mail className="w-6 h-6 hover:text-blue-600" />
          </a>
        </div>
      </div>
    </section>
  );
}