import React, { useEffect } from "react";
import { AddButton, EditButton } from "./FormAction";
import { AiFillStar } from "react-icons/ai";
import UploadImage from "./UploadImage";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store";
import { useSelector } from "react-redux";

export default function ProfileInfo() {
  const { user } = useSelector((state: any) => state.user);

  const basicUserInfo = [
    { name: "Name", key: "name", value: user?.name },
    { name: "Email", key: "email", value: user?.email },
    { name: "Phone Number", key: "phoneNumber", value: user?.phoneNumber },
  ];

  return (
    <PersistGate loading={null} persistor={persistor}>
      <section className="flex flex-col items-center flex-1 border-t-2 pt-5 pb-2.5 bg-slate-100">
        <div className="bg-blue-900 rounded-lg shadow-lg min-h-[12rem] w-11/12 p-4 text-white">
          <h2 className="text-xl uppercase font-semibold">My Profile</h2>
        </div>

        <main className="flex justify-center w-11/12">
          <div className="lg:bg-white justify-self-center -translate-y-20 lg:rounded-lg lg:shadow-lg min-h-[24rem] w-[86%] lg:w-5/6">
            <div className="grid lg:grid-cols-2 lg:px-7 lg:py-9 lg:gap-x-16 max-lg:gap-3">
              {/* Profile Left Section */}
              <div className="max-lg:bg-white max-lg:p-3.5 max-lg:shadow-md max-lg:rounded-lg flex flex-col gap-y-8">
                <UploadImage />

                {/* Basic Info */}
                <section className="border p-4 max-lg:-mt-4 flex flex-col gap-y-6 rounded-md shadow-md">
                  {basicUserInfo.map(({ name, key, value }) => (
                    <div
                      className="flex justify-between items-center"
                      key={key}
                    >
                      <div className="flex flex-col gap-y-3">
                        <h1>{name}</h1>
                        <h1 className="font-semibold">{value}</h1>
                      </div>
                      {value ? (
                        <EditButton fieldKey={key} />
                      ) : (
                        <AddButton fieldKey={key} />
                      )}
                    </div>
                  ))}
                </section>

                {/* About User */}
                <section className="border p-4 flex flex-col gap-y-6 rounded-md shadow-md">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium">
                      About{" "}
                      <span className="text-indigo-600">{user?.name}</span>
                    </h1>
                    {user.bio ? (
                      <EditButton fieldKey="bio" />
                    ) : (
                      <AddButton fieldKey="bio" />
                    )}
                  </div>
                  <p className="font-semibold">{user?.bio}</p>
                </section>

                {/* Skills Info */}
                <section className="border p-4 flex flex-col gap-y-3 rounded-md shadow-md">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium">Skill</h1>
                    <AddButton fieldKey="skills" />
                  </div>
                  {user?.skills?.map((skill: string) => (
                    <div key={skill}>
                      <p>{skill}</p>
                      {user.skill.length !== 0 ? (
                        <EditButton fieldKey="skills" />
                      ) : (
                        <AddButton fieldKey="skills" />
                      )}
                    </div>
                  ))}
                </section>
              </div>
              {/* Profile Right Section */}
              <div className="max-lg:bg-white max-lg:p-3.5 max-lg:shadow-md max-lg:rounded-lg flex flex-col gap-y-8">
                {/* Professional Info */}
                <section className="border p-4 flex items-center gap-y-6 rounded-md shadow-md">
                  <div className="flex flex-1 flex-col gap-y-3">
                    <h1 className="text-xl font-bold">Professional Details</h1>
                    <p className="font-semibold">{user?.professionalDetails}</p>
                  </div>
                  <div className="flex items-center flex-col">
                    <AiFillStar className="text-5xl text-cyan-400 rotate-6" />
                    <AiFillStar className="text-3xl  text-blue-800 -translate-y-10" />
                  </div>
                  {user?.professionalDetails ? (
                    <EditButton fieldKey="professionalDetails" />
                  ) : (
                    <AddButton fieldKey="professionalDetails" />
                  )}

                  {/* <div className="flex items-center flex-col">
                  <AiFillStar className="text-5xl text-cyan-400 rotate-12" />
                  <AiFillStar className="text-4xl  text-blue-800 -translate-y-8 translate-x-2.5 -rotate-12" />
                </div> */}
                </section>

                {/* Certifications */}
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold">Certifications</h1>
                  <AddButton fieldKey="certifications" />
                </div>
                {/* Certifications */}
                {user?.certifications?.map(({ course, from }: any) => (
                  <section
                    key={course}
                    className="border-2 p-4 flex flex-col -mt-4 gap-y-3 rounded-full shadow-md"
                  >
                    <div className="flex items-center">
                      {/* Icon */}
                      <span className="text-2xl text-white bg-[gold] rounded-full shadow-sm p-1.5">
                        <AiFillStar />
                      </span>
                      <div className="flex flex-col flex-1 text-center">
                        <h3>{course}</h3>
                        <h3>{from}</h3>
                      </div>
                    </div>
                    {user?.course ? (
                      <EditButton fieldKey="course" />
                    ) : (
                      <AddButton fieldKey="course" />
                    )}
                  </section>
                ))}

                {/* Experience */}
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold">Experience</h1>
                  <AddButton fieldKey="experience" />
                </div>

                {/* Experience */}
                {user?.experience?.map(
                  (
                    { companyName, role, time, from, to }: any,
                    index: number
                  ) => (
                    <section
                      key={index}
                      className="border-2 p-4 flex flex-col -mt-4 gap-y-3 rounded-md shadow-md"
                    >
                      <div className="flex font-bold justify-between">
                        <h3>
                          {from}-{to}
                        </h3>
                        <h3>
                          {"  "}
                          {time}
                        </h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>{companyName}</h3>
                        <h3>--{role}</h3>
                      </div>
                      {user?.companyName ? (
                        <EditButton fieldKey="experience" />
                      ) : (
                        <AddButton fieldKey="experience" />
                      )}
                    </section>
                  )
                )}

                {/* Education */}
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold">Education</h1>
                  <AddButton fieldKey="education" />
                </div>

                {/* Education */}
                {user?.education?.map(
                  (
                    { universityName, course, bio, from, to }: any,
                    index: number
                  ) => (
                    <section
                      key={index}
                      className="border-2 p-4 flex flex-col -mt-4 gap-y-3 rounded-md shadow-md"
                    >
                      <h3 className="text-xl text-indigo-600 font-semibold">
                        {universityName}
                      </h3>

                      <div className="flex justify-between">
                        <h3>{`[${from} - ${to}]`}</h3>
                        <h3 className="font-bold">{course}</h3>
                      </div>
                      <p>{bio}</p>
                      {user?.course ? (
                        <EditButton fieldKey="education" />
                      ) : (
                        <AddButton fieldKey="education" />
                      )}
                    </section>
                  )
                )}
              </div>
            </div>
          </div>
        </main>
      </section>
    </PersistGate>
  );
}
