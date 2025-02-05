import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderContainer from "../containers/HeaderContainer";

const CartDetail = () => {
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const store_data = () => {
    location.state.map((k, i) => {
      setArr(location.state);
    });
  };
  useEffect(() => {
    store_data();
  }, []);
  let total = 0;
  arr.map((k, i) => {
    return (total += k.cartData.total);
  });

  return (
    <div className="h-screen w-full font-semibold text-xl capitalize">
      <HeaderContainer />
      <div className="flex flex-col items-center justify-center mt-16 gap-7 w-full max-w-2xl mx-auto bg-gray-200 p-10 rounded-lg">
        {arr.map((v, i) => (
          <div key={i} className="flex gap-5 max-w-2xl mx-auto">
            <div className="w-1/2">
              <img src={v.cartData.product_image} alt="image" />
            </div>
            <div className="flex flex-col gap-3 w-1/2 justify-center">
              <p>product name : {v.cartData.product_name}</p>
              <p>price : {v.cartData.product_price}</p>
              <p>final_price : {v.cartData.product_final_price}</p>
              <p>total : {v.cartData.total}</p>
            </div>
          </div>
        ))}
        <div>
          <p>total amount : {total}</p>
        </div>
        <div className="flex gap-4 w-full">
          <button
            className="capitalize bg-red-300 px-3 py-1 rounded-lg text-red-800 w-1/2"
            onClick={() => navigate("/cart-app")}
          >
            continue shopping
          </button>
          <button
            className="capitalize bg-red-300 px-3 py-1 rounded-lg text-red-800 w-1/2"
            onClick={() => navigate("/checkout", { state: arr })}
          >
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
