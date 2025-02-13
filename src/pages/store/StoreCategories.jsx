import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StoreCategories = () => {
  const location = useLocation();
    if (location.pathname.startsWith("/store")) {
      localStorage.removeItem("admin-token");
      localStorage.removeItem("admin");
      localStorage.removeItem("user");
      localStorage.removeItem("user-token");
    }
  const [categoryList, setCategoryList] = useState();
  const navigate = useNavigate();
  const category_list = async() => {
    try {
      const response = await fetch("http://localhost:5000/categories", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("store-token"))}`,
        },
      });
      let data = await response.json();
      console.log(data);
      setCategoryList(data?.filter((v, i) => v.role === "store"));
    } catch (error) {
      console.log(error);
    }
  }
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      category_list();
    }
    return () => {
      ignore = true;
    };
  }, []);
  const handleDeleteCategory = async(id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/store-delete-category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem("store-token"))}`,
          },
        }
      );
      let result = await response.json();
      if (result) {
        category_list();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-8 h-[calc(100vh-64px)] overflow-y-auto bg-gray-100 capitalize">
      <div className="flex flex-col gap-5">
        <div className="bg-white rounded-lg shadow-lg p-5 flex justify-between text-lg font-semibold text-indigo-600">
          <h1 className="capitalize text-2xl">categories</h1>
          <button
            className="capitalize flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md"
            onClick={() => navigate("/store/add-category")}
          >
            <IconPlus />
            <span> new category</span>
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5 flex justify-between text-lg font-semibold">
          <div className="border border-gray-400 rounded-lg w-full">
            <div className="overflow-x-auto scrollbar-x-custom rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 text-black/70 text-lg text-nowrap *:py-3 *:px-2 rounded-lg">
                    <th className="w-24">id</th>
                    <th className="text-left">category name</th>
                    <th className="w-80">active</th>
                  </tr>
                </thead>

                <tbody>
                  {categoryList?.map((v, i) => (
                    <tr
                      className="border-b border-b-light-gray text-nowrap text-center text-gray-500 *:py-3 *:px-2"
                      key={i}
                    >
                      <td className="w-24">{i + 1}</td>
                      <td className="text-left">{v.category_name}</td>
                      <td className="w-80">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            className="flex items-center gap-2 px-4 py-1 text-left capitalize bg-blue-500 rounded-md text-white"
                            onClick={() =>
                              navigate(`/store/edit-category?id=${v._id}`)
                            }
                          >
                            <IconEdit className="w-6 h-6" />
                            <span className="text-lg font-medium">Edit</span>
                          </button>
                          <button
                            className="flex items-center gap-2 px-4 py-1 text-left capitalize bg-red-600 rounded-md text-white"
                            onClick={() => handleDeleteCategory(v._id)}
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

export default StoreCategories;
