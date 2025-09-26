import { ApiResponse } from "@/utils/ApiResponse";
import { connectDb } from "@/lib/db";
import { Users } from "@/models/user";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Photo } from "@/models/photos";

//  get single photo
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageId = searchParams.get("id");
  if (!imageId) {
    return new ApiResponse(400, "Photo ID is required").send();
  }

  try {
    await connectDb();

    const findPhoto = await Photo.findById(imageId).populate([
      {
        path: "user",
        strictPopulate: false,
      },
    ]);

    if (!findPhoto) {
      return new ApiResponse(400, "Photo Not Existed").send();
    }

    return new ApiResponse(200, "User Fetched Successfully", findPhoto).send();
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new ApiResponse(500, e.message).send();
    }
  }
}

//  upload
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new ApiResponse(401, "Unauthorized Access").send();
  }

  try {
    const data: {
      ImageUrl: string;
      title: string;
      description: string;
      tags: string[];
    } = await request.json();
    const { ImageUrl, title, description, tags } = data;

    if (!ImageUrl || !title || !description) {
      return new ApiResponse(400, "All Fields are required");
    }

    await connectDb();
    const findUser = await Users.findOne({ userId: session.user.id });

    if (!findUser) {
      return new ApiResponse(400, "User Not Existed").send();
    }

    const newPhoto = await Photo.create({
      user: findUser._id,
      url: ImageUrl,
      title: title,
      description: description,
      comments: [],
      tags: tags,
    });

    await Users.findByIdAndUpdate(
      findUser._id,
      { $push: { uploads: newPhoto._id } },
      { new: true },
    );

    return new ApiResponse(
      201,
      "New Photo uploaded Successfully",
      newPhoto,
    ).send();
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new ApiResponse(500, e.message).send();
    }
  }
}
