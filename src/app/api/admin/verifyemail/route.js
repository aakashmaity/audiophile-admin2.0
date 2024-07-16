import { mongooseConnect } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await mongooseConnect();
        const reqBody = await req.json();
        console.log("reqBody: " + reqBody)
        const { token } = reqBody;
        console.log("token: " + token);

        const admin = await Admin.findOne({verifyToken : token.toString(), verifyExpires : {$gt : Date.now()}});

        if(!admin){
            return NextResponse.json({success: false, message : "Invalid token!"},{status: 400});
        }
        console.log(admin);

        admin.isVerified = true;
        admin.verifyToken = undefined;
        admin.verifyTokenExpires = undefined;
        await admin.save();

        return NextResponse.json({success: true, message : "Email verified successfully!"},{status: 200});

    } catch (error) {
        console.log("Failed to verify! : ",error);
        return NextResponse.json({success: false, message : "Failed to verify!"},{status : 500});
    }
}