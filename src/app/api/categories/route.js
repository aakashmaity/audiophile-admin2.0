import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";
// import { authOptions, isAdminRequest } from "./auth/[...nextauth]";


export async function GET(req){
    try {
        await mongooseConnect();

        const categories = await Category.find().populate('parent');
        return NextResponse.json({categories, success: true, message:"category parent found"},{status:  200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}

export async function POST(req, res){
    try {
        await mongooseConnect();

        const {name, parentCategory, properties} = await req.json();
        const categoryDoc = await Category.create({
            name, 
            parent: parentCategory || undefined, 
            properties
        })
        return NextResponse.json({categoryDoc, success: true, message: "Created successfull"},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "Internal Server Error"},{status: 500});
    }
}

export async function PUT(req, res){
    try {
        await mongooseConnect();

        const {name, parentCategory, properties, _id} = await req.json();
        const categoryDoc = await Category.updateOne({_id},{
            name, 
            parent: parentCategory || undefined, 
            properties
        })
        return NextResponse.json({categoryDoc, success: true, message: "Updated successfully"},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false,message: "Internal Server Error"},{status: 500});
    }
}

