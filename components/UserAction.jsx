import React from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";

import { AiOutlineClose, AiOutlineMenu, AiFillSetting } from "react-icons/ai";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { logOut } from "@/redux-slices/User";
import { toast } from "react-toastify";
import Link from "next/link";

function UserAction() {
  const { user } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  const userLoginTime =
    new Date(user.updatedAt).toDateString() +
    ", " +
    new Date(user.updatedAt).toLocaleTimeString();

  const option = [
    {
      icons: <FaUserCircle />,
      name: "Welcome, " + user.name.split(" ")[0] || user.name,
    },
    {
      icons: <FaUserPlus />,
      name: "Add Connections",
    },
    {
      icons: <IoMdLogOut />,
      name: "Logout",
    },
    {
      icons: <AiFillSetting />,
      name: "Setting",
    },
    {
      icons: null,
      name: `Last Login: ${userLoginTime}`,
    },
  ];

  const handleLogout = () => {
    toast.success("Logout Successfully");
    Cookies.remove("token");
    dispatch(logOut());
    localStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            <span className="mr-2">{option[0].icons}</span>
            <span
              className={`${
                active ? " text-white" : "text-gray-900"
              } capitalize`}
            >
              {option[0].name}
            </span>
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link
            href={`/connections/${user.name}`}
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            <span className="mr-2">{option[1].icons}</span>
            <span className={`${active ? " text-white" : "text-gray-900"} `}>
              {option[1].name}
            </span>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            onClick={handleLogout}
          >
            <span className="mr-2">{option[2].icons}</span>
            <span className={`${active ? " text-white" : "text-gray-900"} `}>
              {option[2].name}
            </span>
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            <span className="mr-2">{option[3].icons}</span>
            <span className={`${active ? " text-white" : "text-gray-900"}`}>
              {option[3].name}
            </span>
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center text-left rounded-md px-2 py-2 text-sm font-medium`}
          >
            <span className="mr-2">{option[4]?.icons}</span>
            <span
              className={`${
                active ? " text-white" : "text-gray-900"
              } text-[10px]`}
            >
              {option[4]?.name}
            </span>
          </button>
        )}
      </Menu.Item>
    </>
  );
}

export default UserAction;
