import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import MouseCoordinates from "./components/carteComponents/MouseCoordinates";
import Navigation from "./pages/Navigation";
import Footer from "./pages/Footer";
import Dashboard from "./pages/Dashboard";
import AuthModal from "./pages/AuthModal";

import ActionsSection from "./components/ActionSection";
import ContactSection from "./components/ContactSection";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import ImpactSection from "./components/ImpactSection";
import MapSection from "./components/MapSection";
import Notification from "./components/Notification";

import './leaflet-setup';

// ===== COMPOSANT PRINCIPAL =====
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [isScrolled, setIsScrolled] = useState(false);
  const [notification, setNotification] = useState(null);
  const [counters, setCounters] = useState({ audio: 0, clips: 0, awards: 0, members: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [userRole, setUserRole] = useState("user");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["accueil", "actions", "galerie", "impact", "saritany", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = { audio: 24, clips: 24, awards: 3, members: 50 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const timer = setInterval(() => {
      setCounters((prev) => {
        const newCounters = {};
        let allComplete = true;

        Object.keys(targets).forEach((key) => {
          if (prev[key] < targets[key]) {
            newCounters[key] = Math.min(prev[key] + Math.ceil(targets[key] / steps), targets[key]);
            allComplete = false;
          } else {
            newCounters[key] = targets[key];
          }
        });

        if (allComplete) clearInterval(timer);
        return newCounters;
      });
    }, increment);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty("color-scheme", "dark");
    } else {
      root.style.setProperty("color-scheme", "light");
    }
  }, [darkMode]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleAuth = () => {
    if (authMode === "login") {
      if (formData.email === "admin@tanomafi.mg" && formData.password === "admin123") {
        setIsAuthenticated(true);
        setUserRole("admin");
        setUser({ name: "Admin Tanomafi", email: "admin@tanomafi.mg" });
        setShowAuthModal(false);
        setCurrentView("dashboard");
        setNotification({ type: "success", message: "Fidirany Admin totosa !" });
      } else if (formData.email && formData.password) {
        setIsAuthenticated(true);
        setUserRole("user");
        setUser({ name: formData.name || "Utilisateur", email: formData.email });
        setShowAuthModal(false);
        setCurrentView("home");
        setNotification({ type: "success", message: "Fidirana totosa !" });
      } else {
        setNotification({ type: "error", message: "mailaka na teny miafina diso !" });
      }
    } else {
      if (formData.name && formData.email && formData.password) {
        setIsAuthenticated(true);
        setUserRole("user");
        setUser({ name: formData.name, email: formData.email });
        setShowAuthModal(false);
        setCurrentView("home");
        setNotification({ type: "success", message: "Famoronana totosa !" });
      } else {
        setNotification({ type: "error", message: "Azafady fenoy ny mombamomba !" });
      }
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("user");
    setUser(null);
    setCurrentView("home");
    setShowProfileMenu(false);
    setFormData({ name: "", email: "", password: "" });
    setNotification({ type: "success", message: "Fivoahana totosa !" });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"
    }`}>
      <Navigation
        isScrolled={isScrolled}
        darkMode={darkMode}
        currentView={currentView}
        activeSection={activeSection}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        user={user}
        setCurrentView={setCurrentView}
        setDarkMode={setDarkMode}
        setShowAuthModal={setShowAuthModal}
        setAuthMode={setAuthMode}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
        handleLogout={handleLogout}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {showAuthModal && (
        <AuthModal
          darkMode={darkMode}
          authMode={authMode}
          setAuthMode={setAuthMode}
          formData={formData}
          setFormData={setFormData}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          setShowAuthModal={setShowAuthModal}
          handleAuth={handleAuth}
        />
      )}

      {currentView === "dashboard" && userRole === "admin" ? (
        <Dashboard darkMode={darkMode} counters={counters} user={user} />
      ) : (
        <>
          <HeroSection darkMode={darkMode} scrollToSection={scrollToSection} />
          <ActionsSection darkMode={darkMode} />
          <GallerySection darkMode={darkMode} isAuthenticated={isAuthenticated} />
          <ImpactSection darkMode={darkMode} counters={counters} isAuthenticated={isAuthenticated} />
          <MapSection darkMode={darkMode} isAuthenticated={isAuthenticated} />
          <ContactSection darkMode={darkMode} setNotification={setNotification} />
          <Footer />
        </>
      )}

      <Notification notification={notification} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animate-fade-in { animation: fade-in-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default App;