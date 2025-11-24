import { useState } from "react";

import galleryItems from "../dataset/galleryItems";

const GallerySection = ({ darkMode, isAuthenticated }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredGallery = activeFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter);

  if (!isAuthenticated) return null;

  return (
    <section id="galerie" className={`py-20 px-4 transition-colors duration-300 ${
      darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"
    }`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Sarin'ireo Tanora
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mb-12 rounded-full"></div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: "all", label: "Rehetra" },
            { id: "nature", label: "Clip" },
            { id: "energie", label: "Fifaninanana" },
            { id: "recyclage", label: "Asa" },
          ].map((filter) => (
            <button key={filter.id} onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter.id ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                  : darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600 shadow-md"
                    : "bg-white text-gray-700 hover:bg-blue-50 shadow-md"
              }`}>
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGallery.map((item, index) => (
            <div key={item.id}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <h4 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h4>
                <p className="text-blue-100 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;