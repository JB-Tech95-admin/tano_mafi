import {
  Trash2, History as HistoryIcon, Menu, X, Leaf, Music, Film, Users,
  Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Send, Trophy,
  Mic, Video, Church, Moon, Sun, User, Settings, LogOut, BarChart3,
  UserCircle, Lock, Eye, EyeOff, Shield
} from "lucide-react";

const AuthModal = ({ darkMode, authMode, setAuthMode, formData, setFormData, showPassword, setShowPassword, setShowAuthModal, handleAuth }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className={`rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
          {authMode === "login" ? "Hiditra mpikambana" : "Hamorona kaonty"}
        </h2>
        <button onClick={() => setShowAuthModal(false)} className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
          <X className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
        </button>
      </div>

      <div className="space-y-4">
        {authMode === "register" && (
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Anarana Feno</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                  darkMode ? "border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-900"
                    : "border-gray-200 bg-white text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"}`}
                placeholder="Anaranao" />
            </div>
          </div>
        )}

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Mailaka</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                darkMode ? "border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-900"
                  : "border-gray-200 bg-white text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"}`}
              placeholder="mailaka@tanomafi.mg" />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Teny Miafina</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input type={showPassword ? "text" : "password"} value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 outline-none transition-all ${
                darkMode ? "border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-900"
                  : "border-gray-200 bg-white text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"}`}
              placeholder="••••••••" />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {authMode === "login" && (
          <div className={`text-xs p-3 rounded-lg ${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600"}`}>
            <p className="font-semibold mb-1">👤 kaonty ny Admin efa voatokana :</p>
            <p>mailaka: admin@tanomafi.mg</p>
            <p>teny miafina: admin123</p>
          </div>
        )}

        <button onClick={handleAuth}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all">
          {authMode === "login" ? "Hiditra" : "Hamorona"}
        </button>

        <button onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
          className={`w-full text-sm hover:underline ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
          {authMode === "login" ? "tsy mbola manana kaonty ? hamorona" : "efa manana kaonty ? hiditra"}
        </button>
      </div>
    </div>
  </div>
);

export default AuthModal;