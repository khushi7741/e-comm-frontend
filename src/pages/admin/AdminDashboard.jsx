import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   !localStorage.getItem("admin") && navigate("/admin-login");
  // }, []);
  return (
    <div className="p-8 h-[calc(100vh-64px)] bg-gray-100">
      <h1>Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
