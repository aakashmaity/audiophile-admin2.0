
import { mongooseConnect } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await mongooseConnect();
        const reqBody = await req.json();
        const { name, email, username, password } = reqBody;
        

        // hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create a new admin
          const newAdmin = new Admin({
          name,
          email,
          username,
          password: hashedPassword,
        });
        await newAdmin.save();
        return NextResponse.json({ success: true, message: 'Welcome to Audiophile',admin: newAdmin},{status: 201});
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({success: false, message: 'Username already exists' },{status: 409});
        } else {
            return NextResponse.json({success: false, message: 'Internal server error' },{status: 500});
        }
    }
}
