const {
  getAuthenticatedUser,
  getRepository,
  getBranches,
} = require("../services/githubService");

async function getGitHubUser(req, res) {
  try {
    const user = await getAuthenticatedUser();

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("GitHub user error:", error.message);

    return res.status(error.status || 500).json({
      success: false,
      message: "Failed to fetch GitHub user",
    });
  }
}

async function getGitHubRepository(req, res) {
  try {
    const { owner, repo } = req.params;

    if (!owner || !repo) {
      return res.status(400).json({
        success: false,
        message: "Repository owner and name are required",
      });
    }

    const repository = await getRepository(owner, repo);

    return res.status(200).json({
      success: true,
      data: repository,
    });
  } catch (error) {
    console.error("GitHub repository error:", error.message);

    return res.status(error.status || 500).json({
      success: false,
      message: "Failed to fetch GitHub repository",
    });
  }
}

async function getGitHubBranches(req, res) {
  try {
    const { owner, repo } = req.params;

    if (!owner || !repo) {
      return res.status(400).json({
        success: false,
        message: "Repository owner and name are required",
      });
    }

    const branches = await getBranches(owner, repo);

    return res.status(200).json({
      success: true,
      data: branches,
    });
  } catch (error) {
    console.error("GitHub branches error:", error.message);

    return res.status(error.status || 500).json({
      success: false,
      message: "Failed to fetch GitHub branches",
    });
  }
}

module.exports = {
  getGitHubUser,
  getGitHubRepository,
  getGitHubBranches,
};
