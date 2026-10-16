const express = require("express");

const {
  getApplications,
  getApplicationById,
  createApplication,
  deleteApplication,
} = require("../controllers/applicationController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateToken);

router.get("/", getApplications);
router.post("/", createApplication);
router.get("/:id", getApplicationById);
router.delete("/:id", deleteApplication);

module.exports = router;
