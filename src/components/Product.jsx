import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

const Product = (props) => {
  const location = useLocation();
  const imgArr = [
    "./images/homedecor/home1.jpg",
    "./images/homedecor/home7.jpg",
    "./images/kitchenware/mixture.jpg",
    "./images/shoes/campuskids.jpg",
    "./images/kitchenware/blender.jpg",
  ];
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState([]);
  const product_detail = async () => {
    try {
      let copyData = productDetail;
      const response = await fetch("http://localhost:5000/products", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("user-token"))}`,
        },
      });
      let data = await response.json();
      copyData = data;
      copyData = copyData.sort(() => Math.random() - Math.random()).slice(0, 5);
      setProductDetail(copyData);
    } catch (error) {
      console.log(error);
    }
  };
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      product_detail();
    }
    return () => {
      ignore = true;
    };
  }, []);
  useEffect(() => {
    console.log(productDetail);
  }, [productDetail]);
  return (
    <div className="w-full h-screen">
      <div className="xl:container mx-auto xl:px-0 px-5 text-xl font-bold p-5">
        <div className="flex flex-col gap-20">
          <div className="flex justify-center items-center">
            <div className="w-1/2 flex flex-col items-center justify-center gap-5">
              <div className="h-80">
                <img
                  src={location.state.product_image}
                  alt="image"
                  className="h-full w-full"
                />
              </div>
              <div className="flex w-4/5 h-24">
                {imgArr.map((val, i) => (
                  <img src={val} alt="slider" className="h-24 w-1/5" key={i} />
                ))}
              </div>
            </div>
            <div className="w-1/2 flex justify-center flex-col capitalize gap-3 px-10">
              <p>Product name : {location.state.product_name}</p>
              <p>price : {location.state.product_price}</p>
              <p>Final price : {location.state.product_final_price}</p>
              <div className="flex *:text-yellow-600">
                <IconStarFilled />
                <IconStarFilled />
                <IconStarFilled />
                <IconStarFilled />
                <IconStar />
              </div>
              <p>color : black</p>
              <p>service : device setup</p>
              <button
                className="capitalize bg-red-300 px-3 py-1 rounded-lg text-red-800 w-fit"
                onClick={() => {
                  props.addToCartHandler({
                    product_image: location.state.product_image,
                    product_name: location.state.product_name,
                    product_price: location.state.product_price,
                    product_final_price: location.state.product_final_price,
                    total: location.state.product_final_price,
                  });
                }}
              >
                add to cart
              </button>
            </div>
          </div>
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center items-center gap-8 w-full px-10">
            {productDetail?.map((v, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center border border-black rounded-lg p-2 h-full"
              >
                <div className="h-1/2 w-full">
                  <img
                    src={v.product_image}
                    alt="i-phone"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-2 h-1/2">
                  <h2 className="capitalize">{v.name}</h2>
                  <p className="line-through capitalize">
                    Price : {v.product_price}
                  </p>
                  <p className="capitalize">
                    final price : {v.product_final_price}
                  </p>
                  <p></p>
                  <div className="flex gap-5 flex-col">
                    <button
                      className="capitalize bg-red-300 px-3 py-1 rounded-lg text-red-800"
                      onClick={() => {
                        props.addToCartHandler({
                          product_image: v.image,
                          product_name: v.name,
                          product_price: v.price,
                          product_final_price: v.final_price,
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
      </div>
    </div>
  );
};

export default Product;
