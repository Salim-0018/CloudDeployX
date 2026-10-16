import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const pageTitles = {
  "/dashboard": {
    title: "Dashboard",
    description: "Platform overview and application activity",
  },
  "/applications": {
    title: "Applications",
    description: "Manage applications and repositories",
  },
  "/pipelines": {
    title: "CI/CD Pipelines",
    description: "Build, test and deployment automation",
  },
  "/security": {
    title: "Security",
    description: "Application and infrastructure security",
  },
  "/docker": {
    title: "Docker",
    description: "Container images and registry management",
  },
  "/kubernetes": {
    title: "Kubernetes",
    description: "Workloads, deployments and cluster resources",
  },
  "/monitoring": {
    title: "Monitoring",
    description: "Application health and platform metrics",
  },
  "/cloud": {
    title: "AWS Cloud",
    description: "Cloud infrastructure and resources",
  },
  "/deployments": {
    title: "Deployments",
    description: "Deployment history and release status",
  },
  "/settings": {
    title: "Settings",
    description: "Account and platform configuration",
  },
};

function Topbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isApplicationDetails =
    /^\/applications\/[^/]+$/.test(location.pathname);

  const currentPage = isApplicationDetails
    ? {
        title: "Application Details",
        description: "Configuration and application information",
      }
    : pageTitles[location.pathname] || {
        title: "CloudDeployX",
        description: "DevOps & Platform Engineering Platform",
      };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="flex min-h-20 items-center justify-between gap-3 px-4 sm:px-7">

        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-800 text-lg text-slate-300 transition hover:bg-slate-900 hover:text-white md:hidden"
          >
            ☰
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-white sm:text-xl">
              {currentPage.title}
            </h1>

            <p className="mt-1 hidden text-xs text-slate-500 sm:block">
              {currentPage.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">

          <div className="hidden items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 lg:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">
              Development
            </span>
          </div>

          <div className="hidden text-right lg:block">
            <p className="max-w-32 truncate text-sm font-medium text-white">
              {user?.name || "Developer"}
            </p>

            <p className="max-w-40 truncate text-xs text-slate-500">
              {user?.email || ""}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-semibold text-blue-400">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="rounded-lg border border-slate-800 px-2.5 py-2 text-xs text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 sm:px-3"
          >
            Logout
          </button>

        </div>
      </div>
    </header>
  );
}

export default Topbar;
