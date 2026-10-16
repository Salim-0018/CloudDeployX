const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || "clouddeployx",
  user: process.env.DB_USER || "clouddeployx",
  password: process.env.DB_PASSWORD || "clouddeployx_dev_password",
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err);
});

module.exports = pool;
