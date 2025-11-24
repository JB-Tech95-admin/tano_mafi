// import {useMap}  from "react-leaflet";

// function UserClick({ onMapClick }) {
//   useMap().on('click', (e) => onMapClick([e.latlng.lat, e.latlng.lng]));
//   return null;
// }

// export default UserClick;

// UserClick.jsx
import { useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

const pulseIcon = L.divIcon({
  className: "pulse-marker",
  iconSize: [20, 20],
  html: `<div class="pulse-dot"></div>`
});

function UserClick({ onMapClick }) {
  const [markerPos, setMarkerPos] = useState(null);

  useMapEvents({
    click(e) {
      const pos = [e.latlng.lat, e.latlng.lng];

      setMarkerPos(pos);   // animation du marqueur
      onMapClick(pos);     // envoi au parent (MapSection)
    }
  });

  return markerPos ? <Marker position={markerPos} icon={pulseIcon} /> : null;
}

export default UserClick;
