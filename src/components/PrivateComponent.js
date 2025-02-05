import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  return auth ? <Outlet /> : navigate("/");
};

export default PrivateComponent;
