import dbConnect from "@/db/db";
import UserModel from "@/model/user";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();
  const insuranceData = await UserModel.find({});

  return NextResponse.json({
    insuranceData,
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  if (req.method == "POST") {
    await dbConnect();
    await UserModel.create(body);

    // return res.status(200);
    return NextResponse.json({
      message: "yo yo",
    });
  }
  // if (req.method == "PUT") {
  //   await dbConnect();
  //   await UserModel.updateOne({
  //     filter: {
  //       id: req.Calenderid,
  //     },
  //   });
  // }
}
