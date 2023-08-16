import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { uploadPhoto } from "@/redux-slices/User";
import ModalUI from "./headlessUI/ModalUI";

export default function UploadImage() {
  const { isAuth, user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  console.log({ isAuth, user });

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
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
        dispatch(uploadPhoto(data.secure_url));
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
            user?.photo ||
            "https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg"
          }
          alt=""
        />

        <button
          type="button"
          className="py-1 text-xs px-4 bg-slate-200 rounded-full shadow-sm"
          onClick={() => setShowModal(true)}
        >
          Upload Photo
        </button>
      </section>
      {showModal && (
        <ModalUI
          isOpen={showModal}
          closeModal={closeModal}
          title={"Upload Photo"}
        >
          <form className="max-w-md py-4">
            <input
              type="file"
              onChange={(e: any) => {
                setImage(e.target.files[0]);
              }}
            />
            <button onClick={handleSubmit}>Upload</button>
          </form>
        </ModalUI>
      )}
    </>
  );
}
