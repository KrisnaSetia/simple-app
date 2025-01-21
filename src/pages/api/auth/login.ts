/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import "dotenv/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password harus diisi" });
    }
    const db = await connectDatabase();
    // Cari user berdasarkan email
    const findUser = `SELECT * FROM users WHERE email = ?`;
    db.query(findUser, [email], async (error: any, results: any) => {
      db.end();
      if (error) {
        return res.status(500).json({ message: "Database error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Email atau password salah" });
      }
      const user = results[0];
      // Verifikasi password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Email atau password salah" });
      }
      // Buat JWT token
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET environment variable is required");
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, secret, {
        expiresIn: "1h",
      });

      // Set cookie
      const tokenCookie = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600, // 24 hours
        path: "/",
      });

      // Set header untuk cookie
      res.setHeader("Set-Cookie", tokenCookie);

      return res.status(200).json({
        message: "Login berhasil",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
