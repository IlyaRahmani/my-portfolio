import Image from "next/image";

export default function MyTeamPage() {
  const team = [
    {
      name: "Artin Rahmani",
      role: "UI/UX Designer",
      img: "/placeholder.jpg",
    },
    {
      name: "Example Member",
      role: "UI/UX Designer",
      img: "/placeholder.jpg",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-10">My Team</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {team.map((member, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white/10 border border-white/20 p-6 rounded-2xl backdrop-blur-xl shadow-xl"
          >
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={member.img}
                alt={member.name}
                fill
                className="rounded-full object-cover"
              />
            </div>

            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-neutral-400">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}