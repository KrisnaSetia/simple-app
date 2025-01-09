import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/../db";

export default async function getAllSitesPerformance(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Menghubungkan ke database
    const db = await connectDatabase();
    // Query ke database
    db.query(
      "SELECT lb.site_id,trx_date,total_rev,total_traffic,total_payload from daily_agg d inner join location_bts_2 lb on d.site_id = lb.site_id",
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return res
            .status(500)
            .json({ error: "Failed to fetch site performance" });
        }
        // Kirim hasil query sebagai response
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.error("Error connecting to database:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
}
