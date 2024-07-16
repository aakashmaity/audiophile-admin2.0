import { sendEmail } from "@/helpers/mailer";
import { NextResponse } from "next/server";

export async function POST(req){

    try {
        const reqBody = await req.json();
        
        const {email, emailType, id} = reqBody;
        
        const response = await sendEmail(email, emailType, id);
        return NextResponse.json({success: true, message: "Email sent successfully!"});
    } catch (error) {
        return NextResponse.json({success: false, message: "Error sending email: " + error.message});   
    }
    
}