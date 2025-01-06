/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(
          "SELECT site_id, latitude, longitude FROM location_bts_2",
          (err: any, results: []) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });

      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
