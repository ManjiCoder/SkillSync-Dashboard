import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    photo: { type: String, default: null, trim: true },
    userName: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    role: {
      type: String,
      enum: ["Admin", "User", "Moderator"],
      default: "User",
    },
    password: { type: String, required: true, trim: true },
    phoneNumber: { type: Number },
    bio: { type: String, trim: true }, // String is shorthand for {type: String}
    skills: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        proficiency: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
          default: "Beginner",
        },
      },
    ],
    certification: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        issuingOrganization: {
          type: String,
          required: true,
          trim: true,
        },
        issueDate: {
          type: Date,
          required: true,
        },
        expirationDate: {
          type: Date,
          default: null, // Set to null if still valid
        },
        credentialID: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
    experience: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        company: {
          type: String,
          required: true,
          trim: true,
        },
        location: {
          type: String,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          default: null, // Set to null if currently working
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
    education: [
      {
        degree: {
          type: String,
          required: true,
          trim: true,
        },
        institution: {
          type: String,
          required: true,
          trim: true,
        },
        location: {
          type: String,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          default: null, // Set to null if currently pursuing
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
