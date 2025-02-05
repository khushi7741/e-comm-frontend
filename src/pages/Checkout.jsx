import React, { useEffect, useState } from "react";
import HeaderContainer from "../containers/HeaderContainer";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const Checkout = () => {
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  let total = 0;
  location?.state?.map((k, i) => {
    return (total += k.cartData.total);
  });
  const options = {
    key: "rzp_test_HJG5Rtuy8Xh2NB",
    amount: "100", //  = INR 1
    name: "Acme shop",
    description: "some description",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response) {
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: "Gaurav",
      contact: "9999999999",
      email: "demo@demo.com",
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "#F37254",
      hide_topbar: false,
    },
  };
  const openPayModal = (options) => {
    let rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: "",
      fullAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .min(2)
        .max(25)
        .matches(/^[a-zA-Z]+$/, "Must be only string")
        .required("please enter your first name"),
      lastName: yup
        .string()
        .min(2)
        .max(25)
        .matches(/^[a-zA-Z]+$/, "Must be only string")
        .required("please enter your last name"),
      phoneNumber: yup
        .string()
        .min(3)
        .max(10)
        .required("please enter your phone number"),
      emailAddress: yup
        .string()
        .email()
        .required("please enter your email address"),
      fullAddress: yup.string().required("please enter your full address"),
      city: yup
        .string()
        .min(3)
        .max(15)
        .matches(/^[a-zA-Z]+$/, "Must be only string")
        .required("please enter your city"),
      state: yup
        .string()
        .min(3)
        .max(15)
        .matches(/^[a-zA-Z]+$/, "Must be only string")
        .required("please enter your state"),
      zipCode: yup
        .string()
        .min(3)
        .max(10)
        .required("please enter your zipcode"),
    }),
    onSubmit: (_, action) => {
      action.resetForm();
      setUserData([...userData, values]);
      openPayModal(options);
    },
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <div>
      <HeaderContainer />
      <div className="flex mt-10 gap-10 p-5 xl:container mx-auto">
        <div className="flex flex-col border-2 border-gray-200 rounded-lg w-1/2 font-semibold">
          <h1 className="capitalize py-2 px-5 border-b-2 border-b-gray-200 bg-gray-200 text-2xl">
            basic information
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="p-5 flex flex-col gap-5 capitalize text-xl">
              <div className="flex gap-5">
                <div className="flex flex-col w-1/2 gap-1.5">
                  <label htmlFor="firstName">first name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    className="border-2 border-gray-300 p-1 rounded-md"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-600 font-semibold text-lg">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-1/2 gap-1.5">
                  <label htmlFor="lastName">last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    className="border-2 border-gray-300 p-1 rounded-md"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-600 font-semibold text-lg">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col w-1/2 gap-1.5">
                  <label htmlFor="phoneNumber">phone number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    className="border-2 border-gray-300 p-1 rounded-md"
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <p className="text-red-600 font-semibold text-lg">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-1/2 gap-1.5">
                  <label htmlFor="emailAddress">email address</label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={values.emailAddress}
                    onChange={handleChange}
                    className="border-2 border-gray-300 p-1 rounded-md"
                  />
                  {errors.emailAddress && touched.emailAddress && (
                    <p className="text-red-600 font-semibold text-lg">
                      {errors.emailAddress}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col w-full gap-1.5">
                  <label htmlFor="fullAddress">full address</label>
                  <textarea
                    name="fullAddress"
                    id="fullAddress"
                    value={values.fullAddress}
                    onChange={handleChange}
                    className="border-2 border-gray-300 p-2 rounded-md"
                  ></textarea>
                  {errors.fullAddress && touched.fullAddress && (
                    <p className="text-red-600 font-semibold text-lg">
                      {errors.fullAddress}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5 w-full justify-center">
                <div className="flex flex-col  gap-1.5">
                  <label htmlFor="city">city</label>
                  <input
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    className="border-2 border-gray-300 p-1 rounded-md"
                  />
                  {errors.city && touched.city && (
                    <p className="text-red-600 font-semibold text-lg">
                      {errors.city}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="state">state</label>
                  <input
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    className="border-2 border-gray-300 p-1 rounded-md"
                  />
                  {errors.state && touched.state && (
                    <p className="text-red-600 font-semibold text-lg">
                      {errors.state}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="zipCode">zip code</label>
                  <input
                    type="number"
                    name="zipCode"
                    value={values.zipCode}
                    onChange={handleChange}
                    className="border-2 border-gray-300 p-1 rounded-md"
                  />
                  {errors.zipCode && touched.zipCode && (
                    <p className="text-red-600 font-semibold text-lg">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                {/* <button type="button" className="capitalize bg-sky-300 text-blue-800 px-3 py-1 rounded-lg">
                  place order
                </button> */}
                <button className="capitalize bg-yellow-300 text-red-800 px-3 py-1 rounded-lg">
                  pay online
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/2 text-xl">
          <table className="border-2 border-gray-200 w-full font-semibold">
            <thead>
              <tr className="border-b-2 border-b-gray-200 *: p-2">
                <th className="border-r-2 border-r-gray-200 p-2">
                  product name
                </th>
                <th className="border-r-2 border-r-gray-200">price</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {location?.state?.map((v, i) => (
                <tr
                  key={i}
                  className="border-b-2 border-b-gray-200 *:border-r-2 *:border-r-gray-200 capitalize"
                >
                  <td className="border-r-2 border-r-gray-200 p-2">
                    {v.cartData.product_name}
                  </td>
                  <td className="border-r-2 border-r-gray-200 text-center">
                    {v.cartData.product_price}
                  </td>
                  <td className="text-center">{v.cartData.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end capitalize font-semibold px-3 py-1 border-b-2 border-r-2 border-l-2 text-xl">
            <p>total : {total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
