import { NextRequest, NextResponse } from "next/server";
import { verify } from "./utils/server-utils";

export async function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;
  console.log(req.headers.get("x-auth-token"));
  // console.log(req.headers.get("auth-token"));
  try {
    const token = req.headers.get("x-auth-token");
    const payload: any = await verify(token, process.env.JWT_PRIVATE_KEY);
    const { id } = payload.userId;
    console.log(id);
    const response = NextResponse.next();
    response.headers.set("x-user-id", id);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }
}

// "Matching Paths"
export const config = {
  matcher: [
    "/api/profile/get",
    "/api/profile/add",
    "/api/connections/getall",
    "/api/connections/add",
    "/api/connections/update",
    "/api/connections/remove",
  ],
};
