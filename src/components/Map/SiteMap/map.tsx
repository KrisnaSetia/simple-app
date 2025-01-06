import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useEffect, useState } from "react";
import { Icon, divIcon, point } from "leaflet";
import { Offcanvas } from "react-bootstrap";
import markerBronze from "@/../public/assets/marker/marker-bronze.png";
import style from "./Map.module.css";

const customIcon = new Icon({
  iconUrl: markerBronze.src,
  iconSize: [30, 45], // Ukuran ikon
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createClusterCustomIcon = (cluster: any) => {
  return divIcon({
    html: `<div class="${style.clusterIcon}">${cluster.getChildCount()}</div>`,
    className: "",
    iconSize: point(33, 33, true),
  });
};

interface BTSData {
  site_id: string;
  latitude: number;
  longitude: number;
}

const MapPage = () => {
  const [btsData, setBtsData] = useState<BTSData[]>([]);
  const [selectedBTS, setSelectedBTS] = useState<BTSData | null>(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/map/site");
        const data: BTSData[] = await res.json();
        setBtsData(data);
      } catch (err) {
        console.error("Failed to fetch BTS data:", err);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (bts: BTSData) => {
    setSelectedBTS(bts);
    setShowOffcanvas(true);
  };

  return (
    <>
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
                click: () => handleMarkerClick(bts),
              }}
            >
              <Popup>
                <h6>
                  <strong>
                    Site ID:{" "}
                    {bts.site_id.length > 10
                      ? `${bts.site_id.slice(0, 10)}...`
                      : bts.site_id}
                  </strong>
                </h6>
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

      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h4>Detail BTS Tower</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedBTS ? (
            <div>
              <p>
                <strong>Site ID:</strong> {selectedBTS.site_id}
              </p>
              <p>
                <strong>Latitude:</strong> {selectedBTS.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {selectedBTS.longitude}
              </p>
            </div>
          ) : (
            <p>Tidak ada data BTS yang dipilih.</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MapPage;





// import markerDiamond from "@/../public/assets/marker/marker-diamond.png";
// import markerGold from "@/../public/assets/marker/marker-gold.png";
// import markerPlatinum from "@/../public/assets/marker/marker-platinum.png";
// import markerSilver from "@/../public/assets/marker/marker-silver.png";

// Fungsi untuk memilih ikon berdasarkan siteClass
// const getCustomIcon = (siteClass: string): Icon => {
//   let iconUrl;

//   switch (siteClass.toLowerCase()) {
//     case "gold":
//       iconUrl = markerGold.src;
//       break;
//     case "bronze":
//       iconUrl = markerBronze.src;
//       break;
//     case "silver":
//       iconUrl = markerSilver.src;
//       break;
//     case "platinum":
//       iconUrl = markerPlatinum.src;
//       break;
//     case "diamond":
//       iconUrl = markerDiamond.src;
//       break;
//     default:
//       iconUrl = markerBronze.src; // Default marker jika tidak ada kecocokan
//       break;
//   }

//   return new Icon({
//     iconUrl,
//     iconSize: [30, 45],
//   });
// };
