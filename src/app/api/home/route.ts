import { connectDb } from "@/lib/db";
import { Photo } from "@/models";
import { ApiResponse } from "@/utils/ApiResponse";

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function GET(request: Request) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    let photos = await Photo.find({}).skip(skip).limit(limit).lean();

    photos = shuffleArray(photos);

    const total = await Photo.countDocuments();

    return new ApiResponse(200, "Photos fetched successfully", {
      photos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }).send();
  } catch (error) {
    if (error instanceof Error) {
      return new ApiResponse(500, error.message).send();
    }
  }
}
