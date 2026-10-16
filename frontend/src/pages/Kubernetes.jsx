import {
  Boxes,
  Server,
  Activity,
  Layers3,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const resources = [
  {
    name: "Deployments",
    value: 0,
    description: "Application workloads",
    icon: Boxes,
  },
  {
    name: "Services",
    value: 0,
    description: "Application networking",
    icon: Server,
  },
  {
    name: "Pods",
    value: 0,
    description: "Running workloads",
    icon: Activity,
  },
  {
    name: "Namespaces",
    value: 0,
    description: "Cluster environments",
    icon: Layers3,
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

function Kubernetes() {
  const handleConnect = () => {
    alert(
      "Kubernetes integration is not connected yet. Cluster API integration will be added in the Kubernetes automation phase.",
    );
  };

  const handleRollback = () => {
    alert(
      "Rollback is not connected yet. Deployment history and Kubernetes rollback will be added later.",
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-violet-400">
            <Boxes size={17} />
            Infrastructure Automation
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Kubernetes
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Manage Kubernetes workloads, services, namespaces, deployments, and
            rollback workflows from CloudDeployX.
          </p>
        </div>

        <button
          type="button"
          onClick={handleConnect}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <Play size={16} />
          Connect Cluster
        </button>
      </section>

      {/* Cluster status */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Server size={19} className="text-violet-400" />
              <h2 className="font-semibold text-white">Cluster Status</h2>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              No Kubernetes cluster is connected to CloudDeployX.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">
            <Clock3 size={13} />
            Not Connected
          </span>
        </div>
      </section>

      {/* Resource stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resources.map((resource) => {
          const Icon = resource.icon;

          return (
            <div
              key={resource.name}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  {resource.name}
                </span>

                <Icon size={19} className="text-violet-400" />
              </div>

              <p className="mt-4 text-3xl font-bold text-white">
                {resource.value}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {resource.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Environments */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="border-b border-slate-800 p-5">
          <h2 className="font-semibold text-white">Environments</h2>

          <p className="mt-1 text-sm text-slate-400">
            Kubernetes environments configured for CloudDeployX.
          </p>
        </div>

        <div className="divide-y divide-slate-800">
          {environments.map((environment) => (
            <div
              key={environment.name}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  <Layers3 size={19} />
                </div>

                <div>
                  <p className="font-medium text-white">{environment.name}</p>

                  <p className="mt-1 text-xs text-slate-500">
                    Namespace: {environment.namespace}
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400">
                <Clock3 size={13} />
                {environment.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Kubernetes actions */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Kubernetes Operations
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Planned cluster management operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={handleConnect}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-left transition hover:border-slate-700"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
              <Boxes size={21} />
            </div>

            <h3 className="mt-5 font-semibold text-white">
              Deploy Application
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Create or update Kubernetes deployment and service resources.
            </p>
          </button>

          <button
            type="button"
            onClick={handleRollback}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-left transition hover:border-slate-700"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <RotateCcw size={21} />
            </div>

            <h3 className="mt-5 font-semibold text-white">
              Rollback Deployment
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Restore a previous application version using deployment history.
            </p>
          </button>
        </div>
      </section>

      {/* Integration notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-amber-200">
        <CheckCircle2 size={18} className="mt-1 shrink-0" />

        <p>
          <strong>Integration status:</strong> Kubernetes API access,
          deployment creation, service management, pod monitoring, and
          rollback execution will be connected through the CloudDeployX
          backend in the next infrastructure phase.
        </p>
      </div>
    </div>
  );
}

export default Kubernetes;
