import { NextResponse } from "next/server"

export function middleware(req){
    const pathname = req.nextUrl.pathname;
    const publicUrls = ['/', '/signup'];

    const isPublic = publicUrls.includes(pathname);
    const token = req.cookies.get("token")?.value || "";

    if(isPublic && token){
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    }
    if(!isPublic && !token){
        return NextResponse.redirect(new URL("/", req.nextUrl))
    }
}

export const config = {
    matcher : ["/","/signup","/profile","/dashboard"]
}