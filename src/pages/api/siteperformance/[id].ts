import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/../db";
import { RowDataPacket } from "mysql2";

interface PerformanceData {
  trx_date: string;
  total_rev: number;
  total_payload: number;
  total_traffic: number;
}

interface GeneralInfo {
  site_id: string;
  latitude: number;
  longitude: number;
}

export default async function getSiteById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await connectDatabase();

    db.query(
      `
      SELECT 
        lb.site_id,
        lb.longitude,
        lb.latitude,
        trx_date,
        total_rev,
        total_payload,
        total_traffic
      FROM 
        daily_agg d 
      JOIN 
        location_bts_2 lb 
      ON 
        d.site_id = lb.site_id 
      WHERE 
        lb.site_id = ?
      `,
      [req.query.id],
      (err, results: RowDataPacket[]) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Failed to fetch site" });
        }

        if (!results.length) {
          return res.status(404).json({ error: "Site not found" });
        }

        // Ambil data umum dari baris pertama
        const generalInfo: GeneralInfo = {
          site_id: results[0].site_id,
          latitude: results[0].latitude,
          longitude: results[0].longitude,
        };

        // Ambil data performa dari semua baris
        const performance: PerformanceData[] = results.map((row) => ({
          trx_date: row.trx_date,
          total_rev: row.total_rev,
          total_payload: row.total_payload,
          total_traffic: row.total_traffic,
        }));

        // Kembalikan data dalam format terstruktur
        res.status(200).json({ ...generalInfo, performance });
      }
    );
  } catch (err) {
    console.error("Error connecting to database:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
}
