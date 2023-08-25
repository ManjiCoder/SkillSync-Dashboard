import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { formFields } from "@/utils/form";

// TODO: ADD Validation
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { body } = req;
  const key = Object.keys(body)[0];
  const value = body[key];
  // console.log({ key, value }, body);

  if (method === "POST" && formFields.has(key)) {
    try {
      const id = req.headers["x-user-id"];
      await formFields.get(key).fieldValidation?.validate({ [key]: value });
      await dbConnect();

      let user;

      // For single Field
      if (!formFields.get(key).isArray) {
        user = await UserModel.findByIdAndUpdate(id, {
          $set: {
            [key]: value,
          },
        });
      }

      // For Multiple Fields
      else {
        user = await UserModel.findByIdAndUpdate(id, {
          $addToSet: {
            [key]: { $each: [value] },
          },
        });
      }
      res.status(200).json({
        status: "ok",
        message: `${formFields.get(key).fieldName} updated successfully.`,
        user,
      });
    } catch (error: any) {
      console.log(error);
      if (error.errors) {
        res.status(400).json({
          status: "error",
          message: error.errors.join(" & "),
        });
        return;
      }
      res.status(200).json({
        status: "error",
        message: `${formFields.get(key).fieldName} updated unsuccessfully.`,
      });
    }
  } else {
    res.status(405).json({ message: "Not Allowed!" });
  }
}
