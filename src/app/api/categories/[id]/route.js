import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await mongooseConnect();

    const _id = params.id;
    await Category.deleteOne({ _id });

    return NextResponse.json(
      { success: true, message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
