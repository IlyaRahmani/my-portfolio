import AppButton from "@/components/AppButton";
import Projects from "@/components/sections/Projects";
import Link from "next/link";

export default async function AdminProjectsPage() {

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Projects</h1>
      <p>Only admin (you) can see this page.</p>
      <Link href="/admin/projects-form">
          <AppButton
             type="primary"
             className=" py-3 px-6 mt-4"
              >
              Create Project
            </AppButton>
      </Link>

      <Projects/>

    </div>
  );
}