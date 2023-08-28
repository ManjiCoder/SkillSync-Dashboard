import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { deleteField, updateField } from "@/redux-slices/User";
import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import { formFields } from "@/utils/form";
import { skillsSchema } from "@/lib/Yup";

type FormProp = {
  fieldName: string;
  fieldKey: string;
  closeModal: any;
};

type DeleteModalContentProps = {
  deleteElement: {
    name: string | null;
    fieldName: string;
    id: string;
  };
  closeModal: any;
};
export function EditSimpleFormField({
  fieldName,
  fieldKey,
  closeModal,
}: FormProp) {
  const { toastDuration } = useSelector((state: any) => state.static);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const updateDB = async (updateValue: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const headersList: any = {
        "x-auth-token": Cookies.get("token"),
        "Content-Type": "application/json", // This is also IMP without this api call fails
      };
      const bodyContent = JSON.stringify({
        [fieldKey]: updateValue,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/update`,
        {
          method: "POST",
          headers: headersList,
          body: bodyContent,
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(updateField({ [fieldKey]: updateValue }));
        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: toastDuration,
          closeButton: true,
          closeOnClick: true,
        });
        return;
      }
      toast.update(toastId, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: toastDuration,
        closeButton: true,
        closeOnClick: true,
      });
    } catch (error: any) {
      toast.update(toastId, {
        render: error.message || "Internal server error",
        type: "error",
        closeButton: true,
        closeOnClick: true,
      });
      console.error(error);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Formik
        initialValues={{ [fieldKey]: user[fieldKey] }}
        validationSchema={formFields?.get(fieldKey)?.fieldValidation}
        onSubmit={(values) => {
          updateDB(values[fieldKey]);
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
          <form className="space-y-6">
            <div>
              <label
                htmlFor={fieldKey}
                className="block capitalize text-sm font-medium leading-6 text-gray-900"
              >
                {fieldName}
              </label>
              <div className="mt-2">
                <input
                  id={fieldKey}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name={fieldKey}
                  type={fieldKey === "phoneNumber" ? "number" : "text"}
                  autoComplete={fieldKey}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[fieldKey]}
                />
              </div>
              <ErrorMessage error={errors[fieldKey]} />
            </div>

            <div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="inline-flex w-full justify-center rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    closeModal();
                    handleSubmit();
                  }}
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

interface Skill {
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

const initialValues: Skill = {
  name: "",
  proficiency: "Beginner",
};
export function AddComplexFormField({
  fieldName,
  fieldKey,
  closeModal,
}: FormProp) {
  const { toastDuration } = useSelector((state: any) => state.static);
  const dispatch = useDispatch();

  const updateDB = async (updateName: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const headersList: any = {
        "x-auth-token": Cookies.get("token"),
        "Content-Type": "application/json", // This is also IMP without this api call fails
      };
      const bodyContent = JSON.stringify({
        [fieldKey]: { name: updateName },
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/update`,
        {
          method: "POST",
          headers: headersList,
          body: bodyContent,
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(updateField({ [fieldKey]: data.user[fieldKey] }));
        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: toastDuration,
          closeButton: true,
          closeOnClick: true,
        });
        return;
      }
      toast.update(toastId, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: toastDuration,
        closeButton: true,
        closeOnClick: true,
      });
    } catch (error: any) {
      toast.update(toastId, {
        render: error.message || "Internal server error",
        type: "error",
        closeButton: true,
        closeOnClick: true,
      });
      console.error(error);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Formik
        initialValues={initialValues}
        validationSchema={skillsSchema}
        onSubmit={(values) => {
          updateDB(values.name);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          isValid,
        }) => (
          <form className="space-y-6">
            <div>
              <label
                htmlFor={"name"}
                className="block capitalize text-sm font-medium leading-6 text-gray-900"
              >
                {fieldName}
              </label>
              <div className="mt-2">
                <input
                  id={"name"}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name={"name"}
                  type="text"
                  autoComplete={"name"}
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
                  type="submit"
                  disabled={!isValid}
                  className="inline-flex w-full justify-center rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    closeModal();
                    handleSubmit();
                  }}
                >
                  Add
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

export function DeleteModalContent({
  deleteElement,
  closeModal,
}: DeleteModalContentProps) {
  const { fieldName, name, id } = deleteElement;
  const { toastDuration } = useSelector((state: any) => state.static);
  const dispatch = useDispatch();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const headersList: any = {
        "x-auth-token": Cookies.get("token"),
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/remove?${fieldName}=${id}`,
        {
          method: "PATCH",
          headers: headersList,
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(deleteField({ [fieldName]: id }));
        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: toastDuration,
          closeButton: true,
          closeOnClick: true,
        });
        return;
      }
      toast.update(toastId, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: toastDuration,
        closeButton: true,
        closeOnClick: true,
      });
    } catch (error: any) {
      toast.update(toastId, {
        render: error.message || "Internal server error",
        type: "error",
        closeButton: true,
        closeOnClick: true,
      });
      console.error(error);
    }
  };

  return (
    <>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Are you sure you want to delete your {name} Skill? All of your data
          will be permanently removed. This action cannot be undone.
        </p>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => {
            handleDelete(id);
            closeModal();
          }}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
