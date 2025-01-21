/* eslint-disable @typescript-eslint/no-explicit-any */
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import style from "./MapRegion.module.css";
import { GeoJsonObject, Feature, Geometry } from "geojson";
import dataCity from "@/data/citygeo.json";
import LoadingScreen from "@/components/LoadingScreen";
import { useSearch } from "@/hooks/useSearch";
import Accordion  from "react-bootstrap/Accordion";

interface RegionData {
  id: number;
  region: string;
  jumlah_kabupaten: number;
  jumlah_site: number;
  total_rev: number;
  total_traffic: number;
  total_payload: number;
  category?: string;
}

type MetricType = "total_payload" | "total_rev" | "total_traffic";

const MapProps = () => {
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] =
    useState<MetricType>("total_payload");
  const { filteredData, searchQuery } = useSearch(regionData, {
    fields: ["region"], // Hanya cari berdasarkan nama kota dan provinsi
    exact: false, // Gunakan partial matching
  });

  // Definisi kategori dan warna dengan urutan baru
  const categories = {
    High: "#90EE90",
    Medium: "#FFD700",
    Low: "#FF4040",
  };

  const metricLabels = {
    total_payload: "Payload",
    total_rev: "Revenue",
    total_traffic: "Traffic",
  };

  const calculateCategories = (data: RegionData[], metric: MetricType) => {
    const sortedData = [...data].sort((a, b) => b[metric] - a[metric]);
    const itemsPerCategory = Math.ceil(sortedData.length / 3);

    return sortedData.map((city, index) => ({
      ...city,
      category:
        index < itemsPerCategory
          ? "High"
          : index < itemsPerCategory * 2
          ? "Medium"
          : index < itemsPerCategory * 3
          ? "Low"
          : "Low",
    }));
  };

  // Ambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/region");
        const data = await response.json();
        const categorizedData = calculateCategories(data, selectedMetric);
        setRegionData(categorizedData);
      } catch (error) {
        console.error("Error fetching city data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedMetric]);

  // Tentukan gaya untuk GeoJSON
  const geoJSONStyle = (feature: Feature<Geometry, any> | undefined) => {
    if (!feature || !feature.properties || !feature.properties.REGION) {
      return {
        color: "#cccccc",
        weight: 0,
        fillColor: "transparent",
        fillOpacity: 0,
      };
    }

    const regionInfo = regionData.find(
      (region) =>
        region.region.toUpperCase() === feature.properties.REGION.toUpperCase()
    );
    if (searchQuery) {
      const isFiltered = filteredData.some(
        (region) =>
          region.region.toUpperCase() ===
          feature.properties.REGION.toUpperCase()
      );
      // Jika tidak ada dalam filteredData, buat transparan
      if (!isFiltered && regionInfo && regionInfo.category) {
        return {
          color: "#666",
          weight: 1,
          fillColor: "#cccccc",
          fillOpacity: 0.1,
        };
      }
    }
    if (regionInfo && regionInfo.category) {
      return {
        color: "#666",
        weight: 1,
        fillColor: categories[regionInfo.category as keyof typeof categories],
        fillOpacity: 0.7,
      };
    }

    return {
      color: "#cccccc",
      weight: 0,
      fillColor: "transparent",
      fillOpacity: 0,
    };
  };
  // Fungsi untuk menangani popup
  const onEachFeature = (feature: Feature<Geometry, any>, layer: any) => {
    if (feature.properties && feature.properties.REGION) {
      layer.on({
        click: () => {
          const regionInfo = regionData.find(
            (region) =>
              region.region.toUpperCase() ===
              feature.properties.REGION.toUpperCase()
          );

          if (regionInfo) {
            const formattedRev = new Intl.NumberFormat("id-ID").format(
              regionInfo.total_rev
            );
            const formattedTraffic = new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(regionInfo.total_traffic);
            const formattedPayload = new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(regionInfo.total_payload);
            const popupContent = `
            <div style="margin: 0 0 1rem 0;">
              <h5 style="margin: 5px 0; color:#be1e1e;"><strong>${feature.properties.REGION}</strong></h5>
              <p style="margin: 5px 0;">Total Kabupaten: ${regionInfo.jumlah_kabupaten} Kota/Kabupaten</p>
              <p style="margin: 5px 0;">Total Site: ${regionInfo.jumlah_site} Site</p>
              </div>
              <p style="margin: 5px 0;"><strong>Total Revenue:</strong> Rp ${formattedRev} </p>
              <p style="margin: 5px 0;"><strong>Total Traffic:</strong> ${formattedTraffic}</p>
              <p style="margin: 5px 0;"><strong>Total Payload:</strong> ${formattedPayload}</p>
            `;

            layer.bindPopup(popupContent).openPopup();
          }
        },
      });
    }
  };
  // Komponen Dropdown
  const MetricSelector = () => {
    return (
      <div className={style.metricSelector}>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
        >
          {Object.entries(metricLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // Komponen Legend
  const Legend = () => {
    return (
      <div className={style.legendContainer}>
        <h6 className={style.legendTitle}>
          Legend - {metricLabels[selectedMetric]}
        </h6>
        {Object.entries(categories).map(([category, color]) => (
          <div key={category} className={style.legendItem}>
            <div
              className={style.legendColorBox}
              style={{ backgroundColor: color }}
            ></div>
            <span>{category}</span>
          </div>
        ))}
      </div>
    );
  };

  const GeneralInfo = () => {
    // Hitung total kabupaten dan site
    const totalKabupaten = regionData.reduce(
      (sum, region) => sum + region.jumlah_kabupaten,
      0
    );
    const totalSite = regionData.reduce(
      (sum, region) => sum + region.jumlah_site,
      0
    );

    return (
      <Accordion defaultActiveKey="0" className={style.generalInfoContainer}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
          <h6 className={style.generalInfoTitle}>Regional Map Information</h6>
          </Accordion.Header>
          <Accordion.Body>
          <div className={style.generalInfoContent}>
          <div className={style.generalInfoItem}>
            <span className={style.generalInfoLabel}>Region:</span>
            <span className={style.generalInfoValue}>
              JATIM - JATENG - BALI NUSRA
            </span>
          </div>
          <div className={style.generalInfoItem}>
            <span className={style.generalInfoLabel}>Total Kabupaten:</span>
            <span className={style.generalInfoValue}>{totalKabupaten}</span>
          </div>
          <div className={style.generalInfoItem}>
            <span className={style.generalInfoLabel}>Total Site:</span>
            <span className={style.generalInfoValue}>
              {totalSite.toLocaleString()}
            </span>
          </div>
          <div className={style.generalInfoItem}>
            <span className={style.generalInfoLabel}>Periode:</span>
            <span className={style.generalInfoValue}>
              Oktober - Desember 2024
            </span>
          </div>
        </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[-7.798079, 116.176679]}
        zoom={6}
        scrollWheelZoom={true}
        className={style.leafletContainer}
      >
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <GeoJSON
          key={`${regionData.length}-${selectedMetric}`}
          data={dataCity as GeoJsonObject}
          style={geoJSONStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
      <MetricSelector />
      <GeneralInfo />
      <Legend />
    </div>
  );
};

export default MapProps;
