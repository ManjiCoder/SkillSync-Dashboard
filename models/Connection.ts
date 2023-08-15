import mongoose, { Schema, Types } from "mongoose";

const connectionSchema = new Schema(
  {
    user: { type: Types.ObjectId },
  },
  { timestamps: true }
);

const ConnectionModel =
  mongoose.models.Solution || mongoose.model("Connection", connectionSchema);

export default ConnectionModel;
