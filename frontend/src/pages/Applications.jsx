import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createApplication,
  deleteApplication,
  getApplications,
} from "../services/applicationService";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    repository_url: "",
    branch: "main",
    framework: "",
    docker_image: "",
    environment: "development",
  });

  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getApplications();

      setApplications(data.applications || []);
    } catch (err) {
      console.error("Applications load error:", err);
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return applications;
    }

    return applications.filter((application) => {
      return (
        application.name?.toLowerCase().includes(query) ||
        application.repository_url
          ?.toLowerCase()
          .includes(query) ||
        application.framework
          ?.toLowerCase()
          .includes(query) ||
        application.environment
          ?.toLowerCase()
          .includes(query) ||
        application.status?.toLowerCase().includes(query)
      );
    });
  }, [applications, search]);

  const productionCount = applications.filter(
    (app) => app.environment === "production"
  ).length;

  const stagingCount = applications.filter(
    (app) => app.environment === "staging"
  ).length;

  const runningCount = applications.filter(
    (app) => app.status === "running"
  ).length;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    try {
      setCreating(true);
      setError("");

      await createApplication({
        name: form.name.trim(),
        repository_url: form.repository_url.trim() || null,
        branch: form.branch.trim() || "main",
        framework: form.framework.trim() || null,
        docker_image: form.docker_image.trim() || null,
        environment: form.environment,
      });

      setForm({
        name: "",
        repository_url: "",
        branch: "main",
        framework: "",
        docker_image: "",
        environment: "development",
      });

      setShowCreateModal(false);

      await loadApplications();
    } catch (err) {
      console.error("Create application error:", err);
      setError(err.message || "Failed to create application");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Delete application "${name}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await deleteApplication(id);

      setApplications((previous) =>
        previous.filter((application) => application.id !== id)
      );
    } catch (err) {
      console.error("Delete application error:", err);
      setError(err.message || "Failed to delete application");
    } finally {
      setDeletingId(null);
    }
  };

  const statusClass = (status) => {
    if (status === "running") {
      return "bg-emerald-500/10 text-emerald-400";
    }

    if (status === "failed") {
      return "bg-red-500/10 text-red-400";
    }

    return "bg-slate-800 text-slate-400";
  };

  const environmentClass = (environment) => {
    if (environment === "production") {
      return "border-purple-500/20 bg-purple-500/10 text-purple-300";
    }

    if (environment === "staging") {
      return "border-amber-500/20 bg-amber-500/10 text-amber-300";
    }

    return "border-slate-700 bg-slate-800/60 text-slate-400";
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Application Management
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Applications
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage repositories, environments and application
            configuration.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          + Create Application
        </button>
      </section>

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
          <p className="text-sm text-red-300">
            {error}
          </p>

          <button
            onClick={loadApplications}
            className="shrink-0 text-xs font-medium text-red-400 hover:text-red-300"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Total Applications
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {loading ? "—" : applications.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Production
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {loading ? "—" : productionCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Staging
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {loading ? "—" : stagingCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Running
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {loading ? "—" : runningCount}
          </p>
        </div>
      </section>

      {/* Applications Table */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">

        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-slate-800 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold text-white">
              Application Inventory
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {filteredApplications.length} application
              {filteredApplications.length === 1 ? "" : "s"} found
            </p>
          </div>

          <div className="relative w-full md:max-w-sm">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search applications..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="px-5 py-14 text-center text-sm text-slate-500">
            Loading applications...
          </div>
        )}

        {/* Empty */}
        {!loading && filteredApplications.length === 0 && (
          <div className="px-5 py-14 text-center">
            <div className="text-3xl text-slate-700">
              ▣
            </div>

            <h4 className="mt-3 text-sm font-medium text-white">
              {search
                ? "No matching applications"
                : "No applications yet"}
            </h4>

            <p className="mx-auto mt-1 max-w-md text-xs text-slate-500">
              {search
                ? "Try a different search term."
                : "Create your first application to start building your delivery platform."}
            </p>

            {!search && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
              >
                Create Application
              </button>
            )}
          </div>
        )}

        {/* Desktop Table */}
        {!loading && filteredApplications.length > 0 && (
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-600">
                  <th className="px-5 py-4 font-semibold">
                    Application
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Environment
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Framework
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="transition hover:bg-slate-950/40"
                  >
                    <td className="px-5 py-4">
                      <div className="min-w-0">
                        <button
                          onClick={() =>
                            navigate(
                              `/applications/${application.id}`
                            )
                          }
                          className="truncate text-sm font-medium text-white hover:text-blue-400"
                        >
                          {application.name}
                        </button>

                        <p className="mt-1 max-w-md truncate text-xs text-slate-600">
                          {application.repository_url ||
                            "Repository not configured"}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-md border px-2 py-1 text-[10px] uppercase ${environmentClass(
                          application.environment
                        )}`}
                      >
                        {application.environment}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-400">
                      {application.framework || "Not configured"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-md px-2 py-1 text-[10px] font-medium ${statusClass(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/applications/${application.id}`
                            )
                          }
                          className="rounded-md border border-slate-800 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-white"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              application.id,
                              application.name
                            )
                          }
                          disabled={deletingId === application.id}
                          className="rounded-md border border-red-500/10 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                        >
                          {deletingId === application.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && filteredApplications.length > 0 && (
          <div className="divide-y divide-slate-800 md:hidden">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className="space-y-4 p-5"
              >
                <div>
                  <button
                    onClick={() =>
                      navigate(`/applications/${application.id}`)
                    }
                    className="text-sm font-semibold text-white hover:text-blue-400"
                  >
                    {application.name}
                  </button>

                  <p className="mt-1 break-all text-xs text-slate-600">
                    {application.repository_url ||
                      "Repository not configured"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-md border px-2 py-1 text-[10px] uppercase ${environmentClass(
                      application.environment
                    )}`}
                  >
                    {application.environment}
                  </span>

                  <span
                    className={`rounded-md px-2 py-1 text-[10px] font-medium ${statusClass(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>

                  <span className="rounded-md bg-slate-800 px-2 py-1 text-[10px] text-slate-400">
                    {application.framework || "Framework N/A"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/applications/${application.id}`)
                    }
                    className="flex-1 rounded-md border border-slate-800 px-3 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        application.id,
                        application.name
                      )
                    }
                    disabled={deletingId === application.id}
                    className="flex-1 rounded-md border border-red-500/10 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                  >
                    {deletingId === application.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">

            <div className="flex items-start justify-between border-b border-slate-800 p-5">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Create Application
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Add application metadata for your deployment platform.
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="text-xl text-slate-500 hover:text-white"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleCreate}
              className="space-y-5 p-5"
            >
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Application Name *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="my-production-app"
                    required
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Branch
                  </label>

                  <input
                    name="branch"
                    value={form.branch}
                    onChange={handleInputChange}
                    placeholder="main"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>

              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Repository URL
                </label>

                <input
                  name="repository_url"
                  value={form.repository_url}
                  onChange={handleInputChange}
                  placeholder="https://github.com/user/repository"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Framework
                  </label>

                  <input
                    name="framework"
                    value={form.framework}
                    onChange={handleInputChange}
                    placeholder="React / Node.js"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Environment
                  </label>

                  <select
                    name="environment"
                    value={form.environment}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                  >
                    <option value="development">
                      Development
                    </option>
                    <option value="staging">
                      Staging
                    </option>
                    <option value="production">
                      Production
                    </option>
                  </select>
                </div>

              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Docker Image
                </label>

                <input
                  name="docker_image"
                  value={form.docker_image}
                  onChange={handleInputChange}
                  placeholder="registry.example.com/my-app:latest"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg border border-slate-800 px-4 py-2.5 text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creating
                    ? "Creating..."
                    : "Create Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Applications;
