/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config(); // Memuat file .env
const mysql= require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.log("Connecting with:", {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to the database successfully!");
  });

export default db;