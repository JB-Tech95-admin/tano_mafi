import { Mic, Video, Church } from "lucide-react";

const ActionsSection = ({ darkMode }) => {
  const actions = [
    {
      icon: Mic, title: "Fandraisampeo",
      desc: "Fanaovana prise vocal an'ireo hira noforonin'ireo tanora rehetra mba hofitoriana filazantsara amin'ny alalan'ny feo.",
      progress: 85, color: "from-pink-500 to-rose-500"
    },
    {
      icon: Video, title: "Sary mihetsika",
      desc: "Fanaovana tournage clip an'ireo audio vita'ireo tanora rehetra mba hofitoriana filazantsara amin'ny alalan'ny sary.",
      progress: 72, color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Church, title: "Fitoriana Filazantsara",
      desc: "Fitoriana filazantsara amin'ny alalan'ny tafika masina amin'ireo toerana maro na antokatrano.",
      progress: 93, color: "from-blue-500 to-cyan-500"
    },
  ];

  return (
    <section id="actions" className={`py-20 px-4 transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Hetsika
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mb-16 rounded-full"></div>

        <div className="grid md:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <div key={index}
              className={`group p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border animate-fade-in-up ${
                darkMode ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
                  : "bg-gradient-to-br from-white to-blue-50 border-blue-100"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}>
              <div className={`w-20 h-20 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                <action.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>{action.title}</h3>
              <p className={`mb-6 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{action.desc}</p>
              <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                <div className={`h-full bg-gradient-to-r ${action.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${action.progress}%` }}></div>
              </div>
              <p className={`text-sm mt-2 text-right font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {action.progress}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionsSection;