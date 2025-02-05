import { IconShoppingCartFilled } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  console.log(props.data);
  return (
    <div className="h-24 w-full">
      <div className="flex justify-between items-center px-10 fixed h-24 z-10 w-full bg-white shadow-lg">
        <div>
          <img
            src="./images/shop-logo.png"
            alt="shop-logo"
            className="h-20 w-28"
            onClick={() => navigate("/cart-app")}
          />
        </div>
        <div className="flex gap-5 justify-center items-center">
          <div className="">
            <button
              className="capitalize bg-red-400 px-3 py-1 rounded-lg font-bold"
              onClick={() => {
                navigate("/");
                localStorage.clear();
              }}
            >
              logout
            </button>
          </div>
          <div>
            <span className="absolute bg-red-800 w-5 justify-center flex items-center h-5 rounded-full text-sm text-white top-6 right-9 z-10">
              {props.data.length}
            </span>
            <IconShoppingCartFilled
              className="h-10 w-10 text-red-500"
              onClick={() => {
                navigate("/cart-detail", {
                  state: props.data,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
