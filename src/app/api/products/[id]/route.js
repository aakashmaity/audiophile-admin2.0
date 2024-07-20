import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await mongooseConnect();

    const id = params.id;
    const product = await Product.findOne({ _id: id });
    return NextResponse.json({ product, success: true, message: "Product found!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal error!" });
  }
}
export async function PUT(req) {
    try {
      await mongooseConnect();
  
      const reqBody = await req.json();
      const { title, description, price, images, category, properties, _id } = reqBody;
      await Product.updateOne(
        { _id },
        {
          title,
          description,
          price,
          images,
          properties,
          category: category || undefined,
        }
      );
      return NextResponse.json({ success: true, message: "Product updated!" });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Internal error!" });
    }
  }

  export async function DELETE(req,{params}) {
    try {
      const id = params.id;
      await Product.deleteOne({ _id: id});
      return NextResponse.json({ success: true, message: "Product deleted!" });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Internal error!" });
    }
  }