/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "@/config/db";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM bts", (err: any, results: []) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      console.log(results);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
