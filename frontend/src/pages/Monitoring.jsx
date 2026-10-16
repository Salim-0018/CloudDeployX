import {

  Activity,
  BarChart3,
  Cpu,
  Database,
  Gauge,
  HardDrive,
  Server,
  Wifi,
  Clock3,
} from "lucide-react";

const metrics = [
  {
    name: "CPU Usage",
    value: "0%",
    description: "Cluster CPU utilization",
    icon: Cpu,
  },
  {
    name: "Memory Usage",
    value: "0%",
    description: "Available memory utilization",
    icon: Gauge,
  },
  {
    name: "Disk Usage",
    value: "0%",
    description: "Storage utilization",
    icon: HardDrive,
  },
  {
    name: "Requests",
    value: "0",
    description: "Application requests",
    icon: Activity,
  },
];

const services = [
  {
    name: "CloudDeployX API",
    endpoint: "localhost:5000",
    status: "Not Connected",
  },
  {
    name: "PostgreSQL",
    endpoint: "localhost:5432",
    status: "Not Connected",
  },
  {
    name: "Prometheus",
    endpoint: "localhost:9090",
    status: "Not Connected",
  },
  {
    name: "Grafana",
    endpoint: "localhost:3000",
    status: "Not Connected",
  },
];

function Monitoring() {
  const handleConnect = () => {
    alert(
      "Monitoring integration is not connected yet. Prometheus and Grafana integration will be added in the observability phase.",
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-cyan-400">
            <Activity size={17} />
            Observability
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Monitoring
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Monitor application health, infrastructure metrics, services, and
            observability data from one dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={handleConnect}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500"
        >
          <Wifi size={16} />
          Connect Monitoring
        </button>
      </section>

      {/* Monitoring status */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              <BarChart3 size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Observability Stack
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Prometheus metrics and Grafana dashboards.
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">
            <Clock3 size={13} />
            Not Connected
          </span>
        </div>
      </section>

      {/* Metrics */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Infrastructure Metrics
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Live metrics will appear after Prometheus integration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.name}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    {metric.name}
                  </span>

                  <Icon size={19} className="text-cyan-400" />
                </div>

                <p className="mt-4 text-3xl font-bold text-white">
                  {metric.value}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="border-b border-slate-800 p-5">
          <div className="flex items-center gap-2">
            <Server size={18} className="text-cyan-400" />
            <h2 className="font-semibold text-white">Service Health</h2>
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Service endpoints configured for monitoring.
          </p>
        </div>

        <div className="divide-y divide-slate-800">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                  <Database size={17} />
                </div>

                <div>
                  <p className="font-medium text-white">{service.name}</p>

                  <p className="mt-1 text-xs text-slate-500">
                    {service.endpoint}
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400">
                <Clock3 size={13} />
                {service.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard integration */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
            <BarChart3 size={21} />
          </div>

          <h3 className="mt-5 font-semibold text-white">
            Grafana Dashboards
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Infrastructure and application dashboards will be embedded here
            after Grafana integration.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <Activity size={21} />
          </div>

          <h3 className="mt-5 font-semibold text-white">
            Prometheus Metrics
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Prometheus queries and application metrics will be connected to the
            backend monitoring service.
          </p>
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-amber-200">
        <Clock3 size={18} className="mt-1 shrink-0" />

        <p>
          <strong>Integration status:</strong> Metrics, health checks,
          Prometheus queries, and Grafana dashboards are currently planned.
          Actual monitoring data will be connected in the observability phase.
        </p>
      </div>
    </div>
  );
}

export default Monitoring;
