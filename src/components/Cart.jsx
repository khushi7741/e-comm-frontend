import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseDebounce from "./UseDebounce";

const Cart = (props) => {
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState();
  const [isScroll, setIsScroll] = useState(false);
  const debouncedValue = UseDebounce(isScroll, 2000);
  const search = useCallback(async () => {
    const response = await fetch(
      "http://localhost:5000/products"
    );
    let data = await response.json();
    setProductDetail(data);
  }, [debouncedValue]);

  useEffect(() => {
    search();
  }, [debouncedValue, search]);
  const handleChange = () => {
    setIsScroll(true);
  };
  useEffect(() => {
    console.log(productDetail);
  }, [productDetail]);

  return (
    <div className="font-bold text-xl w-full h-[calc(100%-96px)] py-20 px-10">
      <div
        className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center items-center gap-8 w-full xl:container mx-auto xl:px-0 px-5"
        onWheel={handleChange}
      >
        {isScroll
          ? productDetail?.map((v, i) => (
              <div
                key={i}
                className="flex flex-col gap-8 items-center justify-center rounded-lg p-2 h-full border border-black"
              >
                <div className="h-80 w-full">
                  <img
                    src={v.product_image}
                    alt="i-phone"
                    className="h-80 w-full"
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-2 h-1/2">
                  <h2 className="capitalize">{v.product_name}</h2>
                  <p className="line-through capitalize">
                    Price : {v.product_price}
                  </p>
                  <p className="capitalize">
                    final price : {v.product_final_price}
                  </p>
                  <p></p>
                  <div className="mb-5 flex gap-5 2xl:flex-row flex-col">
                    <button
                      className="capitalize bg-red-300 px-3 py-1 rounded-lg text-red-800"
                      onClick={() => {
                        props.addToCartHandler({
                          product_image: v.product_image,
                          product_name: v.product_name,
                          product_price: v.product_price,
                          product_final_price: v.product_final_price,
                          total: v.product_final_price,
                        });
                      }}
                    >
                      add to cart 
                    </button>
                    <button
                      className="capitalize bg-sky-300 px-3 py-1 rounded-lg text-blue-800"
                      onClick={() => {
                        navigate("/product-detail", {
                          state: {
                            product_image: v.product_image,
                            product_name: v.product_name,
                            product_price: v.product_price,
                            product_final_price: v.product_final_price,
                          },
                        });
                      }}
                    >
                      view product
                    </button>
                  </div>
                </div>
              </div>
            ))
          : productDetail?.slice(0, 4)?.map((v, i) => (
              <div
                key={i}
                className="flex flex-col gap-8 items-center justify-center border border-black rounded-lg p-2 h-full"
              >
                <div className="h-80 w-full">
                  <img
                    src={v.product_image}
                    alt="i-phone"
                    className="h-80 w-full"
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-2 h-1/2">
                  <h2 className="capitalize">{v.product_name}</h2>
                  <p className="line-through capitalize">
                    Price : {v.product_price}
                  </p>
                  <p className="capitalize">
                    final price : {v.product_final_price}
                  </p>
                  <p></p>
                  <div className="mb-5 flex 2xl:flex-row flex-col gap-5">
                    <button
                      className="capitalize bg-red-300 px-3 py-1 rounded-lg text-red-800"
                      onClick={() => {
                        props.addToCartHandler({
                          product_image: v.product_image,
                          product_name: v.product_name,
                          product_price: v.product_price,
                          product_final_price: v.product_final_price,
                          total: v.product_final_price,
                        });
                      }}
                    >
                      add to cart
                    </button>
                    <button
                      className="capitalize bg-sky-300 px-3 py-1 rounded-lg text-blue-800"
                      onClick={() => {
                        navigate("/product-detail", {
                          state: {
                            product_image: v.product_image,
                            product_name: v.product_name,
                            product_price: v.product_price,
                            product_final_price: v.product_final_price,
                          },
                        });
                      }}
                    >
                      view product
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Cart;
