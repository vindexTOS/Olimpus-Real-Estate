import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ lat, lng }: { lat: any; lng: any }) {
  const position = [lat, lng];

  return (
    <MapContainer
      // @ts-ignore
      center={position}
      zoom={13}
      style={{ height: "350px", width: "350px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // @ts-ignore
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
}
