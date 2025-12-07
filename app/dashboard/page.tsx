export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">Welcome back, Ilya 👋</h1>

      <p className="text-neutral-600 dark:text-neutral-300">
        Here's an overview of your dashboard activity.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="p-6 rounded-xl bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow border">
          <h2 className="text-xl font-semibold">Visitors</h2>
          <p className="text-3xl font-bold mt-2">1,243</p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow border">
          <h2 className="text-xl font-semibold">Requests</h2>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow border">
          <h2 className="text-xl font-semibold">New SignUp's</h2>
          <p className="text-3xl font-bold mt-2">27</p>
        </div>

      </div>
    </div>
  );
}