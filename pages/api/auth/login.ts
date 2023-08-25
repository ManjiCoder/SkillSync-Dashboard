import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { pretifyUserInfo, sign } from "@/utils/server-utils";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { loginSchema } from "@/lib/Yup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const body = req.body;
      const { email, userName, password } = body;

      if (body === "") {
        res.status(401).json({ status: "error", message: "Not allowed!" });
      }

      // For user-input validation
      await loginSchema.validate(body, { abortEarly: false });

      await dbConnect();
      const user = await UserModel.findOne({ $or: [{ userName }, { email }] });

      // If user don't have an account
      if (!user) {
        let message = "Cannot find user with this email!";
        if (user?.userName !== userName) {
          message = "Cannot find user with this username";
        }
        return res.status(400).json({ message });
      }

      // Comparing Password
      const comparePassword = await bcrypt.compare(password, user.password);

      // If Password is incorrect
      if (!comparePassword) {
        res.status(404).json({ message: "Incorrect password" });
        return;
      }

      // JWT-Token
      const payload = {
        userId: {
          id: user._id,
        },
      };
      // Signing JWT
      const iat = Math.floor(Date.now() / 1000);
      const exp = iat + 60 * 60 * 24 * 7; // one week
      const authToken = await sign(
        payload,
        process.env.JWT_PRIVATE_KEY,
        iat,
        exp
      );

      // Setting Cookie
      const cookie = serialize("token", authToken, {
        secure: true,
        expires: new Date(exp * 1000),
        path: "/",
      });
      res.setHeader("Set-Cookie", cookie);

      const loginUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $set: { updatedAt: new Date() } },
        { new: true }
      );
      const userInfo = pretifyUserInfo(loginUser);
      res.status(200).json({
        status: "ok",
        message: "Login Sucessfully",
        user: userInfo,
        authToken,
      });
    } catch (error: any) {
      console.log(error.errors);
      if (Array.isArray(error.errors)) {
        let n: number = error.errors.length;
        let lastItem = "";
        if (n > 1) {
          lastItem = " & " + error.errors.pop().trim();
        }
        res.status(400).json({
          status: "error",
          message: `${error.errors?.join(", ")} ${lastItem}`,
        });
        return;
      }

      res.status(400).json({
        status: "error",
        message: error.message || "Some error occured try later!",
      });
    }
  }
  // For Invalid Method
  else {
    res.status(401).json({ message: "Not allowed!" });
  }
}
