import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// ⚠️ rendre L global pour leaflet-routing-machine
window.L = L;
L.Routing = L.Routing || {};
