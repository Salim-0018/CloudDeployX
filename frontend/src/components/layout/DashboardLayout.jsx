import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((previous) => !previous);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">

      {/* Responsive Sidebar */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
      />

      {/* Main Application Area */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Topbar */}
        <Topbar onMenuClick={toggleMobileMenu} />

        {/* Page Content */}
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-7">
            {children || <Outlet />}
          </div>
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;
