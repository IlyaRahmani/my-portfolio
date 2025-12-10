import AppButton from "@/components/AppButton";
import Link from "next/link";

export default async function AdminProjectsPage() {

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Projects</h1>
      <p>Only admin (you) can see this page.</p>
      <Link href="/admin/projects-form">
          <AppButton
             type="secondary"
             className=" bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 mt-4"
              >
              Create Project
            </AppButton>
      </Link>

    </div>
  );
}