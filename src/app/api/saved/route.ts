import { auth } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { ApiResponse } from "@/utils/ApiResponse";
import { headers } from "next/headers";
import { Users } from "@/models";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageId = searchParams.get("id");
  if (!imageId) {
    return new ApiResponse(400, "Photo ID is required").send();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new ApiResponse(200, "No session found", { saved: false }).send();
  }

  try {
    await connectDb();

    const findUser = await Users.findOne({ userId: session.user.id });

    if (!findUser) {
      return new ApiResponse(200, "No User found", { saved: false }).send();
    }

    const isSaved = findUser.collections.some(
      (postId: string) => postId.toString() === imageId,
    );

    return new ApiResponse(200, "Checked successfully", {
      saved: isSaved,
    }).send();
  } catch (error) {
    if (error instanceof Error) {
      return new ApiResponse(500, error.message).send();
    }
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new ApiResponse(401, "Unauthorized Access").send();
  }

  try {
    const body: { postId: string } = await request.json();
    const { postId } = body;

    if (!postId) {
      return new ApiResponse(400, "Post Id is required").send();
    }

    await connectDb();

    const user = await Users.findOne({ userId: session.user.id });
    if (!user) {
      return new ApiResponse(404, "User not found").send();
    }

    const alreadySaved = user.collections.some(
      (id: string) => id.toString() === postId,
    );

    if (alreadySaved) {
      user.collections = user.collections.filter(
        (id: string) => id.toString() !== postId,
      );
      await user.save();
      return new ApiResponse(200, "Post unsaved", { saved: false }).send();
    } else {
      user.collections.push(postId);
      await user.save();
      return new ApiResponse(200, "Post saved", { saved: true }).send();
    }
  } catch (error) {
    if (error instanceof Error) {
      return new ApiResponse(500, error.message).send();
    }
  }
}
