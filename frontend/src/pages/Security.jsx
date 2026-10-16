import {
  ShieldCheck,
  Search,
  KeyRound,
  Container,
  Cloud,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Play,
} from "lucide-react";

const securityTools = [
  {
    name: "Semgrep",
    category: "SAST",
    description: "Static analysis for source-code security issues.",
    icon: Search,
    status: "Ready",
  },
  {
    name: "Gitleaks",
    category: "Secret Scanning",
    description: "Detect exposed passwords, tokens, and API secrets.",
    icon: KeyRound,
    status: "Ready",
  },
  {
    name: "Trivy",
    category: "Container Security",
    description: "Scan container images for known vulnerabilities.",
    icon: Container,
    status: "Ready",
  },
  {
    name: "Checkov",
    category: "IaC Security",
    description: "Scan Terraform and infrastructure configuration.",
    icon: Cloud,
    status: "Ready",
  },
];

const scanHistory = [
  {
    application: "CloudDeployX",
    scan: "Security Baseline",
    status: "Completed",
    findings: 0,
    time: "Demo record",
  },
  {
    application: "ShopKartX",
    scan: "Container Scan",
    status: "Pending",
    findings: "-",
    time: "Demo record",
  },
];

function Security() {
  const handleStartScan = () => {
    alert(
      "Security scanning is not connected yet. Scanner execution will be added in the DevSecOps integration phase.",
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <ShieldCheck size={17} />
            DevSecOps
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Security
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Run source-code, secret, container, and infrastructure security
            checks from one platform.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartScan}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
        >
          <Play size={16} />
          Start Security Scan
        </button>
      </section>

      {/* Security overview */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Security Tools</span>
            <ShieldCheck size={19} className="text-emerald-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-white">
            {securityTools.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Scans Completed</span>
            <CheckCircle2 size={19} className="text-blue-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-white">1</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Critical Findings</span>
            <AlertTriangle size={19} className="text-red-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-white">0</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Pending Scans</span>
            <Clock3 size={19} className="text-amber-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-white">1</p>
        </div>
      </section>

      {/* Security tools */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Security Toolchain
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            DevSecOps scanners planned for CloudDeployX.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {securityTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <div
                key={tool.name}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-800 text-emerald-400">
                    <Icon size={21} />
                  </div>

                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    {tool.status}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-semibold text-white">
                  {tool.name}
                </h3>

                <p className="mt-1 text-xs font-medium text-emerald-400">
                  {tool.category}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {tool.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Scan history */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="border-b border-slate-800 p-5">
          <h2 className="font-semibold text-white">Scan History</h2>
          <p className="mt-1 text-sm text-slate-400">
            Security scan records for interface development.
          </p>
        </div>

        <div className="divide-y divide-slate-800">
          {scanHistory.map((item) => (
            <div
              key={`${item.application}-${item.scan}`}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-white">{item.application}</p>
                <p className="mt-1 text-sm text-slate-400">{item.scan}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                    item.status === "Completed"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {item.status === "Completed" ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <Clock3 size={13} />
                  )}
                  {item.status}
                </span>

                <span className="text-xs text-slate-500">
                  Findings: {item.findings}
                </span>

                <span className="text-xs text-slate-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notice */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-amber-200">
        <strong>Integration status:</strong> This page currently provides the
        security management interface. Actual Semgrep, Gitleaks, Trivy, and
        Checkov execution will be connected through the CloudDeployX backend
        in the next DevSecOps phase.
      </div>
    </div>
  );
}

export default Security;
