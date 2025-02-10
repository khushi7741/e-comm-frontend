import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

const AdminEditProduct = () => {
  const inputRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("id");
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    values,
    setFieldValue,
    setValues,
    errors,
    touched,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      category_name: "",
      product_image: "",
      product_name: "",
      product_price: "",
      product_final_price: "",
    },
    validationSchema: yup.object({
      category_name: yup.string().required("please select the category"),
      product_image: yup.string().required("please upload your image"),
      product_name: yup
        .string()
        .min(2)
        .max(25)
        .matches(/^[a-zA-Z-]+$/, "Must be only string")
        .required("please enter product name"),
      product_price: yup.string().required("please enter product price"),
      product_final_price: yup
        .string()
        .required("please enter final product price"),
    }),
    onSubmit: (_, action) => {
      action.resetForm();
      Updated_product_data();
      setIsLoading(false);
    },
  });
  const getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin-selected-product/${query}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      let data = await response.json();
      query && setIsLoading(true);
      setValues({
        category_name: data.category_name,
        product_image: data.product_image,
        product_name: data.product_name,
        product_price: data.product_price,
        product_final_price: data.product_final_price,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const Updated_product_data = async () => {
    try {
      const data = {
        category_name: values.category_name,
        product_image: values.product_image,
        product_name: values.product_name,
        product_price: values.product_price,
        product_final_price: values.product_final_price,
      };
      const response = await fetch(
        `http://localhost:5000/admin-update-product/${query}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify(data),
        }
      );
      let result = await response.json();
      if (result) {
        console.log(result);
        navigate("/admin/list-product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      setIsLoading(true);
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "cart_items");
      data.append("cloud_name", "drsh8sn1x");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/drsh8sn1x/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const cloudData = await response.json();
      setFieldValue("product_image", cloudData.url);
    } catch (error) {
      console.log(error);
    }
  };

  const category_list = async () => {
    try {
      const response = await fetch(
        "https://677614da12a55a9a7d0a8150.mockapi.io/api/categories"
      );
      let data = await response.json();
      setCategoryList(data);
    } catch (error) {
      console.log(error);
    }
  };
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      category_list();
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!ignore) {
      getData();
    }
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <div className="p-8 h-[calc(100vh-64px)] bg-gray-100 overflow-y-auto">
      <div className="flex flex-col gap-7">
        <div className="bg-white rounded-lg shadow-lg p-5 flex text-lg font-semibold text-sky-600">
          <h1 className="capitalize text-2xl">edit product</h1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-10 overflow-y-auto">
          <div className="flex items-center w-full h-full">
            <div className="border-2 border-gray-400 rounded-lg lg:p-10 p-5 2xl:w-1/2 xl:w-3/4 w-full h-full">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 capitalize">
                  <div className="flex md:flex-row flex-col gap-5">
                    <label htmlFor="category_name" className="text-nowrap">
                      category :
                    </label>
                    <select
                      className="border-2 border-gray-400 rounded-lg p-1 w-full capitalize"
                      value={values.category_name}
                      name="category_name"
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      {categoryList?.map((v, i) => (
                        <option key={i} value={v.category_name}>
                          {v.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.category_name && touched.category_name ? (
                    <p className="text-red-600 font-semibold text-lg text-center">
                      {errors.category_name}
                    </p>
                  ) : null}
                  <div className="flex md:flex-row flex-col md:gap-10 gap-5">
                    <label htmlFor="product_image" className="text-nowrap">
                      image :
                    </label>
                    {isLoading ? (
                      <div className="border-2 border-gray-400 rounded-lg p-1 h-96 w-full">
                        <input
                          className="hidden"
                          ref={inputRef}
                          type="file"
                          onChange={handleFileUpload}
                        />
                        <img
                          src={values.product_image}
                          alt="product-image"
                          className="h-full w-full"
                          onClick={() => inputRef.current.click()}
                        />
                      </div>
                    ) : (
                      <input
                        type="file"
                        name="product_image"
                        className="border-2 border-gray-400 rounded-lg p-1 w-full capitalize"
                        value={values.product_image}
                        onChange={handleFileUpload}
                      />
                    )}
                  </div>
                  {errors.product_image && touched.product_image ? (
                    <p className="text-red-600 font-semibold text-lg text-center">
                      {errors.product_image}
                    </p>
                  ) : null}
                  <div className="flex md:flex-row flex-col md:gap-10 gap-5">
                    <label htmlFor="product_name" className="text-nowrap">
                      name :
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      value={values.product_name}
                      className="border-2 border-gray-400 rounded-lg p-1 w-full capitalize"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.product_name && touched.product_name ? (
                    <p className="text-red-600 font-semibold text-lg text-center">
                      {errors.product_name}
                    </p>
                  ) : null}
                  <div className="flex md:flex-row flex-col md:gap-12 gap-5">
                    <label htmlFor="product_price" className="text-nowrap">
                      price :
                    </label>
                    <input
                      type="number"
                      name="product_price"
                      value={values.product_price}
                      className="border-2 border-gray-400 rounded-lg p-1 w-full"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.product_price && touched.product_price ? (
                    <p className="text-red-600 font-semibold text-lg text-center">
                      {errors.product_price}
                    </p>
                  ) : null}
                  <div className="flex md:flex-row flex-col md:gap-3 gap-5">
                    <label
                      htmlFor="product_final_price"
                      className="text-nowrap"
                    >
                      final price :
                    </label>
                    <input
                      type="number"
                      name="product_final_price"
                      value={values.product_final_price}
                      className="border-2 border-gray-400 rounded-lg p-1 w-full"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.product_final_price && touched.product_final_price ? (
                    <p className="text-red-600 font-semibold text-lg text-center">
                      {errors.product_final_price}
                    </p>
                  ) : null}
                  <div className="flex sm:flex-row flex-col gap-5 justify-center items-center mt-5">
                    <button
                      type="button"
                      className="capitalize bg-red-300 px-6 py-1.5 rounded-lg font-bold text-red-800"
                      onClick={() => navigate("/admin/list-product")}
                    >
                      back
                    </button>
                    <button
                      type="submit"
                      className="capitalize bg-red-300 sm:px-6 px-4 py-1.5 rounded-lg font-bold text-red-800"
                    >
                      {query ? "update product" : "add product"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
