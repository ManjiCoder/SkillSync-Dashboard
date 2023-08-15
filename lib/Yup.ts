import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("*required").email("Enter valid email"),
  password: Yup.string()
    .required("*required")
    .min(5, "Should be min of 5 characters")
    .max(30, "Should be max of 30 characters"),
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(100, "Enter your nickname"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password should be atleast 5 characters")
    .max(30, "Password should be maximum 30 characters"),
  // phone: Yup.number().required("Phone Number is required"),
});
