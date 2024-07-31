import { NextResponse } from "next/server";

export async function GET(req){
    try {
        let response = NextResponse.json({success: true, message : "Logout successful!"},{status: 200});
        
        // remove token from browser cookies
        response.cookies.set("token", "")
        // if(success){
        //     return response;
        // }else{
        //     // console.log(response.cookies.get('token'));
        //     throw new Error("failed to delete cookies");
        // }
        return response;
    } catch (error) {
        return NextResponse.json({success: false, message: "Logout failed!"},{status:500});
    }
}