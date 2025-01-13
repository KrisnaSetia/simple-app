import { NextApiRequest, NextApiResponse } from "next";
import {connectDatabase} from "@/../db";

export default async function getRegionById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    const db = await connectDatabase();
    db.query("SELECT * FROM bts_region WHERE id= ?", [req.query.id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Failed to fetch products" });
      }
      res.status(200).json(results);
    });
  }catch(err){
    console.error("Error connecting to database:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
}
