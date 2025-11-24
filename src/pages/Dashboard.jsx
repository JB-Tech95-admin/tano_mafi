import { useState } from 'react';

import { Music, Trophy, Users, Film } from 'lucide-react';

import lineChartData from '../dataset/lineChartData';
import barChartData from '../dataset/barChartData';
import pieChartData from '../dataset/pieChartData';
import connectedUsers from '../dataset/connectedUsers';
import events from '../dataset/events';

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Dashboard = ({ darkMode, counters, user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const renderCalendar = () => {
    const { firstDay, daysInMonth } = getDaysInMonth(selectedDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const hasEvent = events.some((e) => e.date === dateStr);
      const isToday = day === new Date().getDate() && selectedDate.getMonth() === new Date().getMonth();

      days.push(
        <div key={day}
          className={`h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all ${
            isToday ? "bg-blue-600 text-white font-bold"
              : hasEvent ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}>
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 px-4 transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>Tabilao famitinana</h1>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Tongasoa, {user?.name}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Music, label: "hira", value: counters.audio, color: "from-blue-500 to-blue-600", change: "+12%" },
            { icon: Film, label: "sary mihetsika", value: counters.clips, color: "from-purple-500 to-purple-600", change: "+8%" },
            { icon: Trophy, label: "Amboara", value: counters.awards, color: "from-amber-500 to-amber-600", change: "+50%" },
            { icon: Users, label: "Tanora", value: counters.members, color: "from-green-500 to-green-600", change: "+15%" },
          ].map((stat, index) => (
            <div key={index}
              className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className={`text-3xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>{stat.value}</h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>Fivoarana isambolana</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#fff", border: "none", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="hira" stroke="#3b82f6" strokeWidth={3} />
                <Line type="monotone" dataKey="sary_mihetsika" stroke="#8b5cf6" strokeWidth={3} />
                <Line type="monotone" dataKey="mpikambana" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>Taha ankapobeny</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#fff", border: "none", borderRadius: "8px" }} />
                <Bar dataKey="isa" radius={[8, 8, 0, 0]}>
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>Fizarazarana hetsika</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100} fill="#8884d8" dataKey="value">
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#fff", border: "none", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Alimanaka</h3>
              <div className="flex items-center space-x-2">
                <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                  className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>←</button>
                <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {selectedDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </span>
                <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                  className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>→</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                <div key={day} className={`text-center text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {day}
                </div>
              ))}
            </div>
            <div className={`grid grid-cols-7 gap-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {renderCalendar()}
            </div>
          </div>
        </div>

        <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>Olona mitafa</h3>
          <div className="space-y-3">
            {connectedUsers.map((connectedUser) => (
              <div key={connectedUser.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {connectedUser.name.charAt(0)}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                      darkMode ? "border-gray-800" : "border-white"
                    } ${connectedUser.status === "online" ? "bg-green-500" : "bg-gray-400"}`}></div>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{connectedUser.name}</h4>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{connectedUser.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    connectedUser.role === "Admin"
                      ? darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-600"
                      : darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                  }`}>{connectedUser.role}</span>
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{connectedUser.lastActive}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;