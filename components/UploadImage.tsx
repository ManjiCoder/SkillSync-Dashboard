"use client";

import Image from "next/image";
import React, { useState } from "react";
export default function UploadImage() {
  const [image, setImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "my-uploads");
    data.append("cloud_name", "dnkkgwucg");

    fetch("https://api.cloudinary.com/v1_1/dnkkgwucg/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileImage(data.secure_url);
        console.log(data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="flex justify-between items-center">
        <Image
          className="bg-slate-300 border border-neutral-300 h-28 w-28 shadow-sm rounded-full"
          height={100}
          width={100}
          src={
            profileImage
              ? profileImage
              : "https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg"
          }
          alt=""
        />

        <button
          type="button"
          className="py-1 text-xs px-4 bg-slate-200 rounded-full shadow-sm"
        >
          Upload Photo
        </button>
      </section>
      {/* <form>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button onClick={handleSubmit}>Upload</button>
      </form> */}
    </>
  );
}
