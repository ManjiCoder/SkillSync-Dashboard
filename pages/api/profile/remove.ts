import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { pretifyUserInfo } from "@/utils/server-utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const key = Object.keys(req.query)[0];
  const value = req.query[key];
  console.log(key, value);
  if (method === "PATCH") {
    try {
      const id = req.headers["x-user-id"];
      await dbConnect();

      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find the index of the key in object with the given ID
      const removeIndex = user[key].findIndex(
        (obj: any) => obj._id.toString() === value
      );

      if (removeIndex === -1) {
        return res.status(404).json({ message: `${key} not found` });
      }

      // Remove the skill object from the array
      user[key].splice(removeIndex, 1);
      await user.save();

      console.log(removeIndex);
      res.status(200).json({
        status: "ok",
        message: `${key} deleted successfully`,
        user: user[key],
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        status: "error",
        message: `${key} deleted successfully`,
      });
    }
  } else {
    res.status(405).json({ message: "Not Allowed!" });
  }
}
