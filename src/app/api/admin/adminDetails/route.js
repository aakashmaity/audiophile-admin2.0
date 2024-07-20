import { getDataFromToken } from "@/helpers/getDataFromToken";
import { mongooseConnect } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        await mongooseConnect();  

        const adminId = await getDataFromToken(req);
        
        const admin = await Admin.findOne({_id : adminId}).select("-password");
        return NextResponse.json({admin, success: true, message: "Admin Found!"},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "Admin not found from token"},{status:500});
    }
}

export async function POST(req) {
    try {
        await mongooseConnect(); 

        const reqBody = await req.json();
        const { username } = reqBody;


        // search by username
        const admin = await Admin.findOne({username});
        if(!admin) {
            return NextResponse.json({success: false, message:"User not exist"},{status:401});
        }

        return NextResponse.json({admin,success: true, message: "User Found!"});

    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "Internal error!"},{status:500});
    }
}