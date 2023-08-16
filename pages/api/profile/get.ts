// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { pretifyUserInfo } from "@/utils/server-utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.redirect("/connections/manji");
  // console.log(req.headers["x-auth-token"]);
  const id = req.headers["x-user-id"];
  await dbConnect();

  const user = await UserModel.findById(id);
  res.status(200).json({ user: pretifyUserInfo(user) });
}
