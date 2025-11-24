import { Music, Film, Trophy, Users } from "lucide-react";

const ImpactSection = ({ darkMode, counters, isAuthenticated }) => {
  if (!isAuthenticated) return null;

  const stats = [
    { icon: Music, value: counters.audio, label: "Ireo isan'ny audio vita", color: "from-pink-400 to-rose-400" },
    { icon: Film, value: counters.clips, label: "Ireo isan'ny clip vita", color: "from-purple-400 to-indigo-400" },
    { icon: Trophy, value: counters.awards, label: "isan'ny amboara azo", color: "from-amber-400 to-orange-400" },
    { icon: Users, value: counters.members, label: "Ireo isan'ny tanora rehetra", color: "from-blue-400 to-cyan-400" },
  ];

  return (
    <section id="impact" className={`py-20 px-4 text-white relative overflow-hidden transition-colors duration-300 ${
      darkMode ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800"
        : "bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500"
    }`}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[url('/public/image/mt1.png')] bg-cover bg-center"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Ireo taha</h2>
        <div className="w-24 h-1 bg-white mx-auto mb-16 rounded-full"></div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center transform hover:scale-110 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}>
              <div className={`w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:rotate-12 transition-transform duration-300`}>
                <stat.icon className="w-12 h-12 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-blue-100 text-lg font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;