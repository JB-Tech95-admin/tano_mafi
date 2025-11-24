import {
   History as HistoryIcon,
  Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Send
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { MapContainer, TileLayer, CircleMarker, LayersControl, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const ContactSection = ({ setNotification }) => (
  <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        Fifandraisana
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mb-16 rounded-full"></div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 animate-fade-in-up">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Te hiditra mpikambana</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Izahay dia mandray mpikambana raha mahaliana anao ny hitory filazantsara miaraka aminay.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">tanora@tanomafi.mg</span>
            </div>

            <div className="flex items-center space-x-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">+261 38 545 49</span>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a key={index} href="#"
                className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                <Icon className="w-6 h-6 text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-3xl shadow-xl border border-blue-100 dark:border-gray-600 animate-fade-in-up animation-delay-200">
          <div className="space-y-6">
            <input type="text" placeholder="Anarana"
              className="w-full px-6 py-4 rounded-2xl border-2 border-blue-100 dark:border-gray-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300 outline-none bg-white dark:bg-gray-700 dark:text-white" />

            <input type="email" placeholder="Mailaka"
              className="w-full px-6 py-4 rounded-2xl border-2 border-blue-100 dark:border-gray-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300 outline-none bg-white dark:bg-gray-700 dark:text-white" />

            <textarea placeholder="Hafatra" rows="5"
              className="w-full px-6 py-4 rounded-2xl border-2 border-blue-100 dark:border-gray-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300 outline-none resize-none bg-white dark:bg-gray-700 dark:text-white"></textarea>

            <button onClick={() => {
              setNotification({ type: "success", message: "Message envoyé avec succès !" });
              setTimeout(() => setNotification(null), 4000);
            }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-2xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Handefa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;