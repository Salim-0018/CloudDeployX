const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const githubRoutes = require("./routes/githubRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
  res.json({
    application: "CloudDeployX",
    status: "running",
    message: "CloudDeployX Platform API is running",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS database_time");

    res.status(200).json({
      status: "healthy",
      service: "clouddeployx-backend",
      database: "connected",
      database_time: result.rows[0].database_time,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(503).json({
      status: "unhealthy",
      service: "clouddeployx-backend",
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

app.listen(PORT, () => {
  console.log(`CloudDeployX API running on port ${PORT}`);
});
