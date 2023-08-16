import React, { useState } from "react";
import ModalUI from "./headlessUI/ModalUI";
import ErrorMessage from "./ErrorMessage";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { editName } from "@/redux-slices/User";

const EditNameSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Your should be atleast 3 characters")
    .max(100, "Enter your nickname"),
});
export function EditButton({ updateField }: any) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="py-1 text-xs font-medium px-4 rounded-full shadow-sm bg-purple-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal && (
        <ModalUI
          isOpen={showModal}
          closeModal={closeModal}
          title={`Edit ${updateField}`}
        >
          <From updateField={updateField} closeModal={closeModal} />
        </ModalUI>
      )}
    </>
  );
}
export function AddButton() {
  return (
    <button
      className="py-1 text-xs font-medium px-4 rounded-full shadow-sm bg-purple-200"
      type="button"
    >
      Add
    </button>
  );
}

export function From({ updateField, closeModal }: any) {
  const { toastDuration } = useSelector((state: any) => state.static);
  const dispatch = useDispatch();

  const uploadPhotoDB = async (updateFieldValue: string) => {
    const toastId = toast.loading("Please wait...");
    dispatch(editName(updateFieldValue));
    // API Call
    let headersList: any = {
      "x-auth-token": Cookies.get("token"),
    };

    let response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/profile/add?${updateField.toLowerCase()}=${updateFieldValue}`,
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
    console.log({ data });
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Formik
        initialValues={{ name: "" }}
        validationSchema={EditNameSchema}
        onSubmit={(values) => {
          console.log(values.name);
          uploadPhotoDB(values.name);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          isValid,
          /* and other goodies */
        }) => (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {updateField}
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name="name"
                  type="text"
                  autoComplete="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </div>
              <ErrorMessage error={errors.name} />
            </div>

            <div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  disabled={!isValid}
                  className="inline-flex w-full justify-center rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 sm:ml-3 sm:w-auto"
                  onClick={closeModal}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
