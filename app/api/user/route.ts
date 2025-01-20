import dbConnect from "@/db/db";
import UserModel from "@/model/user";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const insuranceData = await UserModel.find({});
  return NextResponse.json({
    insuranceData,
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body);
  if (req.method == "POST") {
    await dbConnect();
    await UserModel.create(body);

    // return res.status(200);
    return NextResponse.json({
      message: "yo yo",
    });
  }
}
