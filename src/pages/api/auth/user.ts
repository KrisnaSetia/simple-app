/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/../db";
import jwt from "jsonwebtoken";
import "dotenv/config";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Ambil token dari cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is required");
    }

    // Verifikasi token
    const decoded = jwt.verify(token, secret) as { userId: number };

    // Ambil data user dari database
    const db = await connectDatabase();
    const findUser = `SELECT id, username, email FROM users WHERE id = ?`;

    db.query(findUser, [decoded.userId], (error: any, results: any) => {
      db.end();
      if (error) {
        return res.status(500).json({ message: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user: results[0] });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
