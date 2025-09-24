import { auth } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { Users } from "@/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    await connectDb();
    const findUser = await Users.findOne({ user: session.user.id });

    if (!findUser) {
      return NextResponse.json(
        {
          msg: "User Not Existed",
          success: false,
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        msg: "User Fetched Successfully",
        success: true,
        data: findUser,
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.error(e);
  }
}
