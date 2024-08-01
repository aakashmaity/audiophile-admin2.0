import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { mongooseConnect } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongooseConnect();
    const reqBody = await req.json();
    const { username, password } = reqBody;

    // check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ success: false, message: "Username not found" },{status: 404});
    }

    // check password if correct
    const validPassword = await bcryptjs.compare(password, admin.password);
    if (!validPassword) {
      return NextResponse.json({ success: false, message: "Incorrect password" },{status: 401});
    }

    // create token data
    const tokenData = {
      id: admin._id,
      username: username,
      email: admin.email,
    };

    // generate token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET);

    const response = NextResponse.json({ success: true, message: "Logged in successfully" },{status: 200});

    // store token in browser cookies
    response.cookies.set("token",token,{ expires: "1d", httpOnly: true});
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Login failed!" , errorMessage : error.message},{status:500});
  }
}
