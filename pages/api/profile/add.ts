// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);
  // res.redirect("/connections/manji");
  // console.log(req.headers["x-auth-token"]);
  const id = req.headers["x-user-id"];
  await dbConnect();

  const user: any = await UserModel.findByIdAndUpdate(id, {
    $set: {
      photo: null,
    },
  });
  res.status(200).json({ user });
}
