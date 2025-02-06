import {
  IconBellFilled,
  IconFiltersFilled,
  IconLayoutDashboard,
  IconLogout,
  IconMailFilled,
  IconMenu2,
  IconShieldCheckeredFilled,
  IconSpeakerphone,
  IconStarsFilled,
  IconTopologyStarRing,
  IconUserFilled,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect } from "react";
// import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const navData = [
    {
      icon: <IconLayoutDashboard />,
      name: "dashboard",
      link: "/admin/dashboard",
    },
    {
      icon: <IconFiltersFilled />,
      name: "sellers",
      link: "/admin/dashboard",
    },
    {
      icon: <IconUsers />,
      name: "customers",
      link: "/admin/dashboard",
    },
    {
      icon: <IconShieldCheckeredFilled />,
      name: "products",
      link: "/admin/list-product",
    },
    {
      icon: <IconStarsFilled />,
      name: "categories",
      link: "/admin/categories",
    },
    {
      icon: <IconTopologyStarRing />,
      name: "blog overview",
      link: "/admin/dashboard",
    },
    {
      icon: <IconSpeakerphone />,
      name: "ads manager",
      link: "/admin/dashboard",
    },
    {
      icon: <IconLogout />,
      name: "logout",
      link: "/admin/dashboard",
    },
  ];
  let UserData = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    !localStorage.getItem("admin") && navigate("/admin-login");
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="flex">
        <div className="2xl:w-2/12 xl:w-1/5 lg:w-1/4 w-20 min-h-screen max-h-screen bg-sky-200">
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
                <IconMenu2 className="h-9 w-9 text-sky-700" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-7 p-7 capitalize font-semibold text-blue-700 text-xl text-nowrap">
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
          <div className="h-16 bg-white shadow-lg flex justify-end items-center text-sky-700 px-7 text-lg capitalize font-semibold">
            <div className="flex items-center gap-7">
              <Link className="md:block hidden">overview</Link>
              <Link className="md:block hidden">documentation</Link>
              <IconMailFilled className="sm:block hidden" />
              <IconBellFilled className="sm:block hidden" />
              {localStorage.getItem("admin") && (
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
                      className="capitalize bg-sky-600 px-5 py-1 rounded-lg font-semibold text-white"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/admin-login");
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

export default AdminLayout;
