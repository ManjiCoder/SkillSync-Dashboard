import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { formFields } from "@/utils/form";
import { pretifyUserInfo } from "@/utils/server-utils";

/*
  @isExists Function is compare the body with obj
*/
const isExists = (arr: [], obj1: any, checkFields: string[]) => {
  for (let index = 0; index < arr.length; index++) {
    const obj = arr[index];
    let obj2: any = {};
    checkFields.forEach((key: string) => {
      obj2[key] = obj[key];
    });
    if (JSON.stringify(obj2) === JSON.stringify(obj1)) return true;
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { body } = req;
  const key = Object.keys(body)[0];
  const value = body[key];

  if (method === "POST" && formFields.has(key)) {
    try {
      const id = req.headers["x-user-id"];
      if (formFields.get(key)?.isArray) {
        await formFields.get(key).fieldValidation?.validate(body[key]);
      } else {
        await formFields.get(key).fieldValidation?.validate({ [key]: value });
      }

      await dbConnect();

      let user;

      // For single Field
      if (!formFields.get(key).isArray) {
        user = await UserModel.findByIdAndUpdate(
          id,
          {
            $set: {
              [key]: value,
            },
          },
          { new: true }
        );
      }

      // For Multiple Fields
      else {
        user = await UserModel.findOne({ _id: id });
        let isAlreadyExists = isExists(
          user[key],
          body[key],
          Object.keys(body[key])
        );
        // console.log(isSkillsExists);
        if (isAlreadyExists) {
          return res.status(400).json({
            status: "error",
            message: `${formFields.get(key).fieldName} already exists.`,
          });
        }
        user = await UserModel.findByIdAndUpdate(
          id,
          {
            $push: {
              [key]: [value],
            },
          },
          { new: true } // This enables showing the updated data
        );
      }
      res.status(200).json({
        status: "ok",
        message: `${formFields.get(key).fieldName} updated successfully.`,
        user: pretifyUserInfo(user),
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
