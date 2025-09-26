import { auth } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { Photo, Comment } from "@/models";
import { ApiResponse } from "@/utils/ApiResponse";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return new ApiResponse(401, "Unauthorized Access").send();
    }

    const data: { photoId: string; userId: string; text: string } =
      await request.json();
    const { photoId, text, userId } = data;
    if (!photoId || !text || !userId) {
      return new ApiResponse(400, "All fields are required.").send();
    }

    await connectDb();

    const findPhoto = await Photo.findById(photoId);
    if (!findPhoto) {
      return new ApiResponse(400, "Photo not found").send();
    }

    const newComment = await Comment.create({
      photoId: photoId,
      text: text,
      user: userId,
    });

    await Photo.findByIdAndUpdate(
      findPhoto._id,
      {
        $push: { comments: newComment._id },
      },
      { new: true },
    );

    return new ApiResponse(201, "New Comment Added").send();
  } catch (error) {
    if (error instanceof Error) {
      return new ApiResponse(500, error.message).send();
    }
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return new ApiResponse(401, "Unauthorized Access").send();
    }

    const data: { updatedText: string; commentId: string } =
      await request.json();
    const { updatedText, commentId } = data;
    if (!updatedText || !commentId) {
      return new ApiResponse(400, "All fields are required.").send();
    }

    const findComment = await Comment.findById(commentId).populate("user");
    if (!findComment) {
      return new ApiResponse(400, "Comment not found").send();
    }

    if (session.user.id !== findComment.user.userId) {
      return new ApiResponse(401, "Unauthorized Access").send();
    }

    await Comment.findByIdAndUpdate(
      findComment._id,
      {
        text: updatedText,
      },
      { new: true },
    );

    return new ApiResponse(200, "Comment Updated Successfully.");
  } catch (error) {
    if (error instanceof Error) {
      return new ApiResponse(500, error.message).send();
    }
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return new ApiResponse(401, "Unauthorized Access").send();
    }

    const data: { commentId: string } = await request.json();
    const { commentId } = data;
    if (!commentId) {
      return new ApiResponse(400, "All fields are required.").send();
    }

    const findComment = await Comment.findById(commentId).populate("user");
    if (!findComment) {
      return new ApiResponse(400, "Comment not found").send();
    }

    if (session.user.id !== findComment.user.userId) {
      return new ApiResponse(401, "Unauthorized Access").send();
    }

    await Comment.findByIdAndDelete(findComment._id);
    await Photo.findByIdAndUpdate(findComment.photoId, {
      $pull: { comments: findComment._id },
    });
    return new ApiResponse(200, "Comment Deleted Successfully.");
  } catch (error) {
    if (error instanceof Error) {
      return new ApiResponse(500, error.message).send();
    }
  }
}
