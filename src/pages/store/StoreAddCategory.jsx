import { useFormik } from "formik";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

const StoreAddCategory = () => {
  const location = useLocation();
    if (location.pathname.startsWith("/store")) {
      localStorage.removeItem("admin-token");
      localStorage.removeItem("admin");
      localStorage.removeItem("user");
      localStorage.removeItem("user-token");
    }
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("id");

  const navigate = useNavigate();
  const role_data = JSON.parse(localStorage.getItem("store"));
  const category_data = async () => {
    try {
      const data = {
        category_name: values.categoryName,
        role: role_data.role,
      };
      const response = await fetch("http://localhost:5000/store-add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("store-token"))}`,
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: yup.object({
      categoryName: yup
        .string()
        .matches(/^[a-zA-Z]+$/, "Must be only string")
        .required("please enter product name"),
    }),
    onSubmit: (_, action) => {
      action.resetForm();
      category_data();
    },
  });

  return (
    <div className="p-8 h-[calc(100vh-64px)] overflow-y-auto bg-gray-100">
      <div className="flex flex-col gap-7">
        <div className="bg-white rounded-lg shadow-lg p-5 flex text-lg font-semibold text-indigo-600">
          <h1 className="capitalize text-2xl">add category</h1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5 text-lg font-semibold text-gray-600">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 capitalize">
              <div className="flex gap-3 items-center text-nowrap">
                <label htmlFor="categoryName"> category name : </label>
                <input
                  type="text"
                  name="categoryName"
                  value={values.categoryName}
                  className="border-2 border-gray-400 rounded-lg w-1/2 p-1"
                  onChange={handleChange}
                />
              </div>
              {errors.categoryName && touched.categoryName ? (
                <p className="text-red-600 font-semibold text-lg">
                  {errors.categoryName}
                </p>
              ) : null}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="capitalize bg-sky-600 text-white px-6 py-1 rounded-lg"
                  onClick={() => navigate("/store/categories")}
                >
                  back
                </button>
                <button
                  type="submit"
                  className="capitalize bg-red-600 text-white px-6 py-1 rounded-lg"
                >
                  {query ? "update" : "add"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoreAddCategory;
