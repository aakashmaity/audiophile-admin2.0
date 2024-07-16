import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const response = NextResponse.json({success: true, message : "Logout successful!"},{status: 200});
        
        // remove token from browser cookies
        response.cookies.set("token","",{expires: new Date(Date.now())});
        return response;
    } catch (error) {
        return NextResponse.json({success: false, message: error.message},{status:500});
    }
}