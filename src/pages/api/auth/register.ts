/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/../db";
import bcrypt from "bcrypt";
import { UserData } from "@/types/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { username, email, password }: UserData = req.body;
    // Validasi input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }
    const db = await connectDatabase();
    // Cek apakah email sudah terdaftar
    const checkEmail = `SELECT * FROM users WHERE email = ?`;
    db.query(checkEmail, [email], async (error: any, results: any) => {
      if (error) {
        db.end();
        return res.status(500).json({ message: "Database error" });
      }
      if (results.length > 0) {
        db.end();
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Insert user baru
      const insertUser = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
      db.query(insertUser, [username, email, hashedPassword], (error: any) => {
        db.end();
        if (error) {
          return res.status(500).json({ message: "Gagal mendaftarkan user" });
        }
        return res.status(201).json({ message: "Registrasi berhasil" });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
