import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const response = NextResponse.json({success: true, message : "Logout successful!"},{status: 200});
        
        // remove token from browser cookies
        response.cookies.delete('token');
        return response;
    } catch (error) {
        return NextResponse.json({success: false, message: "Logout failed!"},{status:500});
    }
}