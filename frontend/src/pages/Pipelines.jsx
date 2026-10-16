import { useState } from "react";
import {
  GitBranch,
  Play,
  RefreshCw,
  Workflow,
  CheckCircle2,
  Clock3,
  XCircle,
  ShieldCheck,
  Container,
  Rocket,
  FileCode2,
} from "lucide-react";

const pipelineStages = [
  { name: "Source", icon: GitBranch },
  { name: "Test", icon: CheckCircle2 },
  { name: "Security Scan", icon: ShieldCheck },
  { name: "Docker Build", icon: Container },
  { name: "Deploy", icon: Rocket },
];

const initialPipelines = [
  {
    id: 1,
    name: "CloudDeployX API",
    repository: "CloudDeployX",
    branch: "main",
    status: "Success",
    commit: "Initial API setup",
    duration: "2m 34s",
    time: "Demo record",
  },
  {
    id: 2,
    name: "ShopKartX",
    repository: "ShopKartX",
    branch: "main",
    status: "Running",
    commit: "Frontend and CI updates",
    duration: "Running",
    time: "Demo record",
  },
  {
    id: 3,
    name: "DevOps Toolkit Pro",
    repository: "DevOps-Toolkit-Pro",
    branch: "main",
    status: "Failed",
    commit: "Monitoring configuration",
    duration: "Failed",
    time: "Demo record",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    Running: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    Failed: "border-red-500/20 bg-red-500/10 text-red-400",
    Pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  };

  const StatusIcon =
    status === "Success"
      ? CheckCircle2
      : status === "Running"
        ? RefreshCw
        : status === "Failed"
          ? XCircle
          : Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[status] || styles.Pending
      }`}
    >
      <StatusIcon
        size={13}
        className={status === "Running" ? "animate-spin" : ""}
      />
      {status}
    </span>
  );
}

function Pipelines() {
  const [pipelines] = useState(initialPipelines);
  const [selectedPipeline, setSelectedPipeline] = useState("1");
  const [notice, setNotice] = useState("");

  const selected = pipelines.find(
    (pipeline) => String(pipeline.id) === selectedPipeline,
  );

  const successCount = pipelines.filter(
    (pipeline) => pipeline.status === "Success",
  ).length;

  const runningCount = pipelines.filter(
    (pipeline) => pipeline.status === "Running",
  ).length;

  const failedCount = pipelines.filter(
    (pipeline) => pipeline.status === "Failed",
  ).length;

  const handleRunPipeline = () => {
    setNotice(
      "Pipeline execution is not connected yet. Git provider and backend integration will be added in a later step.",
    );
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-blue-400">
            <Workflow size={17} />
            Delivery Automation
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            CI/CD Pipelines
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Manage build, test, security scanning, containerization, and
            deployment workflows from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunPipeline}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          <Play size={16} />
          Run Pipeline
        </button>
      </section>

      {notice && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-200"
        >
          <Clock3 size={18} className="mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">{notice}</div>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="text-blue-300 hover:text-white"
            aria-label="Dismiss notice"
          >
            ×
          </button>
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Pipelines",
            value: pipelines.length,
            icon: Workflow,
            color: "text-blue-400",
          },
          {
            label: "Successful",
            value: successCount,
            icon: CheckCircle2,
            color: "text-emerald-400",
          },
          {
            label: "Running",
            value: runningCount,
            icon: RefreshCw,
            color: "text-sky-400",
          },
          {
            label: "Failed",
            value: failedCount,
            icon: XCircle,
            color: "text-red-400",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-400">{stat.label}</span>
                <Icon size={19} className={stat.color} />
              </div>
              <p className="mt-4 text-3xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="border-b border-slate-800 p-5">
            <h2 className="font-semibold text-white">Pipeline History</h2>
            <p className="mt-1 text-sm text-slate-400">
              Sample records for interface development
            </p>
          </div>

          <div className="space-y-3 p-4">
            {pipelines.map((pipeline) => (
              <button
                key={pipeline.id}
                type="button"
                onClick={() => setSelectedPipeline(String(pipeline.id))}
                className={`w-full rounded-lg border p-4 text-left transition ${
                  selectedPipeline === String(pipeline.id)
                    ? "border-blue-500/40 bg-blue-500/5"
                    : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                }`}
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">
                      {pipeline.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {pipeline.repository} · {pipeline.branch}
                    </p>
                  </div>
                  <StatusBadge status={pipeline.status} />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <GitBranch size={13} />
                    {pipeline.commit}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={13} />
                    {pipeline.duration}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center gap-2">
            <FileCode2 size={19} className="text-blue-400" />
            <h2 className="font-semibold text-white">Pipeline Details</h2>
          </div>

          {selected ? (
            <>
              <div className="mt-5">
                <p className="text-lg font-semibold text-white">
                  {selected.name}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Branch: {selected.branch}
                </p>
                <div className="mt-3">
                  <StatusBadge status={selected.status} />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {pipelineStages.map((stage, index) => {
                  const Icon = stage.icon;

                  return (
                    <div key={stage.name} className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          selected.status === "Success"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : index === 0 && selected.status === "Running"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-200">
                          {stage.name}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {selected.status === "Success"
                            ? "Sample completed stage"
                            : "Execution integration pending"}
                        </p>
                      </div>

                      <span className="text-xs text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-5 text-amber-200">
                These stages are a UI preview. No actual build, security scan,
                Docker image, or deployment is executed yet.
              </div>
            </>
          ) : (
            <p className="mt-5 text-sm text-slate-400">
              Select a pipeline to view its details.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Pipelines;
