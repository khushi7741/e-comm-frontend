import {
  IconBrandFacebookFilled,
  IconBrandGoogleFilled,
  IconLockFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const StoreLogin = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("please enter your email "),
      password: yup.string().min(6).required("please enter your password"),
    }),
    onSubmit: (_, action) => {
      collectData(action);
    },
  });
  const collectData = async (e) => {
    try {
      let { email, password } = values;
    let data = {
      email: email,
      password: password,
    };
    let result = await fetch("http://localhost:5000/store-login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      e.resetForm();
      localStorage.setItem("store", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/store/categories");
    } else {
      alert("please enter correct details");
    }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full">
      <div className="flex gap-5 justify-center items-center h-screen w-full text-lg font-semibold xl:container mx-auto">
        <div className="w-2/5 bg-violet-100 shadow-xl hover:shadow-violet-300/40 p-8 m-10 rounded-lg text-violet-900">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="capitalize text-3xl">store login</h1>
              <p className="text-gray-500">
                doesn't have an account yet ?{" "}
                <span className="text-violet-900 underline capitalize">
                  <Link to="/store-signup">sign up</Link>
                </span>
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2 capitalize">
                    <div className="flex gap-1 items-center">
                      <IconUserFilled />
                      <label htmlFor="email" className="text-xl">
                        email
                      </label>
                    </div>
                    <input
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="border-2 border-gray-300 rounded-3xl px-3 py-1 outline-none"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-600 font-semibold text-lg">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 capitalize">
                    <div className="flex gap-1 items-center">
                      <IconLockFilled />
                      <label htmlFor="password" className="text-xl">
                        password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className="border-2 border-gray-300 rounded-3xl px-3 py-1 outline-none"
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-600 font-semibold text-lg">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center items-center">
                    <Link to="" className="text-violet-700">
                      forgot password?
                    </Link>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="bg-violet-900 text-white w-full py-1 px-3 rounded-3xl"
                    >
                      login
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="h-1 w-2/6 bg-gray-300"></div>
              <p>or login with</p>
              <div className="h-1 w-2/6 bg-gray-300"></div>
            </div>
            <div className="flex gap-5 capitalize">
              <div className="flex gap-2 justify-center items-center w-full border-2 border-red-700 p-2 rounded-3xl text-red-700">
                <IconBrandGoogleFilled />
                <p>google</p>
              </div>
              <div className="flex gap-2 justify-center items-center w-full border-2 border-blue-800 p-2 rounded-3xl text-blue-800">
                <IconBrandFacebookFilled />
                <p>facebook</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5 p-5">
          <img
            src="./images/store-login.jpg"
            alt="login"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default StoreLogin;
