import { NextResponse } from "next/server";

export async function GET(req){
    try {
        let response = NextResponse.json({success: true, message : "Logout successful!"},{status: 200});
        
        // remove token from browser cookies
       response.cookies.delete('token',{domain: process.env.DOMAIN});
       return response;
    } catch (error) {
        return NextResponse.json({success: false, message: "Logout failed!"},{status:500});
    }
}