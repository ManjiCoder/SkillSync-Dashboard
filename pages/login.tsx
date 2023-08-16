import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { loginSchema } from "@/lib/Yup";
import HeaderSEO from "@/components/HeaderSEO";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "@/redux-slices/User";
import ErrorMessage from "@/components/ErrorMessage";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BrandImage from "@/components/BrandImage";

export default function Login() {
  const { toastDuration } = useSelector((state: any) => state.static);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const togglePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (email: string, password: string) => {
    const toastId = toast.loading("Please wait...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        dispatch(logIn(data.user));
        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: toastDuration,
          closeButton: true,
          closeOnClick: true,
        });
        router.replace("/");
        return;
      }
      // console.log(data.message);
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
      console.log({ error });
    }
  };
  return (
    <>
      <HeaderSEO description={null} title="Login | SkillSync Dashboard" />
      <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <BrandImage />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              handleLogin(values.email, values.password);
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
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  <ErrorMessage error={errors.email} />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <input
                        id="password"
                        name="password"
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      ></input>
                      <button
                        name="showPassword"
                        type="button"
                        onClick={togglePasswordVisiblity}
                      >
                        {!showPassword ? (
                          <FaEyeSlash className="absolute -translate-y-2 -translate-x-7" />
                        ) : (
                          <FaEye className="absolute -translate-y-2 -translate-x-7" />
                        )}
                      </button>
                    </div>
                  </div>
                  <ErrorMessage error={errors.password} />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`flex mt-8 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                      isValid && "brightness-90"
                    }`}
                  >
                    Login
                  </button>
                </div>
              </form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not have an account?
            <Link
              href="/sign-up"
              className="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create it for free
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
