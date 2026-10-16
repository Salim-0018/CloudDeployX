import {
  Container,
  Package,
  Play,
  CheckCircle2,
  Clock3,
  Server,
  Layers,
  RefreshCw,
} from "lucide-react";

const images = [
  {
    name: "clouddeployx-api",
    tag: "latest",
    status: "Ready",
    size: "Not built yet",
  },
  {
    name: "clouddeployx-frontend",
    tag: "latest",
    status: "Ready",
    size: "Not built yet",
  },
];

const workflow = [
  {
    title: "Dockerfile",
    description: "Application container definition",
    icon: Container,
  },
  {
    title: "Build Image",
    description: "Create versioned container image",
    icon: Layers,
  },
  {
    title: "Registry",
    description: "Push image to container registry",
    icon: Package,
  },
  {
    title: "Deploy",
    description: "Use image for application deployment",
    icon: Server,
  },
];

function Docker() {
  const handleBuild = () => {
    alert(
      "Docker automation is not connected yet. Backend Docker execution will be added in the automation phase.",
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-sky-400">
            <Container size={17} />
            Container Automation
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Docker
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Manage container images, builds, tags, registries, and deployment
            artifacts from CloudDeployX.
          </p>
        </div>

        <button
          type="button"
          onClick={handleBuild}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          <Play size={16} />
          Build Image
        </button>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Images</span>
            <Container size={19} className="text-sky-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-white">{images.length}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Builds</span>
            <RefreshCw size={19} className="text-blue-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-white">0</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Registry</span>
            <Package size={19} className="text-violet-400" />
          </div>
          <p className="mt-4 text-lg font-bold text-white">Not Connected</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Containers</span>
            <Server size={19} className="text-emerald-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-white">0</p>
        </div>
      </section>

      {/* Image inventory */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="border-b border-slate-800 p-5">
          <h2 className="font-semibold text-white">Container Images</h2>
          <p className="mt-1 text-sm text-slate-400">
            Application images managed by CloudDeployX.
          </p>
        </div>

        <div className="divide-y divide-slate-800">
          {images.map((image) => (
            <div
              key={image.name}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                  <Container size={19} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium text-white">
                    {image.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Tag: {image.tag} · Size: {image.size}
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                <CheckCircle2 size={13} />
                {image.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Docker workflow */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Container Workflow
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Planned Docker automation flow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {workflow.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-800 text-sky-400">
                  <Icon size={21} />
                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Step {index + 1}
                </p>

                <h3 className="mt-2 font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-5 text-slate-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integration notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-amber-200">
        <Clock3 size={18} className="mt-1 shrink-0" />

        <p>
          <strong>Integration status:</strong> Docker execution, registry
          authentication, image building, and container management will be
          connected through the CloudDeployX backend in the automation phase.
        </p>
      </div>
    </div>
  );
}

export default Docker;
