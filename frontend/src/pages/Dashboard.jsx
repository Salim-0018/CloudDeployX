import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getApplications } from "../services/applicationService";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getApplications();

      setApplications(data.applications || []);
    } catch (err) {
      console.error("Dashboard applications error:", err);
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const totalApplications = applications.length;

  const productionApplications = applications.filter(
    (app) => app.environment === "production"
  ).length;

  const stagingApplications = applications.filter(
    (app) => app.environment === "staging"
  ).length;

  const runningApplications = applications.filter(
    (app) => app.status === "running"
  ).length;

  const stats = [
    {
      label: "Applications",
      value: totalApplications,
      description: "Total managed applications",
      icon: "▣",
    },
    {
      label: "Production",
      value: productionApplications,
      description: "Production environments",
      icon: "◆",
    },
    {
      label: "Staging",
      value: stagingApplications,
      description: "Staging environments",
      icon: "◇",
    },
    {
      label: "Running",
      value: runningApplications,
      description: "Currently running",
      icon: "●",
    },
  ];

  const modules = [
    {
      title: "CI/CD Pipelines",
      description: "Build, test and automate deployments.",
      path: "/pipelines",
      icon: "⚙",
      status: "Ready",
    },
    {
      title: "Security",
      description: "Static analysis, secrets and image scanning.",
      path: "/security",
      icon: "◆",
      status: "Planned",
    },
    {
      title: "Docker",
      description: "Container builds and image management.",
      path: "/docker",
      icon: "◈",
      status: "Planned",
    },
    {
      title: "Kubernetes",
      description: "Deploy and manage container workloads.",
      path: "/kubernetes",
      icon: "⬡",
      status: "Planned",
    },
    {
      title: "Monitoring",
      description: "Application health and infrastructure metrics.",
      path: "/monitoring",
      icon: "⌁",
      status: "Planned",
    },
    {
      title: "AWS Cloud",
      description: "Cloud resources, ECR, EKS and Terraform.",
      path: "/cloud",
      icon: "☁",
      status: "Planned",
    },
  ];

  return (
    <div className="space-y-7">

      {/* Welcome */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Platform Overview
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Welcome to CloudDeployX
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              A developer-focused platform for managing applications,
              CI/CD automation, security, containers, Kubernetes and
              cloud infrastructure from one place.
            </p>
          </div>

          <Link
            to="/applications"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Manage Applications
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {loading ? "—" : stat.value}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                {stat.icon}
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              {stat.description}
            </p>
          </div>
        ))}
      </section>

      {/* Main Grid */}
      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">

        {/* Recent Applications */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
            <div>
              <h3 className="font-semibold text-white">
                Recent Applications
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Latest applications added to CloudDeployX
              </p>
            </div>

            <Link
              to="/applications"
              className="text-xs font-medium text-blue-400 hover:text-blue-300"
            >
              View all
            </Link>
          </div>

          <div className="p-5">
            {loading ? (
              <div className="py-10 text-center text-sm text-slate-500">
                Loading applications...
              </div>
            ) : error ? (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-sm text-red-300">{error}</p>

                <button
                  onClick={loadApplications}
                  className="mt-3 text-xs font-medium text-red-400 hover:text-red-300"
                >
                  Try again
                </button>
              </div>
            ) : applications.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-800 p-8 text-center">
                <div className="text-2xl text-slate-600">
                  ▣
                </div>

                <h4 className="mt-3 text-sm font-medium text-white">
                  No applications yet
                </h4>

                <p className="mt-1 text-xs text-slate-500">
                  Create your first application to start using
                  CloudDeployX.
                </p>

                <Link
                  to="/applications"
                  className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                >
                  Create Application
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 5).map((application) => (
                  <Link
                    key={application.id}
                    to={`/applications/${application.id}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950/40 p-4 transition hover:border-slate-700 hover:bg-slate-950"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {application.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {application.repository_url ||
                          "Repository not configured"}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-md border border-slate-700 px-2 py-1 text-[10px] uppercase text-slate-400">
                        {application.environment}
                      </span>

                      <span
                        className={[
                          "rounded-md px-2 py-1 text-[10px] font-medium",
                          application.status === "running"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-800 text-slate-400",
                        ].join(" ")}
                      >
                        {application.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Platform Modules */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="border-b border-slate-800 px-5 py-4">
            <h3 className="font-semibold text-white">
              Platform Modules
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              CloudDeployX engineering capabilities
            </p>
          </div>

          <div className="divide-y divide-slate-800">
            {modules.map((module) => (
              <Link
                key={module.title}
                to={module.path}
                className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-950/50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-sm text-blue-400">
                  {module.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate text-sm font-medium text-white">
                      {module.title}
                    </h4>

                    <span
                      className={[
                        "hidden rounded-full px-2 py-0.5 text-[9px] font-medium sm:inline",
                        module.status === "Ready"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-slate-800 text-slate-500",
                      ].join(" ")}
                    >
                      {module.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {module.description}
                  </p>
                </div>

                <span className="text-slate-600">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-semibold text-white">
              CloudDeployX Roadmap
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Platform capabilities being built in stages
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {[
            ["01", "Foundation", "Auth, apps & database"],
            ["02", "DevOps", "Git, Docker & CI/CD"],
            ["03", "DevSecOps", "Security gates & scanning"],
            ["04", "Kubernetes", "Deployments & rollback"],
            ["05", "Observability", "Metrics & health"],
            ["06", "AWS Cloud", "ECR, EKS & Terraform"],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-lg border border-slate-800 bg-slate-950/40 p-4"
            >
              <span className="text-[10px] font-bold tracking-widest text-blue-400">
                {number}
              </span>

              <h4 className="mt-2 text-sm font-semibold text-white">
                {title}
              </h4>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Dashboard;
