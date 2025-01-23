/* eslint-disable @typescript-eslint/no-explicit-any */
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import style from "./MapCity.module.css";
import { GeoJsonObject, Feature, Geometry } from "geojson";
import dataCity from "@/data/citygeo.json";
import LoadingScreen from "@/components/LoadingScreen";
import { useSearch } from "@/hooks/useSearch";
import Accordion from "react-bootstrap/Accordion";

interface CityData {
  id: number;
  kabupaten: string;
  jumlah_site: number;
  total_rev: number;
  total_traffic: number;
  total_payload: number;
  category?: string;
}

type MetricType = "total_payload" | "total_rev" | "total_traffic";

const MapProps = () => {
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] =
    useState<MetricType>("total_payload");
  // Contoh di CityMap
  const { filteredData, searchQuery } = useSearch(cityData, {
    fields: ["kabupaten"], // Hanya cari berdasarkan nama kota dan provinsi
    exact: false, // Gunakan partial matching
  });

  // Definisi kategori dan warna dengan urutan baru
  const categories = {
    Platinum: "#90EE90",
    Diamond: "#B8F1C7",
    Gold: "#FFD700",
    Silver: "#FF9E5E",
    Bronze: "#FF4040",
  };

  const metricLabels = {
    total_payload: "Payload",
    total_rev: "Revenue",
    total_traffic: "Traffic",
  };

  // Fungsi untuk menghitung kategori berdasarkan metrik yang dipilih
  const calculateCategories = (data: CityData[], metric: MetricType) => {
    const sortedData = [...data].sort((a, b) => b[metric] - a[metric]);
    const itemsPerCategory = Math.ceil(sortedData.length / 5);

    return sortedData.map((city, index) => ({
      ...city,
      category:
        index < itemsPerCategory
          ? "Platinum"
          : index < itemsPerCategory * 2
          ? "Diamond"
          : index < itemsPerCategory * 3
          ? "Gold"
          : index < itemsPerCategory * 4
          ? "Silver"
          : "Bronze",
    }));
  };

  // Ambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/city");
        const data = await response.json();
        const categorizedData = calculateCategories(data, selectedMetric);
        setCityData(categorizedData);
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
    if (!feature || !feature.properties || !feature.properties.KABUPATEN) {
      return {
        color: "#cccccc",
        weight: 0,
        fillColor: "transparent",
        fillOpacity: 0,
      };
    }

    const cityInfo = cityData.find(
      (city) =>
        city.kabupaten.toUpperCase() ===
        feature.properties.KABUPATEN.toUpperCase()
    );

    // Jika ada pencarian aktif, cek apakah kota ada dalam filteredData
    if (searchQuery) {
      const isFiltered = filteredData.some(
        (city) =>
          city.kabupaten.toUpperCase() ===
          feature.properties.KABUPATEN.toUpperCase()
      );
      // Jika tidak ada dalam filteredData, buat transparan
      if (!isFiltered && cityInfo && cityInfo.category) {
        return {
          color: "#666",
          weight: 1,
          fillColor: "#cccccc",
          fillOpacity: 0.1,
        };
      }
    }
    // Tampilkan style normal jika tidak ada pencarian atau kota termasuk dalam hasil pencarian
    if (cityInfo && cityInfo.category) {
      return {
        color: "#666",
        weight: 1,
        fillColor: categories[cityInfo.category as keyof typeof categories],
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
    if (feature.properties && feature.properties.KABUPATEN) {
      layer.on({
        click: () => {
          const cityInfo = cityData.find(
            (city) =>
              city.kabupaten.toUpperCase() ===
              feature.properties.KABUPATEN.toUpperCase()
          );

          if (cityInfo) {
            const formattedRev = new Intl.NumberFormat("id-ID").format(
              cityInfo.total_rev
            );
            const formattedTraffic = new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(cityInfo.total_traffic);
            const formattedPayload = new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(cityInfo.total_payload);
            const popupContent = `
            <div style="margin: 0 0 1rem 0;">
              <h5 style="margin: 5px 0; color:#be1e1e"><strong> ${feature.properties.KABUPATEN}</strong></h5>
              <p style="margin: 5px 0;">Total Site: ${cityInfo.jumlah_site} Site</p>
              </div>
              <p style="margin: 5px 0;"><strong>Total Revenue:</strong> Rp ${formattedRev}</p>
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

  // Tambahkan komponen GeneralInfo
  const GeneralInfo = () => {
    // Hitung total kabupaten dan site
    const totalKabupaten = cityData.length;
    const totalSite = cityData.reduce((sum, city) => sum + city.jumlah_site, 0);
    return (
      <Accordion className={style.generalInfoContainer}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h6 className={style.generalInfoTitle}>City Map Information</h6>
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
          key={`${cityData.length}-${selectedMetric}`}
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
