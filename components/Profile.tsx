import React from "react";
import EditButton from "./EditButton";
import { AiFillStar } from "react-icons/ai";
import UploadImage from "./UploadImage";

const basicUserInfo = [
  { key: "Your Name", value: "Manji Coder" },
  { key: "Email", value: "Manji@gmail.com" },
  { key: "Phone Number", value: "+91 7000900081" },
];

const userSkills = [
  "Next.Js",
  "React.Js",
  "Node.Js",
  "Express.Js",
  "React Native",
];

const Certifications = [{ course: "Python", from: "Coding Ninjas" }];

const experiences = [
  {
    companyName: "Oruphones",
    role: "Full Stack Developer",
    time: "Full-time",
    from: "2014",
    to: "2024",
  },
  {
    companyName: "Sahu Technologies",
    role: "Mern Developer",
    time: "Full-time",
    from: "2014",
    to: "2024",
  },
];

const education = [
  {
    universityName: "IIT Bombay",
    course: "B.Tech",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, dicta aliquid? Incidunt eum, praesentium similique.",
    from: "2014",
    to: "2024",
  },
];
export default function ProfileInfo() {
  return (
    <section className="flex flex-col items-center flex-1 border-t-2 pt-5 pb-2.5 bg-slate-100">
      <div className="bg-blue-900 rounded-lg shadow-lg min-h-[12rem] w-11/12 p-4 text-white">
        <h2 className="text-xl uppercase font-semibold">My Profile</h2>
      </div>

      <main className="flex justify-center w-11/12">
        <div className="lg:bg-white justify-self-center -translate-y-20 lg:rounded-lg lg:shadow-lg min-h-[24rem] w-[86%] lg:w-5/6">
          <div className="grid lg:grid-cols-2 lg:px-7 lg:py-9 lg:gap-x-16 max-lg:gap-3">
            {/* Profile Left Section */}
            <div className="max-lg:bg-white max-lg:p-3.5 max-lg:shadow-md max-lg:rounded-lg flex flex-col gap-y-8">
              {/* Profile Image */}
              <UploadImage />

              {/* Basic Info */}
              <section className="border p-4 max-lg:-mt-4 flex flex-col gap-y-6 rounded-md shadow-md">
                {basicUserInfo.map(({ key, value }) => (
                  <div className="flex justify-between items-center" key={key}>
                    <div className="flex flex-col gap-y-3">
                      <h1>{key}</h1>
                      <h1 className="font-semibold">{value}</h1>
                    </div>
                    <EditButton />
                  </div>
                ))}
              </section>

              {/* About User */}
              <section className="border p-4 flex flex-col gap-y-6 rounded-md shadow-md">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-medium">
                    About <span className="text-indigo-600">Manji</span>
                  </h1>
                  <EditButton />
                </div>
                <p className="font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi aut debitis ipsum!
                </p>
              </section>

              {/* Skills Info */}
              <section className="border p-4 flex flex-col gap-y-3 rounded-md shadow-md">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-medium">Skill</h1>
                  <EditButton />
                </div>
                {userSkills.map((skill) => (
                  <p key={skill}>{skill}</p>
                ))}
              </section>
            </div>
            {/* Profile Right Section */}
            <div className="max-lg:bg-white max-lg:p-3.5 max-lg:shadow-md max-lg:rounded-lg flex flex-col gap-y-8">
              {/* Professional Info */}
              <section className="border p-4 flex items-center gap-y-6 rounded-md shadow-md">
                <div className="flex flex-col gap-y-3">
                  <h1 className="text-xl font-bold">Professional Details</h1>
                  <p className="font-semibold">
                    This are the professtional details shown to users in tht app
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <AiFillStar className="text-5xl text-cyan-400 rotate-6" />
                  <AiFillStar className="text-3xl  text-blue-800 -translate-y-10" />
                </div>
                {/* <div className="flex items-center flex-col">
                  <AiFillStar className="text-5xl text-cyan-400 rotate-12" />
                  <AiFillStar className="text-4xl  text-blue-800 -translate-y-8 translate-x-2.5 -rotate-12" />
                </div> */}
              </section>

              {/* Certifications */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Certifications</h1>
                <EditButton />
              </div>
              {/* Certifications */}
              {Certifications.map(({ course, from }) => (
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
                </section>
              ))}

              {/* Experience */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Experience</h1>
                <EditButton />
              </div>

              {/* Certifications */}
              {experiences.map(
                ({ companyName, role, time, from, to }, index) => (
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
                  </section>
                )
              )}

              {/* Education */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Education</h1>
                <EditButton />
              </div>

              {/* Education */}
              {education.map(
                ({ universityName, course, bio, from, to }, index) => (
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
                  </section>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
