import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navigation = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: "▦" },
      { name: "Applications", path: "/applications", icon: "▣" },
      { name: "Deployments", path: "/deployments", icon: "↑" },
    ],
  },
  {
    label: "Delivery",
    items: [
      { name: "CI/CD Pipelines", path: "/pipelines", icon: "⚙" },
      { name: "Docker", path: "/docker", icon: "◈" },
    ],
  },
  {
    label: "Security",
    items: [
      { name: "Security", path: "/security", icon: "◆" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { name: "Kubernetes", path: "/kubernetes", icon: "⬡" },
      { name: "Monitoring", path: "/monitoring", icon: "⌁" },
      { name: "AWS Cloud", path: "/cloud", icon: "☁" },
    ],
  },
];

function Sidebar({ mobileOpen = false, onClose }) {
  const { user } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col",
          "border-r border-slate-800 bg-slate-950 transition-transform duration-200",
          "md:sticky md:top-0 md:z-20 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              C
            </div>

            <div>
              <h1 className="text-base font-bold text-white">
                CloudDeployX
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                DevOps Platform
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md px-2 py-1 text-lg text-slate-500 hover:bg-slate-800 hover:text-white md:hidden"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {navigation.map((section) => (
            <div key={section.label} className="mb-6">
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                {section.label}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                        isActive
                          ? "bg-blue-600/10 text-blue-400"
                          : "text-slate-400 hover:bg-slate-900 hover:text-white",
                      ].join(" ")
                    }
                  >
                    <span className="flex w-5 justify-center text-sm">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          <div className="mb-6">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
              System
            </p>

            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                  isActive
                    ? "bg-blue-600/10 text-blue-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white",
                ].join(" ")
              }
            >
              <span className="flex w-5 justify-center">⚙</span>
              <span>Settings</span>
            </NavLink>
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-slate-900 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-blue-400">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {user?.name || "Developer"}
              </p>
              <p className="truncate text-xs text-slate-500">
                {user?.role || "developer"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
