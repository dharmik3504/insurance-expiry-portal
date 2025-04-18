import dbConnect from "@/db/db";
import { ContentModel } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const content_Id = searchParams.get("content_Id");

  await dbConnect();
  console.log("content_Id : " + content_Id);
  const insuranceData = await ContentModel.findOne({
    _id: content_Id,
  });

  return NextResponse.json({
    insuranceData,
  });
}
