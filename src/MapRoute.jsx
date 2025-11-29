import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { Trash2, History as HistoryIcon } from "lucide-react";

const churches = [
  { name: 'Tambohobe', coords: [-21.443080, 47.086902] },
  { name: 'Mitsinjososa', coords: [-21.432157, 47.095955] },
  { name: 'Soamiafara', coords: [-21.431784, 47.116308] },
  { name: 'Toby', coords: [-21.447011, 47.104332] },
  { name: 'Manaotsara', coords: [-21.449015, 47.103356] },
  { name: 'Mangarivotra', coords: [-21.440634, 47.116734] },
];

function RoutingMachine({ start, end, onSummaryReady }) {
  const map = useMap();
  const controlRef = useRef(null);

  useEffect(() => {
    if (!start || !end) return;

    if (controlRef.current) map.removeControl(controlRef.current);

    const control = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      show: false,
      draggableWaypoints: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: '#1e40af', weight: 5 }]
      },
      router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' })
    })
      .on('routesfound', function (e) {
        const route = e.routes[0];
        const summary = {
          distance: route.summary.totalDistance,
          duration: route.summary.totalTime,
          instructions: route.instructions,
          start,
          end,
          date: new Date(),
        };
        onSummaryReady(summary);
      })
      .addTo(map);

    controlRef.current = control;

    return () => {
      if (controlRef.current) map.removeControl(controlRef.current);
    };
  }, [start, end]);

  return null;
}

export default function CarteFFSM() {
  const center = [-21.4415, 47.105];

  const [clickPos, setClickPos] = useState(null);
  const [destination, setDestination] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const clearRoute = () => {
    setDestination(null);
    setClickPos(null);
  };

  function UserClick() {
    useMap().on('click', (e) => setClickPos([e.latlng.lat, e.latlng.lng]));
    return null;
  }

  return (
    <div className="h-screen w-full relative bg-gray-50">

      <header className="p-4 bg-white shadow-sm flex items-center justify-between z-[9999]">
        <h1 className="text-xl font-semibold">FFSM — Itinéraire avec détails + historique</h1>

        <div className="flex gap-3">
          <button
            onClick={clearRoute}
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

      {/* POPUP HISTORIQUE */}
      {showHistory && (
        <div className="absolute top-20 right-5 bg-white shadow-lg rounded-lg p-4 w-80 z-[9999]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Historique</h2>
            <button onClick={() => setShowHistory(false)}>X</button>
          </div>

          {history.length === 0 ? (
            <p className="text-sm text-gray-500">Aucun itinéraire trouvé.</p>
          ) : (
            <div className="max-h-72 overflow-y-auto space-y-3">
              {history.map((h, i) => (
                <div key={i} className="border p-2 rounded text-xs bg-gray-50">
                  <div><strong>Date:</strong> {h.date.toLocaleString()}</div>
                  <div><strong>Distance:</strong> {(h.distance / 1000).toFixed(2)} km</div>
                  <div><strong>Durée:</strong> {(h.duration / 60).toFixed(1)} min</div>

                  <details className="mt-1 cursor-pointer">
                    <summary className="font-semibold">Instructions</summary>
                    <ul className="list-disc ml-4 mt-1">
                      {h.instructions.map((ins, idx) => (
                        <li key={idx}>{ins.text}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <main className="p-4 h-[calc(100vh-72px)]">
        <div className="h-full rounded-lg overflow-hidden shadow-md relative">
          <MapContainer center={center} zoom={13} className="h-full w-full">

            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Google Satellite">
                <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
              </LayersControl.BaseLayer>
            </LayersControl>

            <UserClick />

            {churches.map((c, i) => (
              <CircleMarker
                key={i}
                center={c.coords}
                radius={10}
                pathOptions={{ color: '#1e40af', fillColor: '#1e40af', fillOpacity: 0.85 }}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{c.name}</strong>
                    <div className="text-xs mt-1">Lat: {c.coords[0]}</div>
                    <div className="text-xs">Lng: {c.coords[1]}</div>
                    <button
                      onClick={() => setDestination(c.coords)}
                      className="mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >Calculer itinéraire</button>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

            {clickPos && destination && (
              <RoutingMachine
                start={clickPos}
                end={destination}
                onSummaryReady={(sum) => setHistory((prev) => [...prev, sum])}
              />
            )}

          </MapContainer>
        </div>
      </main>

      <footer className="p-3 text-xs text-gray-500 text-center">FFSM — Instructions, durée, distance, historique popup</footer>
    </div>
  );
}