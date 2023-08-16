import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    photo: { type: String, default: null },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    bio: String, // String is shorthand for {type: String}
    skills: [String],

    professtionalDetail: String,
    certification: [
      {
        courseName: String,
        by: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        duration: {
          from: { type: Date },
          to: { type: Date },
        },
        description: String,
      },
    ],
    education: [
      {
        university: String,
        courseName: String,
        duration: {
          from: { type: Date },
          to: { type: Date },
        },
        description: String,
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
