export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-neutral-100 dark:bg-neutral-900">

      {/* SIDEBAR */}
      <aside className="w-64 hidden md:flex flex-col p-6 bg-white/60 dark:bg-black/40 backdrop-blur-xl border-r border-neutral-200/50 dark:border-neutral-700/50">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <nav className="flex flex-col gap-3 text-lg">
          <a className="hover:text-blue-600 transition" href="/dashboard">
            Home
          </a>
          <a className="hover:text-blue-600 transition" href="/dashboard/profile">
            Profile
          </a>
          <a className="hover:text-blue-600 transition" href="/dashboard/settings">
            Settings
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">{children}</main>

    </div>
  );
}