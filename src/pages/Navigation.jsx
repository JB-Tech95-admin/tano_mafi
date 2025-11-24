import {
  Trash2, History as HistoryIcon, Menu, X, Leaf, Music, Film, Users,
  Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Send, Trophy,
  Mic, Video, Church, Moon, Sun, User, Settings, LogOut, BarChart3,
  UserCircle, Lock, Eye, EyeOff, Shield
} from "lucide-react";

const Navigation = ({ 
  isScrolled, darkMode, currentView, activeSection, isAuthenticated, userRole, user,
  setCurrentView, setDarkMode, setShowAuthModal, setAuthMode, showProfileMenu, 
  setShowProfileMenu, handleLogout, scrollToSection, isMenuOpen, setIsMenuOpen 
}) => {
  const navItems = [
    { id: "accueil", label: "Fandraisana" },
    { id: "actions", label: "Hetsika" },
    { id: "contact", label: "Fifandraisana" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? darkMode ? "bg-gray-900/95 backdrop-blur-lg shadow-2xl" : "bg-white/95 backdrop-blur-lg shadow-2xl"
        : darkMode ? "bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-white/90 backdrop-blur-md shadow-lg"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => { setCurrentView("home"); scrollToSection("accueil"); }}>
            <div className="p-2 rounded-xl">
              <img src="/public/image/logos.png" alt="logo" className="w-15 h-15" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              TANOMAFI
            </span>
          </div>

          {currentView === "home" && (
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeSection === item.id ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg scale-105"
                      : darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}>
                  {item.label}
                </button>
              ))}

              {isAuthenticated && (
                <>
                  <button onClick={() => scrollToSection("galerie")}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeSection === "galerie" ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg scale-105"
                        : darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}>
                    Sary
                  </button>
                  <button onClick={() => scrollToSection("impact")}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeSection === "impact" ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg scale-105"
                        : darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}>
                    Taha
                  </button>
                  <button onClick={() => scrollToSection("saritany")}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeSection === "saritany" ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg scale-105"
                        : darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}>
                    Saritany
                  </button>
                </>
              )}
            </div>
          )}

          <div className="flex items-center space-x-3">
            {isAuthenticated && userRole === "admin" && (
              <button onClick={() => setCurrentView(currentView === "dashboard" ? "home" : "dashboard")}
                className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <BarChart3 className={`w-6 h-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`} />
              </button>
            )}

            <button onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
              {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-700" />}
            </button>

            {!isAuthenticated ? (
              <button onClick={() => { setShowAuthModal(true); setAuthMode("login"); }}
                className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all">
                <User className="w-5 h-5" />
                <span>Hiditra</span>
              </button>
            ) : (
              <div className="relative">
                <button onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name.charAt(0)}
                    </div>
                    {userRole === "admin" && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>

                {showProfileMenu && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl py-2 animate-fade-in ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}>
                    <div className={`px-4 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{user?.name}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          userRole === "admin" ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        }`}>
                          {userRole === "admin" ? "Admin" : "Utilisateur"}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{user?.email}</p>
                    </div>
                    <button className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors ${
                      darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"
                    }`}>
                      <UserCircle className="w-5 h-5" />
                      <span>Mombamomba</span>
                    </button>
                    <button className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors ${
                      darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"
                    }`}>
                      <Settings className="w-5 h-5" />
                      <span>Fanavaozana</span>
                    </button>
                    <button onClick={handleLogout}
                      className={`w-full px-4 py-3 text-left flex items-center space-x-3 border-t transition-colors ${
                        darkMode ? "hover:bg-gray-700 text-red-400 border-gray-700"
                          : "hover:bg-gray-100 text-red-600 border-gray-200"
                      }`}>
                      <LogOut className="w-5 h-5" />
                      <span>Hivoaka</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <button className={`md:hidden p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-blue-50"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                : <Menu className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
        isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className={`px-4 pb-4 space-y-2 backdrop-blur-lg ${darkMode ? "bg-gray-900/95" : "bg-white/95"}`}>
          {!isAuthenticated ? (
            <button onClick={() => { setShowAuthModal(true); setAuthMode("login"); setIsMenuOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              Hiditra
            </button>
          ) : (
            <>
              {userRole === "admin" && (
                <button onClick={() => { setCurrentView("dashboard"); setIsMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                  }`}>
                  Tabilao famitinana
                </button>
              )}
              {currentView === "home" && (
                <>
                  {navItems.map((item) => (
                    <button key={item.id} onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        activeSection === item.id ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                          : darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                      }`}>
                      {item.label}
                    </button>
                  ))}
                  {isAuthenticated && (
                    <>
                      <button onClick={() => scrollToSection("galerie")}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          activeSection === "galerie" ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                            : darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                        }`}>
                        Sary
                      </button>
                      <button onClick={() => scrollToSection("impact")}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          activeSection === "impact" ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                            : darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                        }`}>
                        Taha
                      </button>
                      <button onClick={() => scrollToSection("saritany")}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          activeSection === "saritany" ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                            : darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                        }`}>
                        Saritany
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;