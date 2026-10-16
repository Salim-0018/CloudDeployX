const { Octokit } = require("@octokit/rest");

const githubToken = process.env.GITHUB_TOKEN;

if (!githubToken) {
  throw new Error("GITHUB_TOKEN is not configured");
}

const octokit = new Octokit({
  auth: githubToken,
});

async function getAuthenticatedUser() {
  const response = await octokit.rest.users.getAuthenticated();

  return {
    login: response.data.login,
    name: response.data.name,
    avatar_url: response.data.avatar_url,
    html_url: response.data.html_url,
  };
}

async function getRepository(owner, repo) {
  const response = await octokit.rest.repos.get({
    owner,
    repo,
  });

  return {
    id: response.data.id,
    name: response.data.name,
    full_name: response.data.full_name,
    private: response.data.private,
    default_branch: response.data.default_branch,
    description: response.data.description,
    html_url: response.data.html_url,
    clone_url: response.data.clone_url,
    language: response.data.language,
    stargazers_count: response.data.stargazers_count,
    forks_count: response.data.forks_count,
    updated_at: response.data.updated_at,
  };
}

async function getBranches(owner, repo) {
  const response = await octokit.rest.repos.listBranches({
    owner,
    repo,
    per_page: 100,
  });

  return response.data.map((branch) => ({
    name: branch.name,
    protected: branch.protected,
  }));
}

module.exports = {
  getAuthenticatedUser,
  getRepository,
  getBranches,
};
