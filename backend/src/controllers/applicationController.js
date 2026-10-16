const pool = require("../config/database");

const getApplications = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        id,
        name,
        repository_url,
        branch,
        framework,
        docker_image,
        environment,
        status,
        created_at,
        updated_at
      FROM applications
      ORDER BY created_at DESC`
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      applications: result.rows,
    });
  } catch (error) {
    console.error("Get applications error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
        id,
        name,
        repository_url,
        branch,
        framework,
        docker_image,
        environment,
        status,
        created_at,
        updated_at
      FROM applications
      WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application: result.rows[0],
    });
  } catch (error) {
    console.error("Get application error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const {
      name,
      repository_url,
      branch = "main",
      framework,
      docker_image,
      environment = "development",
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Application name is required",
      });
    }

    const result = await pool.query(
      `INSERT INTO applications
        (name, repository_url, branch, framework, docker_image, environment)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name,
        repository_url || null,
        branch,
        framework || null,
        docker_image || null,
        environment,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Application created successfully",
      application: result.rows[0],
    });
  } catch (error) {
    console.error("Create application error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create application",
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM applications
       WHERE id = $1
       RETURNING id, name`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
      application: result.rows[0],
    });
  } catch (error) {
    console.error("Delete application error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete application",
    });
  }
};

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  deleteApplication,
};
