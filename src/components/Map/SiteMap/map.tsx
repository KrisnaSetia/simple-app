/* eslint-disable @typescript-eslint/no-explicit-any */
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Icon, divIcon, point } from "leaflet";
import style from "./Map.module.css";
import markerBronze from "@/../public/assets/marker/marker-bronze.png";
import { useEffect, useState } from "react";

const customIcon = new Icon({
  iconUrl: markerBronze.src,
  iconSize: [30, 45], // Ukuran ikon
});

const createClusterCustomIcon = (cluster: any) => {
  return divIcon({
    html: `<div class="${style.clusterIcon}">${cluster.getChildCount()}</div>`,
    className: "",
    iconSize: point(33, 33, true),
  });
};

interface BTSData {
  site_id: string;
  longitude: number;
  latitude: number;
  trx_date: string;
  total_rev: number;
  total_traffic: number;
  total_payload: number;
}

interface SiteMapInfo{
  handleShow:(site_id : string)=> void;
}

const MapPage: React.FC<SiteMapInfo> = ({handleShow}) => {
  const [btsData, setBtsData] = useState<BTSData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/site");
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
      center={[-7.863382, 114.757731]} // Ganti dengan koordinat pusat area Anda
      zoom={6}
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
            icon={customIcon}
            eventHandlers={{
              mouseover: (e) => {
                const marker = e.target;
                setTimeout(() => marker.openPopup(), 100); // Tambahkan sedikit delay
              },
              mouseout: (e) => {
                const marker = e.target;
                setTimeout(() => marker.closePopup(), 100); // Tambahkan sedikit delay
              },
              click: () => handleShow(bts.site_id),
            }}
          >
            <Popup>
              <p><strong>Site ID: </strong>{bts.site_id}</p>
              {/* <h6>
                <strong>
                  Site ID:{" "}
                  {bts.site_id.length > 10
                    ? `${bts.site_id.slice(0, 10)}...`
                    : bts.site_id}
                </strong>
              </h6> */}
              <p>
                <strong>Latitude</strong>: {bts.latitude}
              </p>
              <p>
                <strong>Longitude</strong>: {bts.longitude}
              </p>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapPage;
