import { mongooseConnect } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

export async function POST(req){
    try {
        await mongooseConnect();
        const reqBody = await req.json();
        const { token, emailType, password } = reqBody;
        

        if(emailType === "verify"){
            const admin = await Admin.findOne({verifyToken : token.toString(), verifyExpires : {$gt : Date.now()}});

            if(!admin){
                return NextResponse.json({success: false, message : "Invalid token!"},{status: 400});
            }
            

            admin.isVerified = true;
            admin.verifyToken = undefined;
            admin.verifyTokenExpires = undefined;
            await admin.save();

            return NextResponse.json({success: true, message : "Email verified successfully!"},{status: 200});
        } else {
            const admin = await Admin.findOne({forgotPasswordToken: token.toString(), forgotPasswordExpires : {$gt : Date.now()}});

            if(!admin){
                return NextResponse.json({success: false, message : "Invalid token!"},{status: 400});
            }

            // hash the password
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);


            admin.password = hashedPassword;
            admin.forgotPasswordToken = undefined;
            admin.forgotPasswordExpires = undefined;
            admin.save();

            return NextResponse.json({success: true, message : "Password reset successfully!"},{status: 200});
        }

    } catch (error) {
        console.log("Failed to verify! : ",error);
        return NextResponse.json({success: false, message : "Failed to verify!"},{status : 500});
    }
}