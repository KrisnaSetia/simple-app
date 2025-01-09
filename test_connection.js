import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();
// Menghubungkan ke database
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Menghubungkan ke database
db.connect((err) => {
  if (err) {
    console.log("Connecting with:", {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
  });
  
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database successfully!");
});

// Menutup koneksi (opsional)
db.end((err) => {
  if (err) {
    console.error("Error closing the database connection:", err);
    return;
  }
  console.log("Database connection closed.");
});
