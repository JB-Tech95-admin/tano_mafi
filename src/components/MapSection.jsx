// MapSection.jsx
import { useState } from "react";
import churches from "../dataset/churches";

import MouseCoordinates from "./carteComponents/MouseCoordinates";
import RoutingMachine from "./carteComponents/RoutingMachine";
import UserClick from "./carteComponents/UserClick";

import { Trash2, History as HistoryIcon } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, LayersControl, Popup } from "react-leaflet";

const MapSection = ({ darkMode, isAuthenticated }) => {
  const [clickPos, setClickPos] = useState(null);
  const [destination, setDestination] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const center = [-21.4415, 47.105];

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
          <h1 className="text-xl font-semibold">
            FFSM — Itinéraire avec détails + historique
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => { setDestination(null); setClickPos(null); }}
              className="px-3 py-2 bg-red-600 text-white text-sm rounded shadow hover:bg-red-700 flex items-center gap-1"
            >
              <Trash2 size={16} /> Supprimer itinéraire
            </button>

            <button
              className="px-3 py-2 bg-blue-600 text-white text-sm rounded shadow flex items-center gap-1 hover:bg-blue-700"
              onClick={() => setShowHistory(true)}
            >
              <HistoryIcon size={16} /> Historique
            </button>
          </div>
        </header>

        {showHistory && (
          <div className="absolute top-20 right-5 bg-white shadow-lg rounded-lg p-4 w-80 z-[99999]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Historique</h2>
              <button onClick={() => setShowHistory(false)}>X</button>
            </div>

            {history.length === 0 ? (
              <p className="text-sm text-gray-500">Aucun itinéraire trouvé.</p>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-3">
                {history.map((h, i) => (
                  <div key={i} className="border p-2 rounded text-xs bg-gray-50 shadow">
                    <div><strong>Date:</strong> {new Date(h.date).toLocaleString()}</div>
                    <div><strong>Distance:</strong> {(h.distance / 1000).toFixed(2)} km</div>
                    <div><strong>Durée:</strong> {(h.duration / 60).toFixed(1)} min</div>
                    <details className="mt-1 cursor-pointer">
                      <summary className="font-semibold">Instructions</summary>
                      <ul className="list-disc ml-4 mt-1">
                        {h.instructions.map((ins, idx) => (<li key={idx}>{ins.text}</li>))}
                      </ul>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <main className="p-4 h-[calc(100vh-72px)]">
          <div className="h-90 rounded-lg overflow-hidden shadow-md relative">
            <MapContainer center={center} zoom={13} className="h-full w-full">
              <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Google Satellite">
                  <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
                </LayersControl.BaseLayer>
              </LayersControl>

              <UserClick onMapClick={setClickPos} />

              {churches.map((c, i) => (
                <CircleMarker key={i} center={c.coords} radius={10}
                  pathOptions={{ color: '#1e40af', fillColor: '#1e40af', fillOpacity: 0.85 }}>
                  <Popup>
                    <div className="text-sm">
                      <strong>{c.name}</strong>
                      <div className="text-xs mt-1">Lat: {c.coords[0]}</div>
                      <div className="text-xs">Lng: {c.coords[1]}</div>
                      <button onClick={() => setDestination(c.coords)}
                        className="mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                        Calculer itinéraire
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}

              {clickPos && destination && (
                <RoutingMachine start={clickPos} end={destination}
                  onSummaryReady={(sum) =>
                    setHistory((prev) => [...prev, { ...sum, instructions: [...sum.instructions] }])
                  }
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
