import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StoreListProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState();
  const product_detail = async () => {
    const response = await fetch("http://localhost:5000/products");
    let data = await response.json();
    setProductData(data?.filter((v, i) => v.role === "store"));
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
    console.log(productData);
  }, [productData]);
  async function handleDeleteProduct(id) {
    const response = await fetch(
      `http://localhost:5000/admin-delete-product/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let result = await response.json();
    if (result) {
      product_detail();
    }
  }
  return (
    <div className="p-8 h-[calc(100vh-64px)] overflow-y-auto bg-gray-100">
      <div className="flex flex-col gap-7">
        <div className="bg-white rounded-lg shadow-lg p-5 flex justify-between text-lg font-semibold text-indigo-600">
          <h1 className="capitalize text-2xl">product list</h1>
          <button
            className="capitalize flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md"
            onClick={() => navigate("/store/add-product")}
          >
            <IconPlus />
            <span> new product</span>
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-10">
          <div className="border border-gray-400 rounded-lg mb-14">
            <div className="overflow-x-auto scrollbar-x-custom rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 text-black/70 text-lg text-nowrap *:py-3 *:px-2 rounded-lg">
                    <th>id</th>
                    <th>product image</th>
                    <th>product name</th>
                    <th>price</th>
                    <th>final_price</th>
                    <th>category</th>
                    <th>action</th>
                  </tr>
                </thead>

                <tbody>
                  {productData?.map((v, i) => (
                    <tr
                      className="border-b border-b-light-gray text-nowrap text-center text-gray-500 *:py-3 *:px-2 font-semibold capitalize"
                      key={i}
                    >
                      <td>{i + 1}</td>
                      <td className="flex justify-center">
                        <img
                          src={v.product_image}
                          alt="product"
                          className="h-14 w-14 border rounded-xl"
                        />
                      </td>
                      <td>{v.product_name}</td>
                      <td>{v.product_price}</td>
                      <td>{v.product_final_price}</td>
                      <td>{v.category_name}</td>
                      <td className="w-80">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            className="flex items-center gap-2 px-4 py-1 text-left capitalize bg-blue-500 rounded-md text-white"
                            onClick={() =>
                              navigate(`/store/add-product?id=${v._id}`)
                            }
                          >
                            <IconEdit className="w-6 h-6" />
                            <span className="text-lg font-medium">Edit</span>
                          </button>
                          <button
                            className="flex items-center gap-2 px-4 py-1 text-left capitalize bg-red-600 rounded-md text-white"
                            onClick={() => handleDeleteProduct(v._id)}
                          >
                            <IconTrash className="w-6 h-6" />
                            <span className="text-lg font-medium">Remove</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreListProduct;
