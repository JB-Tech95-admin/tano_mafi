// MapSection.jsx
import { useState, useEffect, useCallback } from "react";
import churches from "../dataset/churches";

import MouseCoordinates from "./carteComponents/MouseCoordinates";
import RoutingMachine from "./carteComponents/RoutingMachine";
import UserClick from "./carteComponents/UserClick";

import { Trash2, History, Download, X } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, LayersControl, Popup } from "react-leaflet";

const MapSection = ({ darkMode, isAuthenticated }) => {
  const [clickPos, setClickPos] = useState(null);
  const [destination, setDestination] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const center = [-21.4415, 47.105];

  // Charger l'historique depuis localStorage au montage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ffsm-route-history');
      if (saved) {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
      }
    } catch (err) {
      console.error("Erreur lors du chargement de l'historique:", err);
    }
  }, []);

  // Sauvegarder l'historique à chaque modification
  useEffect(() => {
    if (history.length > 0) {
      try {
        localStorage.setItem('ffsm-route-history', JSON.stringify(history));
      } catch (err) {
        console.error("Erreur lors de la sauvegarde de l'historique:", err);
      }
    }
  }, [history]);

  // Fonction pour ajouter à l'historique (évite les doublons)
  const addToHistory = useCallback((routeData) => {
    setHistory(prev => {
      // Vérifie si cette route existe déjà
      const exists = prev.some(h => h.routeKey === routeData.routeKey);
      if (exists) {
        console.log("Route déjà dans l'historique");
        return prev;
      }
      
      // Limite l'historique à 50 entrées
      const newHistory = [routeData, ...prev];
      return newHistory.slice(0, 50);
    });
  }, []);

  // Fonction pour effacer tout l'historique
  const clearHistory = () => {
    if (window.confirm("Voulez-vous vraiment effacer tout l'historique ?")) {
      setHistory([]);
      localStorage.removeItem('ffsm-route-history');
    }
  };

  // Fonction pour exporter l'historique en JSON
  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `historique-ffsm-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Fonction pour supprimer une entrée spécifique
  const deleteHistoryItem = (index) => {
    setHistory(prev => prev.filter((_, i) => i !== index));
  };

  if (!isAuthenticated) return null;

  return (
    <section
      id="saritany"
      className={`py-20 px-4 text-white relative overflow-hidden h-160 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800"
          : "bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500"
      }`}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
        Ny Fiangonana FFSM eto Fianarantsoa
      </h2>

      <div className="h-screen w-full relative bg-gray-50">
        <header className="p-4 bg-white shadow-sm flex items-center justify-between z-[9999] relative">
          <h1 className="text-xl font-semibold text-gray-800">
            FFSM — Itinéraire avec détails + historique
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => { setDestination(null); setClickPos(null); }}
              className="px-3 py-2 bg-red-600 text-white text-sm rounded shadow hover:bg-red-700 flex items-center gap-1 transition-colors"
              title="Supprimer l'itinéraire actuel"
            >
              <Trash2 size={16} /> Supprimer
            </button>

            <button
              className="px-3 py-2 bg-blue-600 text-white text-sm rounded shadow flex items-center gap-1 hover:bg-blue-700 transition-colors"
              onClick={() => setShowHistory(true)}
              title="Voir l'historique des itinéraires"
            >
              <History size={16} /> Historique {history.length > 0 && `(${history.length})`}
            </button>
          </div>
        </header>

        {showHistory && (
          <div className="absolute top-20 right-5 bg-white shadow-2xl rounded-lg p-4 w-96 z-[99999] max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-3 pb-3 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Historique ({history.length})
              </h2>
              <button 
                onClick={() => setShowHistory(false)}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded"
                title="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500 mb-2">
                  Aucun itinéraire trouvé.
                </p>
                <p className="text-xs text-gray-400">
                  Cliquez sur la carte puis sur<br />"Calculer itinéraire" dans un popup.
                </p>
              </div>
            ) : (
              <>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={exportHistory}
                    className="flex-1 px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 flex items-center justify-center gap-1 transition-colors"
                    title="Télécharger l'historique en JSON"
                  >
                    <Download size={14} /> Exporter
                  </button>
                  <button
                    onClick={clearHistory}
                    className="flex-1 px-3 py-1.5 bg-red-600 text-white text-xs rounded hover:bg-red-700 flex items-center justify-center gap-1 transition-colors"
                    title="Supprimer tout l'historique"
                  >
                    <Trash2 size={14} /> Effacer tout
                  </button>
                </div>

                <div className="overflow-y-auto space-y-3 flex-1">
                  {history.map((h, i) => (
                    <div key={i} className="border border-gray-200 p-3 rounded-lg text-xs bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-700 mb-1">
                            {new Date(h.date).toLocaleString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <div className="text-gray-600">
                            <strong>Distance:</strong> {(h.distance / 1000).toFixed(2)} km
                          </div>
                          <div className="text-gray-600">
                            <strong>Durée:</strong> {Math.floor(h.duration / 60)} min
                          </div>
                        </div>
                        <button
                          onClick={() => deleteHistoryItem(i)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                          title="Supprimer cette entrée"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <details className="mt-2 cursor-pointer">
                        <summary className="font-semibold text-blue-600 hover:text-blue-800 select-none">
                          Instructions ({h.instructions?.length || 0})
                        </summary>
                        <ul className="list-disc ml-4 mt-2 space-y-1 text-gray-700">
                          {h.instructions?.map((ins, idx) => (
                            <li key={idx}>{ins.text}</li>
                          ))}
                        </ul>
                      </details>

                      <div className="mt-2 pt-2 border-t border-gray-200 text-[10px] text-gray-500">
                        <div>
                          <strong>Départ:</strong> {h.start[0].toFixed(5)}, {h.start[1].toFixed(5)}
                        </div>
                        <div>
                          <strong>Arrivée:</strong> {h.end[0].toFixed(5)}, {h.end[1].toFixed(5)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <main className="p-4 h-[calc(100vh-72px)]">
          <div className="h-90 rounded-lg overflow-hidden shadow-md relative">
            <MapContainer center={center} zoom={13} className="h-full w-full">
              <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                  <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Google Satellite">
                  <TileLayer 
                    url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    attribution='&copy; Google'
                  />
                </LayersControl.BaseLayer>
              </LayersControl>

              <UserClick onMapClick={setClickPos} />

              {churches.map((c, i) => (
                <CircleMarker 
                  key={i} 
                  center={c.coords} 
                  radius={10}
                  pathOptions={{ 
                    color: '#1e40af', 
                    fillColor: '#3b82f6', 
                    fillOpacity: 0.85,
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong className="text-blue-800">{c.name}</strong>
                      <div className="text-xs mt-1 text-gray-600">
                        Lat: {c.coords[0].toFixed(5)}
                      </div>
                      <div className="text-xs text-gray-600">
                        Lng: {c.coords[1].toFixed(5)}
                      </div>
                      <button 
                        onClick={() => setDestination(c.coords)}
                        className="mt-2 w-full px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                      >
                        Calculer itinéraire
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}

              {clickPos && destination && (
                <RoutingMachine 
                  start={clickPos} 
                  end={destination}
                  onSummaryReady={addToHistory}
                />
              )}

              <MouseCoordinates />
            </MapContainer>
          </div>
        </main>
      </div>
    </section>
  );
};

export default MapSection;