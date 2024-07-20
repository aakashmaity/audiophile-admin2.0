import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        await mongooseConnect();
        const orders = await Order.find().sort({createdAt: -1});
        return NextResponse.json({orders,success: true},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to fetch orders", success: false},{status: 500});
    }
    
}