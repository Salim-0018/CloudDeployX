import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import DashboardLayout from "../components/layout/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import ApplicationDetails from "../pages/ApplicationDetails";
import Pipelines from "../pages/Pipelines";
import Security from "../pages/Security";
import Docker from "../pages/Docker";
import Kubernetes from "../pages/Kubernetes";
import Monitoring from "../pages/Monitoring";
import Cloud from "../pages/Cloud";
import Deployments from "../pages/Deployments";
import Settings from "../pages/Settings";

function PlaceholderPage({ title }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">
        This CloudDeployX module is under development.
      </p>
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/applications" element={<Applications />} />

            <Route
              path="/applications/:id"
              element={<ApplicationDetails />}
            />

            <Route path="/pipelines" element={<Pipelines />} />

            <Route path="/security" element={<Security />} />

            <Route path="/docker" element={<Docker />} />

            <Route path="/kubernetes" element={<Kubernetes />} />

            <Route path="/monitoring" element={<Monitoring />} />

            <Route path="/cloud" element={<Cloud />} />

         
            <Route path="/deployments" element={<Deployments />} />

            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Default routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="*"
          element={<PlaceholderPage title="404 - Page Not Found" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
