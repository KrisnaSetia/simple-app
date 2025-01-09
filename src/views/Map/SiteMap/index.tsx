import LeafletMap from "@/components/Map/SiteMap";
import InfoMap from "@/components/Offcanvas/SiteMap";
import { useState } from "react";
import Head from "next/head";

export default function MapPage() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [chartData, setChartData] = useState<
    {
      site_id: string;
      trx_date: string;
      latitude: number;
      longitude: number;
      total_rev: number;
      total_payload: number;
      total_profit: number;
    }[]
  >([]);

  const handleShow = async (site_id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/site/${site_id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch site data");
      }
      const data = await res.json();
      setChartData(data);
      setShow(true);
    } catch (err) {
      console.error("Error fetching chart data:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setShow(false);
    setChartData([]);
    setLoading(true);
  };
  return (
    <>
      <Head>
        <title>Map Site Level</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/telkomsel.svg" />
      </Head>
      <LeafletMap
      handleShow={handleShow}
       />
       <InfoMap
       show={show}
       btsData = {chartData}
       handleClose={handleClose}
       loading={loading}
       />
    </>
  );
}
