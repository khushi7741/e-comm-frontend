import { IconLock, IconUserFilled } from "@tabler/icons-react";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
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
    let { email, password } = values;
    let data = {
      email: email,
      password: password,
    };
    let result = await fetch("http://localhost:5000/admin-login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.role === "admin") {
      e.resetForm();
      localStorage.setItem("admin", JSON.stringify(result));
      navigate("/admin/dashboard");
    } else {
      alert("please enter correct details");
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="flex gap-5 justify-center items-center h-screen w-full text-lg font-semibold xl:container mx-auto">
        <div className="w-2/5 bg-purple-100 shadow-xl hover:shadow-purple-300/40 p-8 m-10 rounded-lg text-purple-600">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="capitalize text-3xl">admin login</h1>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2 capitalize relative">
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="border-2 border-purple-300 rounded-3xl px-3 py-1 outline-none"
                    />
                    <IconUserFilled className="absolute right-3 top-2" />
                    {errors.email && touched.email && (
                      <p className="text-red-600 font-semibold text-lg">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 capitalize relative">
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className="border-2 border-purple-300 rounded-3xl px-3 py-1 outline-none"
                    />
                    <IconLock className="absolute right-3 top-2" />
                    {errors.password && touched.password && (
                      <p className="text-red-600 font-semibold text-lg">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-purple-600 text-white w-full py-1 px-3 rounded-3xl"
                    >
                      login
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 capitalize">
              <div className="text-gray-500">
                <Link>forgot your password ?</Link>
              </div>
              <div>
                <Link to="/admin-signup">get help signed in</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5 p-5">
          <img
            src="./images/admin-login3.jpg"
            alt="login"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
