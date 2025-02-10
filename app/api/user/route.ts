import dbConnect from "@/db/db";
import { ContentModel, UserModel } from "@/model/user";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route.ts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");
  console.log(uid);

  await dbConnect();
  const insuranceData = await ContentModel.find({
    userId: uid,
  });

  return NextResponse.json({
    insuranceData,
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  if (req.method == "POST") {
    const session = await getServerSession(authOptions);
    await dbConnect();

    const user = await UserModel.find({
      email: session?.user?.email,
    });
    if (user.length == 1) {
      body.userId = user[0]._id;
      await ContentModel.create(body);
      return NextResponse.json({
        message: "Content added successfully",
      });
    } else {
      return NextResponse.json({
        message: "can not add the content something went wrong ",
      });
    }
  }
  // if (req.method == "PUT") {
  //   await dbConnect();
  //   await ContentModel .updateOne({
  //     filter: {
  //       id: req.Calenderid,
  //     },
  //   });
  // }
}
