import Image from "next/image";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { FaRegBell } from "react-icons/fa";
import { MdClose, MdOutlineKeyboardArrowDown } from "react-icons/md";

import { links } from "./Sidebar";
import MenuUI from "./headlessUI/MenuUI";
import { Menu } from "@headlessui/react";
import { useSelector } from "react-redux";
import UserAction from "./UserAction";
import BrandImage from "./BrandImage";

export default function Navbar() {
  const { isAuth, user } = useSelector((state: any) => state.user);
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const closeSideBar = () => {
    setIsOpen(false);
  };
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const main = document.getElementsByTagName("main")[0];
    const nav = document.getElementsByTagName("nav")[0];

    if (isOpen) {
      document.body.style.overflow = "hidden";
      main.style.filter = "brightness(0.7)";
      main.addEventListener("click", toggleSideBar);
      nav.addEventListener("click", toggleSideBar);
    }
    return () => {
      document.body.style.overflow = "auto";
      main.style.filter = "brightness(1)";

      main.removeEventListener("click", closeSideBar);
      nav.removeEventListener("click", closeSideBar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <nav className="lg:hidden shadow-md px-5 py-3 space-x-5 flex h-16">
        <button onClick={toggleSideBar} type="button">
          {!isOpen ? (
            <div className="flex flex-col gap-1.5 scale-50">
              <span className="w-10 rounded-full h-0 border-4 border-slate-700"></span>
              <span className="w-12 rounded-full h-0 border-4 border-yellow-400"></span>
              <span className="w-8 rounded-full h-0 border-4 border-slate-700"></span>
            </div>
          ) : (
            <MdClose className="text-3xl w-12" />
          )}
        </button>
        <ul className="flex flex-1 justify-between items-center">
          <li>
            <BrandImage />
          </li>
          <li>
            <div className="flex text-xl space-x-2 items-center">
              <button
                className="grid place-items-center rounded-full hover:shadow-md w-8 h-8 p-1"
                type="button"
              >
                <FaRegBell className="rounded-full" />
              </button>

              {isAuth && (
                <MenuUI
                  parent={
                    <Menu.Button className="w-4 mr-5 text-xl">
                      <div className="grid place-items-center rounded-full border-2 shadow-sm w-8 h-8 p-0 hover:border-yellow-400">
                        <Image
                          src={
                            user && user.photo
                              ? user.photo
                              : "https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg"
                          }
                          height={60}
                          width={60}
                          className="h-full rounded-full"
                          alt="Your Profile Photo"
                        />
                      </div>
                    </Menu.Button>
                  }
                >
                  <UserAction />
                </MenuUI>
              )}
            </div>
          </li>
        </ul>
      </nav>
      <aside
        className={`${
          isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full"
        } transition-transform duration-200 mt-0.5 ease-linear max-lg:bg-slate-50 max-lg:pl-7 max-lg:top-16 max-lg:absolute max-lg:items-start max-lg:z-10 max-lg:min-h-screen max-lg:w-3/4 max-lg:pt-10 lg:hidden`}
      >
        {links.map(({ name, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center text-xl text-indigo-600 font-medium rounded-md border-2 ${
              pathname.includes(href)
                ? "border-indigo-600"
                : "border-transparent"
            } hover:shadow-sm focus:shadow-sm hover:border-indigo-600 w-52 p-2 mb-3`}
            onClick={closeSideBar}
          >
            {icon}
            {name}
          </Link>
        ))}

        <div className="flex-1 flex place-items-end">
          <button
            type="button"
            className="text-xl text-indigo-600 font-medium rounded-md border-2 border-transparent hover:shadow-sm focus:shadow-sm hover:border-indigo-600  w-48 px-4 py-2 mb-3"
            onClick={closeSideBar}
          >
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
