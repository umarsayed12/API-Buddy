import {
  IconDashboard,
  IconLogin,
  IconLogin2,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { HistoryIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoadUserQuery, useLogoutUserMutation } from "../slices/api/authApi";

const Navbar = () => {
  const [logoutUser, { isSuccess, isError }] = useLogoutUserMutation();
  const isAuth = useSelector((state) => state?.auth?.isAuthenticated);

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
  };
  const NavItems = [
    {
      title: "Dashboard",
      show: isAuth,
      icon: <IconDashboard />,
      className: "focus:bg-black focus:text-white",
    },
    {
      title: "History",
      show: isAuth,
      icon: <HistoryIcon />,
      link: "/test-history",
      className: "focus:bg-black focus:text-white",
    },
    {
      title: "Profile",
      show: isAuth,
      link: "/profile",
      icon: <IconUser />,
      className: "focus:bg-black focus:text-white",
    },
    {
      title: "Login",
      show: !isAuth,
      link: "/login",
      icon: <IconLogin />,
      className: "focus:bg-white focus:text-black",
    },
    {
      title: "Signup",
      show: !isAuth,
      link: "/signup",
      icon: <IconUser />,
      className: "bg-black text-white focus:bg-black focus:text-white",
    },
  ];
  return (
    <div className="fixed z-50 w-full card flex justify-between bg-white p-3 px-6 shadow-md shadow-purple-200/50 rounded-md">
      <div className="font-bold text-2xl p-3">API Buddy</div>
      <ul className={`w-[${10 * NavItems?.length}%] flex gap-2`}>
        {NavItems?.map(
          (item) =>
            item.show && (
              <li
                key={item.title}
                className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
              >
                <button
                  variant={item.variant ? item.variant : "none"}
                  onClick={() => navigate(item.link ? item.link : "/")}
                  className={`p-16-semibold cursor-pointer shadow-xl justify-center items-center flex size-full gap-4 p-3 group font-semibold rounded-full bg-cover hover:bg-gray-700 hover:text-white hover:shadow-inner text-gray-700 transition-all ease-linear ${item.className}`}
                >
                  {item.icon}
                  {item?.title}
                </button>
              </li>
            )
        )}
        {isAuth && (
          <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
            <button
              onClick={handleLogout}
              className="p-16-semibold cursor-pointer justify-center items-center flex size-full gap-4 p-3 group font-semibold rounded-full bg-cover hover:bg-gray-700 hover:text-white hover:shadow-inner focus:bg-black focus:text-white text-gray-700 transition-all ease-linear"
            >
              <IconLogout /> Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
