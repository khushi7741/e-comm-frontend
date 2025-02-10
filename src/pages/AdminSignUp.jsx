import {
  IconBrandFacebookFilled,
  IconBrandGoogleFilled,
} from "@tabler/icons-react";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const AdminSignUp = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      userName: yup
        .string()
        .min(2)
        .max(25)
        .matches(/^[a-zA-Z]+$/, "Must be only string")
        .required("please enter your user name"),
      email: yup.string().email().required("please enter your email address"),
      password: yup.string().min(6).required("please enter your password"),
      confirmPassword: yup
        .string()
        .required("please enter your confirm password")
        .oneOf([yup.ref("password"), null], "password must match"),
    }),
    onSubmit: (_, action) => {
      action.resetForm();
      collectData();
    },
  });
  const collectData = async () => {
   try {
    let { userName, email, password, confirmPassword } = values;
    let data = {
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: "admin",
    };
    let result = await fetch("http://localhost:5000/admin-sign-up", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("admin", JSON.stringify(result.result));
    localStorage.setItem("admin-token", JSON.stringify(result.auth));
    navigate("/admin-login");
   } catch (error) {
    console.log(error);
   }
  };
  return (
    <div className="h-screen w-full">
      <div className="flex gap-5 justify-center items-center h-screen w-full text-lg font-semibold xl:container mx-auto">
        <div className="w-3/5 p-10">
          <img
            src="./images/admin-signup2.png"
            alt="login"
            className="h-full w-full"
          />
        </div>
        <div className="w-2/5 bg-indigo-100 shadow-xl hover:shadow-purple-300/40 p-8 m-10 rounded-lg text-indigo-600">
          <div className="flex flex-col gap-7">
            <h1 className="capitalize text-3xl">admin sign up</h1>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2 capitalize">
                    <label htmlFor="userName" className="text-xl">
                      user name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={values.userName}
                      onChange={handleChange}
                      className="border-2 border-gray-300 rounded-md px-3 py-1 outline-none"
                    />
                    {errors.userName && touched.userName && (
                      <p className="text-red-600 font-semibold text-lg">
                        {errors.userName}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 capitalize">
                    <label htmlFor="email" className="text-xl">
                      email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="border-2 border-gray-300 rounded-md px-3 py-1 outline-none"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-600 font-semibold text-lg">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 capitalize">
                    <label htmlFor="password" className="text-xl">
                      password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className="border-2 border-gray-300 rounded-md px-3 py-1 outline-none"
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-600 font-semibold text-lg">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 capitalize">
                    <label htmlFor="confirmPassword" className="text-xl">
                      confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      className="border-2 border-gray-300 rounded-md px-3 py-1 outline-none"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-red-600 font-semibold text-lg">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-indigo-800 text-white w-full py-1 px-3 rounded-md"
                    >
                      sign up
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="h-1 w-2/5 bg-gray-300"></div>
              <p>or</p>
              <div className="h-1 w-2/5 bg-gray-300"></div>
            </div>
            <div className="flex flex-col gap-5 capitalize">
              <div className="flex gap-2 justify-center items-center border-2 border-red-700 p-2 rounded-md text-red-700">
                <IconBrandGoogleFilled />
                <p>continue with google</p>
              </div>
              <div className="flex gap-2 justify-center items-center border-2 border-blue-800 p-2 rounded-md text-blue-800">
                <IconBrandFacebookFilled />
                <p>continue with facebook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
