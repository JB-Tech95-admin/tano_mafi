// RoutingMachine.jsx
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

function RoutingMachine({ start, end, onSummaryReady }) {
  const map = useMap();
  const controlRef = useRef(null);

  useEffect(() => {
    if (!start || !end) return;

    // Supprime l'ancien itinéraire si existant
    if (controlRef.current) map.removeControl(controlRef.current);

    // Crée un nouveau contrôle de routage
    const control = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      lineOptions: { styles: [{ color: "#1e40af", weight: 5 }] },
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      router: L.Routing.osrmv1() // ← aucun import supplémentaire nécessaire
    })
      .on("routesfound", (e) => {
        const route = e.routes[0];
        if (route && onSummaryReady) {
          onSummaryReady({
            distance: route.summary.totalDistance,
            duration: route.summary.totalTime,
            instructions: route.instructions,
            start,
            end,
            date: new Date()
          });
        }
      })
      .addTo(map);

    controlRef.current = control;

    return () => {
      if (controlRef.current) map.removeControl(controlRef.current);
    };
  }, [start, end, map, onSummaryReady]);

  return null;
}

export default RoutingMachine;
