import React, { useEffect } from "react";
import CartContainer from "../containers/CartContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { useNavigate } from "react-router-dom";

const CartApp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem("user") && navigate("/");
  }, []);
  return (
    <div className="h-full w-full flex flex-col">
      <HeaderContainer />
      <CartContainer />
    </div>
  );
};

export default CartApp;
