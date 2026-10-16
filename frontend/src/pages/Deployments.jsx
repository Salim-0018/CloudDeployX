import {
  Activity,
  ArrowDownCircle,
  CheckCircle2,
  Clock3,
  GitBranch,
  History,
  Package,
  Rocket,
  RotateCcw,
  Server,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const deployments = [
  {
    application: "CloudDeployX API",
    version: "v1.0.0",
    environment: "Development",
    branch: "main",
    status: "Successful",
    deployedAt: "Not deployed",
  },
  {
    application: "ShopKartX",
    version: "v0.9.0",
    environment: "Staging",
    branch: "main",
    status: "Successful",
    deployedAt: "Not deployed",
  },
  {
    application: "DevOps Toolkit Pro",
    version: "v1.2.0",
    environment: "Development",
    branch: "main",
    status: "Pending",
    deployedAt: "Not deployed",
  },
];

const environments = [
  {
    name: "Development",
    namespace: "clouddeployx-dev",
    status: "Not Connected",
  },
  {
    name: "Staging",
    namespace: "clouddeployx-staging",
    status: "Not Connected",
  },
  {
    name: "Production",
    namespace: "clouddeployx-prod",
    status: "Not Connected",
  },
];

const history = [
  {
    application: "CloudDeployX API",
    action: "Deployment",
    version: "v1.0.0",
    status: "Successful",
    time: "Not available",
  },
  {
    application: "ShopKartX",
    action: "Deployment",
    version: "v0.9.0",
    status: "Successful",
    time: "Not available",
  },
  {
    application: "DevOps Toolkit Pro",
    action: "Rollback",
    version: "v1.1.0",
    status: "Pending",
    time: "Not available",
  },
];

function Deployments() {
  const handleDeploy = () => {
    alert(
      "Deployment execution is not connected yet. Kubernetes deployment integration will be added in the deployment phase.",
    );
  };

  const handleRollback = () => {
    alert(
      "Rollback execution is not connected yet. Kubernetes rollback integration will be added in the deployment phase.",
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-cyan-400">
            <Rocket size={17} />
            Release Management
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Deployments & Rollbacks
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Manage application releases, deployment environments, versions,
            health checks, and rollback operations from one platform.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDeploy}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500"
        >
          <Rocket size={16} />
          New Deployment
        </button>
      </section>

      {/* Deployment Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Total Deployments
            </span>

            <Rocket size={19} className="text-cyan-400" />
          </div>

          <p className="mt-4 text-3xl font-bold text-white">0</p>

          <p className="mt-1 text-xs text-slate-500">
            No live deployment data
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Successful
            </span>

            <CheckCircle2 size={19} className="text-emerald-400" />
          </div>

          <p className="mt-4 text-3xl font-bold text-white">0</p>

          <p className="mt-1 text-xs text-slate-500">
            Successful releases
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Failed
            </span>

            <XCircle size={19} className="text-red-400" />
          </div>

          <p className="mt-4 text-3xl font-bold text-white">0</p>

          <p className="mt-1 text-xs text-slate-500">
            Failed releases
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Rollbacks
            </span>

            <RotateCcw size={19} className="text-amber-400" />
          </div>

          <p className="mt-4 text-3xl font-bold text-white">0</p>

          <p className="mt-1 text-xs text-slate-500">
            Rollback operations
          </p>
        </div>
      </section>

      {/* Current Deployments */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="border-b border-slate-800 p-5">
          <div className="flex items-center gap-2">
            <Package size={18} className="text-cyan-400" />

            <h2 className="font-semibold text-white">
              Application Deployments
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Current application versions and deployment status.
          </p>
        </div>

        <div className="divide-y divide-slate-800">
          {deployments.map((deployment) => (
            <div
              key={`${deployment.application}-${deployment.environment}`}
              className="p-5"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-white">
                      {deployment.application}
                    </h3>

                    <span className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-400">
                      {deployment.version}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <GitBranch size={13} />
                      {deployment.branch}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Server size={13} />
                      {deployment.environment}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={13} />
                      {deployment.deployedAt}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                      deployment.status === "Successful"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {deployment.status === "Successful" ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <Clock3 size={13} />
                    )}

                    {deployment.status}
                  </span>

                  <button
                    type="button"
                    onClick={handleRollback}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-700 hover:text-white"
                  >
                    <RotateCcw size={14} />
                    Rollback
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Environments */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Deployment Environments
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Kubernetes environments configured for application releases.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {environments.map((environment) => (
            <div
              key={environment.name}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Server size={19} />
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                  <Clock3 size={12} />
                  {environment.status}
                </span>
              </div>

              <h3 className="mt-5 font-semibold text-white">
                {environment.name}
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                Namespace
              </p>

              <code className="mt-1 block text-sm text-cyan-400">
                {environment.namespace}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* Rollback Strategy */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Safe Rollback Strategy
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              CloudDeployX will maintain deployment history and previous
              application versions so failed releases can be rolled back
              safely through Kubernetes deployment revisions.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Deployment History",
                "Version Tracking",
                "Health Checks",
                "Kubernetes Rollback",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deployment History */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="border-b border-slate-800 p-5">
          <div className="flex items-center gap-2">
            <History size={18} className="text-cyan-400" />

            <h2 className="font-semibold text-white">
              Deployment History
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Previous deployment and rollback operations.
          </p>
        </div>

        <div className="divide-y divide-slate-800">
          {history.map((item, index) => (
            <div
              key={`${item.application}-${item.action}-${index}`}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                  {item.action === "Rollback" ? (
                    <ArrowDownCircle size={17} />
                  ) : (
                    <Rocket size={17} />
                  )}
                </div>

                <div>
                  <p className="font-medium text-white">
                    {item.application}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.action} · {item.version} · {item.time}
                  </p>
                </div>
              </div>

              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                  item.status === "Successful"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                }`}
              >
                {item.status === "Successful" ? (
                  <CheckCircle2 size={13} />
                ) : (
                  <Clock3 size={13} />
                )}

                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-amber-200">
        <Activity size={18} className="mt-1 shrink-0" />

        <p>
          <strong>Integration status:</strong> Deployment execution,
          Kubernetes rollout monitoring, health checks, deployment history,
          and rollback operations are currently planned. Actual deployment
          automation will be connected during the Kubernetes integration
          phase.
        </p>
      </div>
    </div>
  );
}

export default Deployments;
