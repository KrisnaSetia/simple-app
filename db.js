import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

export async function connectDatabase() {
  const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  // Menghubungkan ke database
  db.connect();


  return db; // Mengembalikan koneksi database
}