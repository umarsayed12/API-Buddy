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
  //   const user = useSelector((state) => state?.auth?.user) || null;
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
  };
  const NavItems = [
    {
      title: "Dashboard",
      show: isAuth,
      icon: <IconDashboard />,
    },
    {
      title: "History",
      show: isAuth,
      icon: <HistoryIcon />,
    },
    {
      title: "Profile",
      show: isAuth,
      icon: <IconUser />,
    },
    {
      title: "Login",
      show: !isAuth,
      link: "/login",
      icon: <IconLogin />,
    },
    {
      title: "Signup",
      show: !isAuth,
      link: "/signup",
      icon: <IconUser />,
      className: "bg-gray-900 text-white",
    },
  ];
  return (
    <div className="fixed w-full card flex justify-between bg-white p-3 px-6 shadow-md shadow-purple-200/50 rounded-md">
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
                  onClick={() => navigate(item.link ? item.link : "/")}
                  className={`p-16-semibold cursor-pointer shadow-xl ${item.className} justify-center items-center flex size-full gap-4 p-3 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear`}
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
              className="p-16-semibold cursor-pointer justify-center items-center flex size-full gap-4 p-3 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
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
