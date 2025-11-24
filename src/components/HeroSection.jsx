import {
  Trash2, History as HistoryIcon, Menu, X, Leaf, Music, Film, Users,
  Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Send, Trophy,
  Mic, Video, Church, Moon, Sun, User, Settings, LogOut, BarChart3,
  UserCircle, Lock, Eye, EyeOff, Shield
} from "lucide-react";

const HeroSection = ({ darkMode, scrollToSection }) => (
  <section id="accueil"
    className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${
      darkMode ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800"
        : "bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500"
    }`}>
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[url('/public/image/mt1.png')] bg-cover bg-center opacity-80"></div>
    </div>

    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`, animationDuration: `${5 + Math.random() * 10}s`,
          }}>
          <Leaf className="w-8 h-8 text-blue-200 opacity-30" />
        </div>
      ))}
    </div>

    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
        Tanora Manaotsara Fianarantsoa
      </h1>
      <p className="text-xl md:text-2xl text-blue-100 mb-10 animate-fade-in-up animation-delay-200">
        Aoka tsy hisy hanao tsinotsinona anao noho ny hatanoranao
      </p>
      <button onClick={() => scrollToSection("actions")}
        className="group bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-400 inline-flex items-center space-x-2">
        <Leaf className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span>Hanomboka</span>
      </button>
    </div>
  </section>
);

export default HeroSection;