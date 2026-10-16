import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

const initialForm = {
  name: "",
  email: "",
  password: "",
};

function App() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(false);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [token, setToken] = useState(
    () => localStorage.getItem("clouddeployx_token") || ""
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("clouddeployx_user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const isAuthenticated = Boolean(token && user);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAuth = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint =
        mode === "login"
          ? `${API_URL}/api/auth/login`
          : `${API_URL}/api/auth/register`;

      const body =
        mode === "login"
          ? {
              email: form.email,
              password: form.password,
            }
          : {
              name: form.name,
              email: form.email,
              password: form.password,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      if (mode === "register") {
        setSuccess(
          "Account created successfully. You can now sign in."
        );

        setMode("login");

        setForm({
          name: "",
          email: form.email,
          password: "",
        });

        return;
      }

      localStorage.setItem("clouddeployx_token", data.token);
      localStorage.setItem(
        "clouddeployx_user",
        JSON.stringify(data.user)
      );

      setToken(data.token);
      setUser(data.user);

      setForm(initialForm);
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("clouddeployx_token");
    localStorage.removeItem("clouddeployx_user");

    setToken("");
    setUser(null);
    setApplications([]);
    setSelectedApplication(null);
    setForm(initialForm);
    setError("");
    setSuccess("");
  };

  const fetchApplications = async () => {
    if (!token) {
      return;
    }

    setApplicationsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch applications"
        );
      }

      setApplications(data.applications || []);
    } catch (error) {
      console.error("Applications error:", error);
      setError(error.message);
    } finally {
      setApplicationsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated, token]);

  const handleDeleteApplication = async (application) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${application.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(application.id);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/applications/${application.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete application"
        );
      }

      if (selectedApplication?.id === application.id) {
        setSelectedApplication(null);
      }

      await fetchApplications();
    } catch (error) {
      console.error("Delete application error:", error);
      setError(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="flex min-h-screen items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500 text-2xl font-bold text-slate-950">
                C
              </div>

              <h1 className="text-3xl font-bold tracking-tight">
                CloudDeployX
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Internal Developer Platform
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                  {mode === "login"
                    ? "Welcome back"
                    : "Create your account"}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {mode === "login"
                    ? "Sign in to access your platform dashboard."
                    : "Create an account to start using CloudDeployX."}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-5">
                {mode === "register" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Salim Khan"
                      required
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    required
                    minLength={8}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Please wait..."
                    : mode === "login"
                    ? "Sign In"
                    : "Create Account"}
                </button>
              </form>

              <div className="mt-6 border-t border-slate-800 pt-6 text-center text-sm">
                <span className="text-slate-500">
                  {mode === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode(
                      mode === "login" ? "register" : "login"
                    );
                    setError("");
                    setSuccess("");
                    setForm(initialForm);
                  }}
                  className="font-medium text-cyan-400 hover:text-cyan-300"
                >
                  {mode === "login"
                    ? "Create account"
                    : "Sign in"}
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-600">
              CloudDeployX Platform • Secure Developer Infrastructure
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedApplication) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-950/90">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                CloudDeployX
              </h1>

              <p className="text-sm text-slate-400">
                Internal Developer Platform
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium">
                  {user?.name}
                </p>

                <p className="text-xs text-slate-500">
                  {user?.role}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10">
          <button
            type="button"
            onClick={() => setSelectedApplication(null)}
            className="mb-6 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            ← Back to Applications
          </button>

          <section className="mb-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div>
                <p className="mb-2 text-sm font-medium text-cyan-400">
                  APPLICATION DETAILS
                </p>

                <h2 className="text-4xl font-bold tracking-tight">
                  {selectedApplication.name}
                </h2>

                <p className="mt-3 text-slate-400">
                  Application configuration and platform metadata.
                </p>
              </div>

              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                ● {selectedApplication.status}
              </div>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Framework
              </p>

              <p className="mt-3 text-xl font-semibold">
                {selectedApplication.framework ||
                  "Not specified"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Environment
              </p>

              <p className="mt-3 text-xl font-semibold capitalize">
                {selectedApplication.environment}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Branch
              </p>

              <p className="mt-3 text-xl font-semibold">
                {selectedApplication.branch || "main"}
              </p>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h3 className="text-xl font-semibold">
              Application Configuration
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Configuration registered with CloudDeployX.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm text-slate-500">
                  Application Name
                </p>

                <p className="mt-2 break-words font-medium">
                  {selectedApplication.name}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm text-slate-500">
                  Repository URL
                </p>

                {selectedApplication.repository_url ? (
                  <a
                    href={selectedApplication.repository_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block break-all font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    {selectedApplication.repository_url}
                  </a>
                ) : (
                  <p className="mt-2 text-slate-400">
                    Not specified
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm text-slate-500">
                  Git Branch
                </p>

                <p className="mt-2 font-medium">
                  {selectedApplication.branch || "main"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm text-slate-500">
                  Framework
                </p>

                <p className="mt-2 font-medium">
                  {selectedApplication.framework ||
                    "Not specified"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm text-slate-500">
                  Docker Image
                </p>

                <p className="mt-2 break-all font-medium">
                  {selectedApplication.docker_image ||
                    "Not specified"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm text-slate-500">
                  Environment
                </p>

                <p className="mt-2 font-medium capitalize">
                  {selectedApplication.environment}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h3 className="text-xl font-semibold">
              Platform Metadata
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">
                  Application ID
                </p>

                <p className="mt-2 font-mono text-sm text-slate-300">
                  #{selectedApplication.id}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Status
                </p>

                <p className="mt-2 capitalize text-emerald-400">
                  {selectedApplication.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Created At
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  {formatDate(
                    selectedApplication.created_at
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Last Updated
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  {formatDate(
                    selectedApplication.updated_at
                  )}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setSelectedApplication(null)}
              className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={() =>
                handleDeleteApplication(selectedApplication)
              }
              disabled={
                deletingId === selectedApplication.id
              }
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deletingId === selectedApplication.id
                ? "Deleting..."
                : "Delete Application"}
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              CloudDeployX
            </h1>

            <p className="text-sm text-slate-400">
              Internal Developer Platform
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500">
                {user?.role}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-8">
          <p className="mb-2 text-sm font-medium text-cyan-400">
            PLATFORM OVERVIEW
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            Developer Infrastructure, Simplified.
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Create applications, manage deployments, automate
            delivery, and enforce security from one platform.
          </p>
        </section>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Applications
            </p>

            <p className="mt-3 text-3xl font-bold">
              {applicationsLoading
                ? "..."
                : applications.length}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Protected applications
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Authentication
            </p>

            <p className="mt-3 text-3xl font-bold text-emerald-400">
              Active
            </p>

            <p className="mt-2 text-sm text-slate-500">
              JWT protected session
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Security
            </p>

            <p className="mt-3 text-3xl font-bold text-emerald-400">
              Ready
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Security gates available
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">
              Applications
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Applications managed through CloudDeployX.
            </p>
          </div>

          {applicationsLoading ? (
            <div className="rounded-xl border border-slate-800 p-6 text-slate-400">
              Loading applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">
              <p className="font-medium">
                No applications found
              </p>

              <p className="mt-2 text-sm text-slate-500">
                No applications are currently registered.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-800">
              <div className="grid grid-cols-5 border-b border-slate-800 bg-slate-950 px-5 py-3 text-sm font-medium text-slate-400">
                <span>Name</span>
                <span>Framework</span>
                <span>Environment</span>
                <span>Status</span>
                <span>Actions</span>
              </div>

              {applications.map((application) => (
                <div
                  key={application.id}
                  className="grid grid-cols-5 items-center border-b border-slate-800 px-5 py-4 last:border-b-0"
                >
                  <span className="font-medium">
                    {application.name}
                  </span>

                  <span className="text-slate-400">
                    {application.framework ||
                      "Not specified"}
                  </span>

                  <span className="capitalize text-slate-400">
                    {application.environment}
                  </span>

                  <span className="text-emerald-400">
                    {application.status}
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setSelectedApplication(application);
                      }}
                      className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/20"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteApplication(application)
                      }
                      disabled={
                        deletingId === application.id
                      }
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
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
      </main>
    </div>
  );
}

export default App;
