import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

// Buat pool connection
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Buat fungsi async untuk test koneksi
async function testConnection() {
  try {
    // Mencoba melakukan koneksi
    const connection = await pool.getConnection();
    console.log('Database connection successful!');
    // Cek versi MySQL
    const [rows] = await connection.query('SELECT VERSION() as version');
    console.log('MySQL Version:', rows[0].version);
    // Tampilkan nama database yang terkoneksi
    const [dbResult] = await connection.query('SELECT DATABASE() as database_name');
    console.log('Connected to database:', dbResult[0].database_name);
    // Release koneksi kembali ke pool
    connection.release();
    return {
      success: true,
      message: 'Database connection successful!'
    };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return {
      success: false,
      message: 'Database connection failed!',
      error: error.message
    };
  } finally {
    // Menutup pool koneksi
    await pool.end();
  }
}
// Jalankan fungsi test
testConnection()
  .then(result => console.log(result))
  .catch(error => console.error(error));