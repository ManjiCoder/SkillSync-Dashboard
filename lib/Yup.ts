import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required")
    .trim(),
  // userName: Yup.string()
  // .required("UserName is required")
  // .max(100, "Enter your nickname"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,20}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required")
    .trim(),
  userName: Yup.string()
    .required("UserName is required")
    .trim()
    .max(100, "Enter your nickname"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,20}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "Passwords must match")
  //   .required("Confirm Password is required"),
});

export const nameSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
});

export const photoSchema = Yup.object().shape({
  photo: Yup.string().trim().default(null).nullable().url("Invalid URL format"),
});

export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required")
    .trim(),
});

export const phoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .trim()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be a 10-digit number"),
});

export const bioSchema = Yup.object().shape({
  bio: Yup.string()
    .trim()
    .required("Bio is required")
    .min(20, "Bio must be at least 20 characters")
    .max(500, "Bio must be at most 500 characters"),
});

export const skillsSchema = Yup.object().shape({
  name: Yup.string().required("Skill name is required").trim(),
  proficiency: Yup.string()
    .oneOf(["Beginner", "Intermediate", "Advanced", "Expert"])
    .default("Beginner"),
});

export const certificationSchema = Yup.object().shape({
  title: Yup.string().required("Certification title is required").trim(),
  issuingOrganization: Yup.string()
    .required("Issuing organization is required")
    .trim(),
  issueDate: Yup.date().required("Issue date is required"),
  expirationDate: Yup.date().nullable(),
  credentialID: Yup.string().trim(),
  description: Yup.string().trim(),
});

export const experienceSchema = Yup.object().shape({
  title: Yup.string().required("Experience title is required").trim(),
  company: Yup.string().required("Company name is required").trim(),
  location: Yup.string().trim().nullable(),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().nullable(),
  description: Yup.string().trim().nullable(),
});

export const educationSchema = Yup.object().shape({
  degree: Yup.string().required("Degree name is required").trim(),
  institution: Yup.string().required("Institution name is required").trim(),
  location: Yup.string().trim(),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().nullable(),
  description: Yup.string().trim(),
});
