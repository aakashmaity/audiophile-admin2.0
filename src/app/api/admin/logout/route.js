import { NextResponse } from "next/server";

export async function POST(req){
    try {
        let response = NextResponse.json({success: true, message : "Logout successful!"},{status: 200});
        
        // remove token from browser cookies
        response.cookies.set("token", "",{
            expiresIn: new Date(0)
        })
        return response;
    } catch (error) {
        return NextResponse.json({success: false, message: "Logout failed!"},{status:500});
    }
}