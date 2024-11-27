import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import PermissionsPage from "./pages/PermissionsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/roles" element={<RolesPage />} />
      <Route path="/permissions" element={<PermissionsPage />} />
    </Routes>
  );
};

export default AppRoutes;
