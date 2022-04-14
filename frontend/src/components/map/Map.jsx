import React from "react";
import GoogleMapReact from "google-map-react";

const GOOGLE_MAPS_KEY = "AIzaSyBfeqs1GhZbXfzKvPihZxYJz3y4h--W5ZM";

export default function Map({ location, height, width, zoom }) {
  const handleApiLoaded = (map, maps) => {
    maps.Marker({
      position: location,
      map,
    });
  };
  return (
    <div style={{ height: height, width: width }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
        defaultCenter={location}
        defaultZoom={zoom}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      />
    </div>
  );
}
