// Using in Both Client & Server For Validation
import {
  bioSchema,
  emailSchema,
  nameSchema,
  phoneNumberSchema,
  photoSchema,
  skillsSchema,
} from "@/lib/Yup";

export const formFields = new Map();
formFields.set("photo", {
  fieldValidation: photoSchema,
  fieldName: "Photo",
  isArray: false,
});
formFields.set("name", {
  fieldValidation: nameSchema,
  fieldName: "Name",
  isArray: false,
});
formFields.set("email", {
  fieldValidation: emailSchema,
  fieldName: "Email",
  isArray: false,
});
formFields.set("phoneNumber", {
  fieldValidation: phoneNumberSchema,
  fieldName: "Phone Number",
  isArray: false,
});
formFields.set("bio", {
  fieldValidation: bioSchema,
  fieldName: "Bio",
  isArray: false,
});
formFields.set("skills", {
  fieldValidation: skillsSchema,
  fieldName: "skills",
  isArray: true,
});
formFields.set("professtionalDetail", {
  fieldValidation: null,
  fieldName: "Professtional Detail",
  isArray: false,
});
formFields.set("certification", {
  fieldValidation: null,
  fieldName: "Certification",
  isArray: true,
});
formFields.set("experience", {
  fieldValidation: null,
  fieldName: "Experience",
  isArray: true,
});
formFields.set("education", {
  fieldValidation: null,
  fieldName: "Education",
  isArray: true,
});
