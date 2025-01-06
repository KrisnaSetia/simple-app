import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import style from "./MapRegion.module.css";

const MapPage = () => {
  return (
    <MapContainer
      center={[-7.384258, 110.70186]} // Ganti dengan koordinat pusat area Anda
      zoom={7}
      scrollWheelZoom={true}
      className={style.leafletContainer}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MapPage;
