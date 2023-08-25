import Image from "next/image";
import React from "react";
import { EditButton } from "./FormAction";

const myConnections = [
  {
    name: "Manji Coder",
    role: "Full Stack Developer",
    companyName: "Oruphones",
  },
  {
    name: "Manji Coder",
    role: "Full Stack Developer",
    companyName: "Oruphones",
  },
  {
    name: "Manji Coder",
    role: "Full Stack Developer",
    companyName: "Oruphones",
  },
  {
    name: "Manji Coder",
    role: "Full Stack Developer",
    companyName: "Oruphones",
  },
  {
    name: "Manji Coder",
    role: "Full Stack Developer",
    companyName: "Oruphones",
  },
];
export default function ConnectionsInfo() {
  return (
    <section className="flex flex-col flex-1 border-t-2 pt-5 pb-2.5 bg-slate-100 p-4 min-h-[90vh]">
      <div className="bg-blue-900 rounded-lg shadow-lg min-h-[5rem] lg:min-h-[7rem] w-full lg:w-11/12 p-4 text-white">
        <h2 className="text-xl uppercase font-semibold">My Connections</h2>
      </div>

      <main className="grid border-2 justify-center lg:grid-cols-2 xl:grid-cols-3 px-3 py-8 gap-5">
        {myConnections.map(({ companyName, name, role }, index) => (
          <section
            key={index}
            className="flex gap-3 bg-slate-50 w-full max-lg:max-w-xs xl:max-w-sm items-center justify-between px-5 py-3 rounded-lg shadow-md"
          >
            <div className="flex flex-col">
              <h2 className="font-bold text-[1.2rem] my-2.5">{name}</h2>
              <h2>{role}</h2>
              <h2 className="mb-4">{`@ ${companyName}`}</h2>
              <EditButton />
            </div>
            <Image
              src={""}
              alt=""
              height={100}
              width={100}
              className="h-28 w-28 rounded-full shadow-md bg-slate-200 mb-5 border border-white"
            />
          </section>
        ))}
      </main>
    </section>
  );
}
