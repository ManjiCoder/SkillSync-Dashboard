// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formFields: any = ["photo", "name"];

  const key = Object.keys(req.query)[0];
  const value = req.query[key];

  const id = req.headers["x-user-id"];
  await dbConnect();

  const user: any = await UserModel.findByIdAndUpdate(id, {
    $set: {
      [key]: value,
    },
  });
  res.status(200).json({ user });
}
