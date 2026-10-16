import {
  Bell,
  CheckCircle2,
  Cloud,
  Info,
  KeyRound,
  LockKeyhole,
  Settings as SettingsIcon,
  ShieldCheck,
  User,
  Wifi,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Settings() {
  const { user } = useAuth();

  const handleNotConnected = (name) => {
    alert(
      `${name} settings are not connected yet. This integration will be implemented in a later phase.`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <div className="flex items-center gap-2 text-sm text-cyan-400">
          <SettingsIcon size={17} />
          Platform Configuration
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Manage your CloudDeployX profile, security preferences,
          integrations, and platform configuration.
        </p>
      </section>

      {/* Profile */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <User size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Profile
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Your CloudDeployX account information.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Name
            </p>

            <p className="mt-2 font-medium text-white">
              {user?.name || "User"}
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Email
            </p>

            <p className="mt-2 break-all font-medium text-white">
              {user?.email || "Not available"}
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Role
            </p>

            <p className="mt-2 font-medium capitalize text-cyan-400">
              {user?.role || "Developer"}
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Account Status
            </p>

            <p className="mt-2 inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <CheckCircle2 size={15} />
              Active
            </p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Authentication & Security
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Security controls for your CloudDeployX account.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <LockKeyhole
                size={18}
                className="text-emerald-400"
              />

              <div>
                <p className="font-medium text-white">
                  Password Authentication
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Account password authentication is enabled.
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
              <CheckCircle2 size={13} />
              Enabled
            </span>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <KeyRound
                size={18}
                className="text-amber-400"
              />

              <div>
                <p className="font-medium text-white">
                  API Credentials
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  API credentials will be managed securely by the backend.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleNotConnected("API credentials")}
              className="w-fit rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Configure
            </button>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Integrations
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            External services used by CloudDeployX.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                <Wifi size={19} />
              </div>

              <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] text-slate-400">
                Planned
              </span>
            </div>

            <h3 className="mt-5 font-semibold text-white">
              GitHub / GitLab
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Connect repositories and source-control providers for
              automated pipelines.
            </p>

            <button
              type="button"
              onClick={() => handleNotConnected("Git provider")}
              className="mt-4 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Configure
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                <Cloud size={19} />
              </div>

              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] text-amber-400">
                Not Connected
              </span>
            </div>

            <h3 className="mt-5 font-semibold text-white">
              AWS Cloud
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Connect AWS securely for EC2, ECR, EKS, IAM, and
              infrastructure automation.
            </p>

            <button
              type="button"
              onClick={() => handleNotConnected("AWS")}
              className="mt-4 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Configure
            </button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Bell size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Notifications
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Configure deployment, security, and system notifications.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {[
            {
              title: "Deployment Notifications",
              description:
                "Receive updates when deployments complete or fail.",
            },
            {
              title: "Security Scan Notifications",
              description:
                "Receive alerts when security scans detect issues.",
            },
            {
              title: "System Notifications",
              description:
                "Receive important CloudDeployX platform updates.",
            },
          ].map((notification) => (
            <div
              key={notification.title}
              className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-white">
                  {notification.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {notification.description}
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                Planned
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Configuration */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <SettingsIcon size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Platform Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              CloudDeployX environment information.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Platform
            </p>

            <p className="mt-2 font-medium text-white">
              CloudDeployX
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Environment
            </p>

            <p className="mt-2 font-medium text-cyan-400">
              Development
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              API
            </p>

            <p className="mt-2 font-medium text-white">
              localhost:5000
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Frontend
            </p>

            <p className="mt-2 font-medium text-white">
              Vite + React
            </p>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm leading-6 text-cyan-200">
        <Info size={18} className="mt-1 shrink-0" />

        <p>
          <strong>Security note:</strong> CloudDeployX should never store
          AWS secret keys, Git tokens, registry passwords, or other
          sensitive credentials directly in frontend source code or
          browser-visible configuration.
        </p>
      </div>
    </div>
  );
}

export default Settings;
