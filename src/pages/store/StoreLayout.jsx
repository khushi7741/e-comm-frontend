import {
  IconAddressBook,
  IconBellFilled,
  IconFiltersFilled,
  IconLayoutDashboard,
  IconMailFilled,
  IconMenu2,
  IconShieldCheckeredFilled,
  IconSpeakerphone,
  IconStarsFilled,
  IconTopologyStarRing,
  IconUserFilled,
  IconUsers,
} from "@tabler/icons-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const StoreLayout = ({ children }) => {
  const navigate = useNavigate();
  const navData = [
    {
      icon: <IconLayoutDashboard />,
      name: "dashboard",
      link: "/store/categories",
    },
    {
      icon: <IconFiltersFilled />,
      name: "sellers",
      link: "/store/categories",
    },
    {
      icon: <IconUsers />,
      name: "customers",
      link: "/store/categories",
    },
    {
      icon: <IconShieldCheckeredFilled />,
      name: "products",
      link: "/store/list-product",
    },
    {
      icon: <IconStarsFilled />,
      name: "categories",
      link: "/store/categories",
    },
    {
      icon: <IconTopologyStarRing />,
      name: "blog overview",
      link: "/store/categories",
    },
    {
      icon: <IconSpeakerphone />,
      name: "ads manager",
      link: "/store/categories",
    },
    {
      icon: <IconAddressBook />,
      name: "content manager",
      link: "/store/categories",
    },
  ];
  let UserData = JSON.parse(localStorage.getItem("store"));
  useEffect(() => {
    !localStorage.getItem("store") && navigate("/store-login");
  }, []);
  return (
    <div className="h-screen w-full">
      <div className="flex">
        <div className="2xl:w-2/12 xl:w-1/5 lg:w-1/4 w-20 min-h-screen max-h-screen bg-indigo-300">
          <div className="h-16 bg-white shadow-lg flex items-center px-2">
            <div className="flex lg:justify-between justify-center w-full items-center">
              <div className="h-14 lg:block hidden">
                <img
                  src="/images/shop-logo.png"
                  alt="logo"
                  className="h-full w-full px-5"
                />
              </div>
              <div>
                <IconMenu2 className="h-9 w-9 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-7 p-7 capitalize font-semibold text-indigo-800 text-xl text-nowrap">
            {navData?.map((v, i) => (
              <div
                key={i}
                className="flex gap-3 w-full"
                onClick={() => navigate(v.link)}
              >
                <div>{v.icon}</div>
                <Link to={v.link} className="lg:block hidden">
                  {v.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="2xl:w-5/6 xl:w-4/5 lg:w-3/4 w-[calc(100%-80px)] h-screen">
          <div className="h-16 bg-white shadow-lg flex justify-end items-center text-indigo-600 sm:px-7 px-4 text-lg capitalize font-semibold">
            <div className="flex items-center gap-7">
              <Link className="lg:block hidden">overview</Link>
              <Link className="lg:block hidden">documentation</Link>
              <IconMailFilled className="sm:block hidden" />
              <IconBellFilled className="sm:block hidden" />
              {localStorage.getItem("store") && (
                <div className="flex items-center gap-5">
                  <div className="border rounded-full w-10 h-10 flex justify-center items-center">
                    <IconUserFilled />
                  </div>
                  <div className="text-sm">
                    <p>{UserData.userName}</p>
                    <p>{UserData.role}</p>
                  </div>
                  <div>
                    <button
                      className="capitalize bg-indigo-300 sm:px-5 px-2 py-1 rounded-lg font-semibold text-indigo-800"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/store-login");
                      }}
                    >
                      log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default StoreLayout;
