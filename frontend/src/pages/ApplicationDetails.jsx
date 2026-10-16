import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getApplicationById } from "../services/applicationService";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplication = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getApplicationById(id);

      setApplication(data.application);
    } catch (err) {
      console.error("Application details error:", err);
      setError(err.message || "Failed to load application");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplication();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-12 text-center">
        <p className="text-sm text-slate-500">
          Loading application...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate("/applications")}
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Back to Applications
        </button>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="text-lg font-semibold text-red-300">
            Unable to load application
          </h2>

          <p className="mt-2 text-sm text-red-400">
            {error}
          </p>

          <button
            onClick={loadApplication}
            className="mt-4 rounded-lg border border-red-500/20 px-4 py-2 text-xs text-red-300 hover:bg-red-500/10"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-12 text-center">
        <h2 className="text-lg font-semibold text-white">
          Application not found
        </h2>

        <Link
          to="/applications"
          className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300"
        >
          ← Back to Applications
        </Link>
      </div>
    );
  }

  const statusClass =
    application.status === "running"
      ? "bg-emerald-500/10 text-emerald-400"
      : application.status === "failed"
        ? "bg-red-500/10 text-red-400"
        : "bg-slate-800 text-slate-400";

  const environmentClass =
    application.environment === "production"
      ? "border-purple-500/20 bg-purple-500/10 text-purple-300"
      : application.environment === "staging"
        ? "border-amber-500/20 bg-amber-500/10 text-amber-300"
        : "border-slate-700 bg-slate-800/60 text-slate-400";

  const createdAt = application.created_at
    ? new Date(application.created_at).toLocaleString()
    : "—";

  const updatedAt = application.updated_at
    ? new Date(application.updated_at).toLocaleString()
    : "—";

  const actions = [
    {
      title: "Run Pipeline",
      description: "Trigger the CI/CD workflow",
      icon: "⚙",
    },
    {
      title: "Docker Build",
      description: "Build and publish container image",
      icon: "◈",
    },
    {
      title: "Security Scan",
      description: "Run application security checks",
      icon: "◆",
    },
    {
      title: "Deploy",
      description: "Deploy application to environment",
      icon: "↑",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Breadcrumb */}
      <div>
        <button
          onClick={() => navigate("/applications")}
          className="text-xs text-slate-500 transition hover:text-blue-400"
        >
          ← Applications
        </button>
      </div>

      {/* Application Header */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-blue-950/20 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="break-words text-2xl font-bold text-white sm:text-3xl">
                {application.name}
              </h2>

              <span
                className={`rounded-md px-2.5 py-1 text-[10px] font-medium uppercase ${statusClass}`}
              >
                {application.status}
              </span>

              <span
                className={`rounded-md border px-2.5 py-1 text-[10px] font-medium uppercase ${environmentClass}`}
              >
                {application.environment}
              </span>
            </div>

            <p className="mt-3 break-all text-sm text-slate-500">
              {application.repository_url ||
                "Repository not configured"}
            </p>
          </div>

          <Link
            to="/applications"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-slate-800 px-4 py-2.5 text-xs font-medium text-slate-400 hover:border-slate-700 hover:text-white"
          >
            All Applications
          </Link>

        </div>
      </section>

      {/* Overview */}
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">

        {/* Configuration */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70">

          <div className="border-b border-slate-800 px-5 py-4">
            <h3 className="font-semibold text-white">
              Application Configuration
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Current application metadata and deployment configuration.
            </p>
          </div>

          <div className="grid gap-px bg-slate-800 sm:grid-cols-2">

            <div className="bg-slate-900/90 p-5">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Framework
              </p>

              <p className="mt-2 text-sm font-medium text-white">
                {application.framework || "Not configured"}
              </p>
            </div>

            <div className="bg-slate-900/90 p-5">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Branch
              </p>

              <p className="mt-2 text-sm font-medium text-white">
                {application.branch || "main"}
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 sm:col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Docker Image
              </p>

              <p className="mt-2 break-all font-mono text-xs text-slate-300">
                {application.docker_image ||
                  "Docker image not configured"}
              </p>
            </div>

          </div>
        </div>

        {/* Status */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70">

          <div className="border-b border-slate-800 px-5 py-4">
            <h3 className="font-semibold text-white">
              Application Status
            </h3>
          </div>

          <div className="space-y-5 p-5">

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Current Status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    application.status === "running"
                      ? "bg-emerald-400"
                      : "bg-slate-600"
                  }`}
                />

                <span className="text-sm text-white">
                  {application.status}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Environment
              </p>

              <p className="mt-2 text-sm text-white">
                {application.environment}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Created
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {createdAt}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Last Updated
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {updatedAt}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Delivery Actions */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70">

        <div className="border-b border-slate-800 px-5 py-4">
          <h3 className="font-semibold text-white">
            Delivery Actions
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            These capabilities will be connected to the DevOps
            execution layer in upcoming phases.
          </p>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <button
              key={action.title}
              disabled
              className="group rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-left opacity-70"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-sm text-blue-400">
                  {action.icon}
                </div>

                <span className="text-[9px] uppercase tracking-wider text-slate-600">
                  Coming Soon
                </span>
              </div>

              <h4 className="mt-4 text-sm font-semibold text-white">
                {action.title}
              </h4>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {action.description}
              </p>
            </button>
          ))}
        </div>

      </section>

      {/* Repository */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">

        <p className="text-[10px] uppercase tracking-wider text-slate-600">
          Repository
        </p>

        {application.repository_url ? (
          <a
            href={application.repository_url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block break-all text-sm text-blue-400 hover:text-blue-300"
          >
            {application.repository_url}
          </a>
        ) : (
          <p className="mt-2 text-sm text-slate-500">
            Repository URL has not been configured.
          </p>
        )}

      </section>

    </div>
  );
}

export default ApplicationDetails;
