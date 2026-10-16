const express = require("express");

const {
  getGitHubUser,
  getGitHubRepository,
  getGitHubBranches,
} = require("../controllers/githubController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Verify authenticated GitHub account
router.get("/user", authMiddleware, getGitHubUser);

// Get repository information
router.get("/repos/:owner/:repo", authMiddleware, getGitHubRepository);

// Get repository branches
router.get(
  "/repos/:owner/:repo/branches",
  authMiddleware,
  getGitHubBranches,
);

module.exports = router;
