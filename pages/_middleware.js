import { getToken } from "next-auth/jwt";
import {  NextResponse } from "next/server";
import absoluteUrl from "next-absolute-url";

export async function middleware(req) {

  const { origin } = absoluteUrl(req)

  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  // const url = req.nextUrl.clone()
  // url.pathname = '/dest'
  const { pathname } = req.nextUrl;

  if (pathname?.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(origin+"/login");
  }
}
