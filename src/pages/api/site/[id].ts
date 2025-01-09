import { NextApiRequest, NextApiResponse } from "next";
import {connectDatabase} from "@/../db";

export default async function getSiteById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    const db = await connectDatabase();
    db.query("SELECT site_id,longitude,latitude FROM location_bts_2 WHERE site_id = ?", [req.query.id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Failed to fetch site" });
      }
      res.status(200).json(results);
    });
  }catch(err){
    console.error("Error connecting to database:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
}
