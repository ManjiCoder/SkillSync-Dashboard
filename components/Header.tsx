import Image from "next/image";
import React from "react";

import { FaRegBell } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Navbar from "./Navbar";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store";

export default function Header() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <header className="lg:flex justify-between items-center lg:pl-10 lg:pr-16 w-full lg:h-20">
        {/* For Desktop Screen */}
        <h1 className="max-lg:hidden text-2xl h-14 flex place-items-center font-semibold rounded-md shadow-md border px-8 py-2">
          Dashboard
        </h1>

        {/* For Desktop Screen */}
        <section className="max-lg:hidden flex">
          <button className="mr-5 text-2xl">
            <FaRegBell />
          </button>
          <div className="h-14 flex space-x-3 place-items-center font-medium rounded-md shadow-md border p-3">
            <Image
              className="bg-slate-300 w-9 h-9 shadow-sm rounded-md"
              src={""}
              alt=""
            />

            <div className="flex w-32 flex-col flex-1 font-semibold text-indigo-600">
              <h3 className="text-xs">Welcome back,</h3>
              <h2 className="text-[18px]">Manji Coder</h2>
            </div>
            <button className="w-4 text-xl">
              <MdOutlineKeyboardArrowDown />
            </button>
          </div>
        </section>

        {/* For Moblie Screen */}
        <Navbar />
      </header>
    </PersistGate>
  );
}
