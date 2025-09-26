import { ApiResponse } from "@/utils/ApiResponse";
import { connectDb } from "@/lib/db";
import { Users } from "@/models/user";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");
  if (!userId) {
    return new ApiResponse(400, "User ID is required").send();
  }

  try {
    await connectDb();

    const findUser = await Users.findOne({ userId }).populate([
      { path: "uploads", strictPopulate: false },
    ]);

    if (!findUser) {
      return new ApiResponse(400, "User Not Existed").send();
    }

    return new ApiResponse(200, "User Fetched Successfully", findUser).send();
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new ApiResponse(500, e.message).send();
    }
  }
}
