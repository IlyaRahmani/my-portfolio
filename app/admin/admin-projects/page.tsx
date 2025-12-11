import AppButton from "@/components/AppButton";
import Projects from "@/components/sections/Projects";
import Link from "next/link";

export default async function AdminProjectsPage() {

  return (
    <div >
      <div className="p-6 md:flex gap-5">
      <h1 className="py-3 px-6 mt-4 text-3xl font-bold">Admin Dashboard</h1>
      <Link href="/admin/projects-form">
          <AppButton
             type="primary"
             className=" py-3 px-6 mt-4"
              >
              Create Project
            </AppButton>
      </Link>
            <Link href="/">
          <AppButton
             type="secondary"
             className=" py-3 px-6 mt-4"
              >
              Update Project
            </AppButton>
      </Link>
            <Link href="/">
          <AppButton
             type="secondary"
             className=" py-3 px-6 mt-4 bg-red-400 dark:bg-red-500"
              >
              Delete Project
            </AppButton>
      </Link>
      </div>

      <Projects/>

    </div>
  );
}