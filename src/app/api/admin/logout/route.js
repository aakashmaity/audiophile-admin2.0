import { NextResponse } from "next/server";

export async function GET(req){
    try {
        let response = NextResponse.json({success: true, message : "Logout successful!"},{status: 200});
        
        // remove token from browser cookies
        let success = response.cookies.set('token',"");
        return success;
    } catch (error) {
        return NextResponse.json({success: false, message: "Logout failed!"},{status:500});
    }
}