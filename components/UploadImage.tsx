import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import ModalUI from "./headlessUI/ModalUI";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { updateField } from "@/redux-slices/User";

export default function UploadImage() {
  const { user } = useSelector((state: any) => state.user);

  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, user]);

  return (
    <>
      <section className="flex justify-between items-center">
        <Image
          className="bg-slate-300 border border-neutral-300 h-28 w-28 shadow-sm rounded-full"
          height={100}
          width={100}
          src={
            user && user.photo
              ? user.photo
              : "https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg"
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
          <UploadImageModal
            closeModal={closeModal}
            image={image}
            setImage={setImage}
          />
        </ModalUI>
      )}
    </>
  );
}

export function UploadImageModal({ closeModal, image, setImage }: any) {
  const { toastDuration } = useSelector((state: any) => state.static);
  const dispatch = useDispatch();

  const uploadPhotoDB = async (imageUrl: string, toastId: any) => {
    // API Call
    let headersList: any = {
      "x-auth-token": Cookies.get("token"),
    };

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/add?photo=${imageUrl}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    toast.update(toastId, {
      render: data.message || "done",
      type: "success",
      isLoading: false,
      autoClose: toastDuration,
      closeButton: true,
      closeOnClick: true,
    });
    console.log(data);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "my-uploads");
    data.append("cloud_name", "dnkkgwucg");
    const toastId = toast.loading("Please wait...");

    fetch("https://api.cloudinary.com/v1_1/dnkkgwucg/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.secure_url);
        dispatch(updateField({ photo: data.secure_url }));
        uploadPhotoDB(data.secure_url, toastId);
        closeModal();
      })
      .catch((error) => {
        toast.update(toastId, {
          render: error.message || "Internal server error",
          type: "error",
          closeButton: true,
          closeOnClick: true,
        });
        console.log(error);
      });
  };
  return (
    <form>
      <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
        <input
          type="file"
          className="cursor-pointer"
          onChange={(e: any) => {
            setImage(e.target.files[0]);
          }}
        />
      </div>
      <div className="bg-gray-50 px-4 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 sm:ml-3 sm:w-auto"
          onClick={handleSubmit}
        >
          Upload
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
