import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { pretifyUserInfo, sign } from "@/utils/server-utils";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { signUpSchema } from "@/lib/Yup";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const body = req.body;
      const { name, email, userName, password } = body;
      if (body === "") {
        res.status(401).json({ status: "error", message: "Not allowed!" });
      }
      // For user-input validation
      await signUpSchema.validate(body, { abortEarly: false });

      await dbConnect();
      const existingUser = await UserModel.findOne({
        $or: [{ userName }, { email }],
      });

      // If user have an account
      if (existingUser) {
        let message = "User with this email already exists!";
        if (existingUser.userName === userName) {
          message = "This username is already taken!";
        }
        if (
          existingUser.userName === userName &&
          existingUser.email === email
        ) {
          message = "User with this email & username already exists!";
        }
        return res.status(400).json({ message });
      }

      // Password hashing
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // Saving into the db
      const newUser = await UserModel.create({
        name,
        userName,
        email,
        password: hashPassword,
      });
      // JWT-Token
      const payload = {
        userId: {
          id: newUser._id,
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

      const userInfo = pretifyUserInfo(newUser);
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
