import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Icon, divIcon, point } from "leaflet";
import markerBronze from "@/../public/assets/marker/marker-bronze.png";
import style from "./Map.module.css";

// Custom marker icon
const customIcon = new Icon({
  iconUrl: markerBronze.src,
  iconSize: [30, 45],
});

// Marker data
const markers = [
  {
    geocode: [48.86, 2.3522] as [number, number],
    popUp: "Hello, I am pop up 1",
  },
  {
    geocode: [48.85, 2.3522] as [number, number],
    popUp: "Hello, I am pop up 2",
  },
  {
    geocode: [48.855, 2.34] as [number, number],
    popUp: "Hello, I am pop up 3",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createClusterCustomIcon = (cluster: any) => {
  return divIcon({
    html: `<div class="${style.clusterIcon}">${cluster.getChildCount()}</div>`,
    className: "", // Jangan gunakan class default untuk menghindari konflik
    iconSize: point(33, 33, true),
  });
};

const MapPage = () => {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={10}
      scrollWheelZoom={true}
      className={style.leafletContainer}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Cluster wrapper */}
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapPage;
