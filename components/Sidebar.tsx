"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export const links = [
  {
    name: "My Profile",
    href: "/profile/manji",
    icon: <MdOutlineKeyboardArrowRight />,
  },
  {
    name: "My Connections",
    href: "/connections/manji",
    icon: <MdOutlineKeyboardArrowRight />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-60 my-3 flex-col items-center">
      {links.map(({ name, href, icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center text-xl text-indigo-600 font-medium rounded-md border-2 ${
            pathname.includes(href) ? "border-indigo-600" : "border-transparent"
          } hover:shadow-sm focus:shadow-sm hover:border-indigo-600 w-52 p-2 mb-3`}
        >
          {icon}
          {name}
        </Link>
      ))}

      <div className="flex-1 flex place-items-end">
        <button
          type="button"
          className="text-xl text-indigo-600 font-medium rounded-md border-2 border-transparent hover:shadow-sm focus:shadow-sm hover:border-indigo-600  w-48 px-4 py-2 mb-3"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
