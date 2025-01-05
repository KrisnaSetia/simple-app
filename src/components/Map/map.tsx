import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useEffect, useState } from "react";
import { Icon, divIcon, point } from "leaflet";
import markerBronze from "@/../public/assets/marker/marker-bronze.png";
import markerDiamond from "@/../public/assets/marker/marker-diamond.png";
import markerGold from "@/../public/assets/marker/marker-gold.png";
import markerPlatinum from "@/../public/assets/marker/marker-platinum.png";
import markerSilver from "@/../public/assets/marker/marker-silver.png";
import style from "./Map.module.css";

// Fungsi untuk memilih ikon berdasarkan siteClass
const getCustomIcon = (siteClass: string): Icon => {
  let iconUrl;

  switch (siteClass.toLowerCase()) {
    case "gold":
      iconUrl = markerGold.src;
      break;
    case "bronze":
      iconUrl = markerBronze.src;
      break;
    case "silver":
      iconUrl = markerSilver.src;
      break;
    case "platinum":
      iconUrl = markerPlatinum.src;
      break;
    case "diamond":
      iconUrl = markerDiamond.src;
      break;
    default:
      iconUrl = markerBronze.src; // Default marker jika tidak ada kecocokan
      break;
  }

  return new Icon({
    iconUrl,
    iconSize: [30, 45],
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createClusterCustomIcon = (cluster: any) => {
  return divIcon({
    html: `<div class="${style.clusterIcon}">${cluster.getChildCount()}</div>`,
    className: "",
    iconSize: point(33, 33, true),
  });
};

interface BTSData {
  siteID: string;
  latitude: number;
  longitude: number;
  regional: string;
  kabupaten: string;
  siteClass: string;
}

const MapPage = () => {
  const [btsData, setBtsData] = useState<BTSData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/map");
        const data: BTSData[] = await res.json();
        setBtsData(data);
      } catch (err) {
        console.error("Failed to fetch BTS data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer
      center={[-2.548926, 118.0148634]} // Ganti dengan koordinat pusat area Anda
      zoom={5}
      scrollWheelZoom={true}
      className={style.leafletContainer}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {btsData.map((bts, index) => (
          <Marker
            key={index}
            position={[bts.latitude, bts.longitude]}
            icon={getCustomIcon(bts.siteClass)} // Gunakan ikon berdasarkan siteClass
            eventHandlers={{
              mouseover: (e) => {
                const marker = e.target;
                setTimeout(() => marker.openPopup(), 100); // Tambahkan sedikit delay
              },
              mouseout: (e) => {
                const marker = e.target;
                setTimeout(() => marker.closePopup(), 100); // Tambahkan sedikit delay
              },
            }}
          >
            <Popup>
            <h6>
                <strong>
                  Site ID:{" "}
                  {bts.siteID.length > 10
                    ? `${bts.siteID.slice(0, 10)}...`
                    : bts.siteID}
                </strong>
              </h6>
              <p>
                <strong>Regional</strong> : {bts.regional}
              </p>
              <p>
                <strong>Kabupaten</strong> : {bts.kabupaten}
              </p>
              <p>
                <strong>Site Class</strong> : {bts.siteClass}
              </p>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapPage;
