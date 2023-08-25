import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { updateField } from "@/redux-slices/User";
import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import { formFields } from "@/utils/form";

type FormProp = {
  fieldName: string;
  fieldKey: string;
  closeModal: any;
};
export default function FormHelper({
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

  // const initialValues = { [fieldKey]: user[fieldKey] };
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Formik
        initialValues={{ [fieldKey]: user[fieldKey] }}
        validationSchema={formFields?.get(fieldKey).fieldValidation}
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
