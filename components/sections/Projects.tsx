"use client";

import AppButton from "@/components/AppButton";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  github: string;
  preview: string;
  image?: string;
}

const dummyProjects: Project[] = [
  {
    id: "1",
    title: "My Portfolio",
    description: "A modern portfolio built with Next.js, Tailwind, and supabase.",
    github: "https://github.com/username/repo",
    preview: "https://portfolio.com",
  },
  {
    id: "2",
    title: "Chat App",
    description: "Real-time chat with WebSockets and Next.js.",
    github: "https://github.com/username/chat",
    preview: "https://chatapp.com",
  },
];

export default function Projects() {
  const handleDelete = (id: string) => {
    alert("Delete project → " + id);
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Projects
      </h1>

      <div className="space-y-6">
        {dummyProjects.map((project) => (
          <div
            key={project.id}
            className="
              w-full bg-white/10 dark:bg-black/20 
              rounded-2xl shadow-xl p-6 
              flex flex-col md:flex-row items-center
              justify-between gap-6 border border-white/10
            "
          >
            {/* LEFT SECTION */}
            <div className="flex items-center gap-6 w-full md:w-auto">
              {/* PROJECT IMAGE */}
              <div className="w-24 h-24 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0"></div>

              {/* TITLE + DESCRIPTION */}
              <div>
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-slate-500 dark:text-slate-300 mt-1 max-w-md">
                  {project.description}
                </p>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-start md:items-end w-full md:w-auto gap-5">

              {/* GitHub Link */}
              <a
                href={project.github}
                target="_blank"
                className="
                  flex items-center gap-2 text-blue-500 hover:text-blue-600 
                  transition-colors underline
                "
              >
                <Github className="w-5 h-5" />
                GitHub Repo
              </a>

              {/* Live Preview */}
              <a
                href={project.preview}
                target="_blank"
                className="
                  flex items-center gap-2 text-green-500 hover:text-green-600 
                  transition-colors underline
                "
              >
                <ExternalLink className="w-5 h-5" />
                Live Preview
              </a>

              {/* DELETE BUTTON */}
              <AppButton
                type="primary"
                className="
                  text-white px-6 py-2 rounded-lg font-semibold 
                  shadow-md hover:shadow-lg active:scale-95
                "
                onClick={() => handleDelete(project.id)}
              >
                Delete
              </AppButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}