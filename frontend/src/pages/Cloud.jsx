import {
  Activity,
  Box,
  Cloud as CloudIcon,
  Database,
  Globe,
  KeyRound,
  Server,
  Settings2,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";

const resources = [
  {
    name: "EC2 Instances",
    description: "Compute instances and server workloads",
    icon: Server,
    status: "Not Connected",
  },
  {
    name: "ECR Registry",
    description: "Container images and repositories",
    icon: Box,
    status: "Not Connected",
  },
  {
    name: "EKS Cluster",
    description: "Managed Kubernetes infrastructure",
    icon: Workflow,
    status: "Not Connected",
  },
  {
    name: "S3 Storage",
    description: "Object storage and application artifacts",
    icon: Database,
    status: "Not Connected",
  },
];

const services = [
  {
    name: "AWS IAM",
    description: "Identity and access management",
    icon: KeyRound,
  },
  {
    name: "Terraform",
    description: "Infrastructure as Code",
    icon: Terminal,
  },
  {
    name: "AWS Security",
    description: "Cloud security and permissions",
    icon: ShieldCheck,
  },
  {
    name: "Cloud Networking",
    description: "VPC, subnets and networking",
    icon: Globe,
  },
];

function Cloud() {
  const handleConnect = () => {
    alert(
      "AWS integration is not connected yet. AWS SDK, IAM and infrastructure integrations will be added in the cloud phase.",
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-cyan-400">
            <CloudIcon size={17} />
            Cloud Infrastructure
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            AWS Cloud
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Manage cloud infrastructure, container registries, Kubernetes
            clusters, IAM, and infrastructure as code from CloudDeployX.
          </p>
        </div>

        <button
          type="button"
          onClick={handleConnect}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500"
        >
          <CloudIcon size={16} />
          Connect AWS
        </button>
      </section>

      {/* AWS Connection */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
              <CloudIcon size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                AWS Account Connection
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Connect CloudDeployX with your AWS environment.
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">
            <Activity size={13} />
            Not Connected
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Account
            </p>

            <p className="mt-2 font-medium text-white">
              Not Connected
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Region
            </p>

            <p className="mt-2 font-medium text-white">
              ap-south-1
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Credentials
            </p>

            <p className="mt-2 font-medium text-amber-400">
              Not Configured
            </p>
          </div>
        </div>
      </section>

      {/* AWS Resources */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            AWS Resources
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Cloud resources will appear here after AWS integration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <div
                key={resource.name}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Icon size={19} />
                  </div>

                  <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                    {resource.status}
                  </span>
                </div>

                <h3 className="mt-5 font-semibold text-white">
                  {resource.name}
                </h3>

                <p className="mt-2 text-sm leading-5 text-slate-500">
                  {resource.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cloud Services */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Cloud Platform
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Core cloud and infrastructure capabilities planned for
            CloudDeployX.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.name}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-cyan-400">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {service.name}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {service.description}
                    </p>

                    <span className="mt-3 inline-flex rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                      Planned
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Terraform */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Settings2 size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Terraform Infrastructure
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              CloudDeployX will use Terraform to provision repeatable AWS
              infrastructure such as VPC, EC2, ECR, EKS, IAM, and supporting
              cloud resources.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["VPC", "EC2", "ECR", "EKS", "IAM"].map((item) => (
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

      {/* Integration Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-amber-200">
        <Activity size={18} className="mt-1 shrink-0" />

        <p>
          <strong>Integration status:</strong> AWS resources, IAM,
          Terraform, ECR, EKS, and cloud networking are currently planned.
          Actual AWS API integration will be implemented in the cloud
          integration phase.
        </p>
      </div>
    </div>
  );
}

export default Cloud;
