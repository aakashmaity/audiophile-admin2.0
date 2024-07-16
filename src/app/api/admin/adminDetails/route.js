import { getDataFromToken } from "@/helpers/getDataFromToken";
import { mongooseConnect } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        await mongooseConnect();
        const adminId = await getDataFromToken(req);
        const admin = await Admin.findOne({_id : adminId}).select("-password");
        return NextResponse.json({admin, success: true, message: "Admin Found!"});
    } catch (error) {
        return NextResponse.json({success: false, message: error.message},{status:500});
    }
}