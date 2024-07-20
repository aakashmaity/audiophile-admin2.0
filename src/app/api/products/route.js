import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    await mongooseConnect();

    const productList = await Product.find();
    return NextResponse.json({ productList, success: true, message: "Product List found!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal error!" });
  }
}
export async function POST(req) {
  try {
    await mongooseConnect();

    const { title, description, price, images, category, properties } = await req.json();
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      properties,
      category: category || undefined,
    });
    return NextResponse.json({ productDoc, success: true, message: "Product created!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal error!" });
  }
}
