import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/../db";

export default async function getAllRegion(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
      }
      // Menghubungkan ke database
      const db = await connectDatabase();
      // Query ke database
      db.query(
        "SELECT id,region,jumlah_kabupaten, jumlah_site, total_rev, total_traffic, total_payload from bts_region",
        (err, results) => {
          if (err) {
            console.error("Error executing query:", err);
            return res
              .status(500)
              .json({ error: "Failed to fetch site location" });
          }
          // Kirim hasil query sebagai response
          return res.status(200).json(results);
        }
      );
    } catch (err) {
      console.error("Error connecting to database:", err);
      res.status(500).json({ error: "Database connection failed" });
    }
  }
  