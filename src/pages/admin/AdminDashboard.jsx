import React from "react";
import { useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) {
    localStorage.removeItem("store-token");
    localStorage.removeItem("store");
    localStorage.removeItem("user");
    localStorage.removeItem("user-token");
  }
  return (
    <div className="p-8 h-[calc(100vh-64px)] bg-gray-100">
      <h1>Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
