import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
    const currentUser = await getToken({ req, secret: process.env.AUTH_SECRET })
    if (req.nextUrl.pathname.startsWith("/admin") && !currentUser?.isAdmin) {
        return NextResponse.redirect(new URL("/unauthorized?message=Permission denied", req.nextUrl))
    }
    NextResponse.next()
    // if(currentUser && currentUser)
}