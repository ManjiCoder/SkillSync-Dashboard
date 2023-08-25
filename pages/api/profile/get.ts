import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { pretifyUserInfo } from "@/utils/server-utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    const id = req.headers["x-user-id"];
    await dbConnect();

    const user = await UserModel.findById(id);
    res.status(200).json({ status: "ok", user: pretifyUserInfo(user) });
  } else {
    res.status(405).json({ message: "Not Allowed!" });
  }
}
