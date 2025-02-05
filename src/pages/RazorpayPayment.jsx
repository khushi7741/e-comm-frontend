import React, { useEffect } from "react";

const RazorpayPayment = () => {
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
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button className="capitalize font-semibold text-2xl bg-red-300 text-red-800 px-6 py-2 rounded-lg" onClick={() => openPayModal(options)}>make a payment</button>
    </div>
  );
};

export default RazorpayPayment;
