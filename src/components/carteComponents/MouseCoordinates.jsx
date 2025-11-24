// MouseCoordinates.jsx
import { useMapEvents } from "react-leaflet";
import { useState } from "react";

function MouseCoordinates() {
  const [pos, setPos] = useState(null);

  useMapEvents({
    mousemove(e) {
      setPos({
        lat: e.latlng.lat.toFixed(6),
        lng: e.latlng.lng.toFixed(6)
      });
    }
  });

  return (
    <div
      className="absolute bottom-4 left-4 z-[99999] bg-white text-black px-3 py-1 rounded shadow text-sm"
    >
      {pos ? (
        <>
          <div>Lat: {pos.lat}</div>
          <div>Lng: {pos.lng}</div>
        </>
      ) : (
        "Déplacez la souris"
      )}
    </div>
  );
}

export default MouseCoordinates;
