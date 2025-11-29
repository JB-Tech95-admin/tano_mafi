// RoutingMachine.jsx - VERSION FINALE POUR VITE
import { useEffect, useRef, useCallback } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Imports pour Vite
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

function RoutingMachine({ start, end, onSummaryReady }) {
  const map = useMap();
  const controlRef = useRef(null);
  const lastRouteRef = useRef(null);

  const handleRouteFound = useCallback((e) => {
    const route = e.routes[0];
    if (!route || !onSummaryReady) return;

    const routeKey = `${start[0]},${start[1]}-${end[0]},${end[1]}`;
    
    if (lastRouteRef.current === routeKey) return;
    lastRouteRef.current = routeKey;

    onSummaryReady({
      distance: route.summary.totalDistance,
      duration: route.summary.totalTime,
      instructions: route.instructions.map(ins => ({
        text: ins.text,
        distance: ins.distance || 0,
        time: ins.time || 0
      })),
      start,
      end,
      date: new Date().toISOString(),
      routeKey
    });
  }, [start, end, onSummaryReady]);

  useEffect(() => {
    if (!start || !end) return;

    // Vérifie que L.Routing est disponible
    if (!L.Routing || typeof L.Routing.control !== 'function') {
      console.error('❌ L.Routing.control non disponible');
      console.log('Assurez-vous d\'avoir installé: npm install leaflet-routing-machine');
      return;
    }

    // Supprime l'ancien contrôle
    if (controlRef.current) {
      try {
        map.removeControl(controlRef.current);
      } catch (err) {
        console.warn("Erreur suppression:", err);
      }
    }

    try {
      const control = L.Routing.control({
        waypoints: [
          L.latLng(start[0], start[1]), 
          L.latLng(end[0], end[1])
        ],
        lineOptions: { 
          styles: [{ 
            color: "#1e40af", 
            weight: 5, 
            opacity: 0.8 
          }]
        },
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        createMarker: () => null
      });

      control.on("routesfound", handleRouteFound);
      control.on("routingerror", (e) => {
        console.error("Erreur routage:", e.error);
      });
      
      control.addTo(map);
      controlRef.current = control;
    } catch (err) {
      console.error("Erreur création contrôle:", err);
    }

    return () => {
      if (controlRef.current) {
        try {
          map.removeControl(controlRef.current);
        } catch (err) {
          console.warn("Erreur nettoyage:", err);
        }
        controlRef.current = null;
      }
    };
  }, [start, end, map, handleRouteFound]);

  return null;
}

export default RoutingMachine;