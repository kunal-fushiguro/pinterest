import { ApiGetPhotoResponse, ApiResponseHomePage } from "@/types";
import { getUserData } from "./auth";

export async function uploadPhoto(
  title: string,
  description: string,
  tags: string[] | [],
  ImageUrl: string,
): Promise<boolean> {
  try {
    const response = await fetch("/api/photos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        tags: tags,
        ImageUrl: ImageUrl,
      }),
    });

    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getPhotoData(id: string) {
  try {
    const response = await fetch(`/api/photos?id=${id}`, { method: "GET" });
    const data: ApiGetPhotoResponse = await response.json();
    if (response.ok) {
      return data.data;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getPhotos(page: number, limit: number) {
  try {
    const response = await fetch(`/api/home?page=${page}&limit=${limit}`);
    const data: ApiResponseHomePage = await response.json();
    if (response.ok) {
      return data.data.photos;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addComments(
  photoId: string,
  commment: string,
  userId: string,
) {
  try {
    const userData = await getUserData(userId);
    if (userData) {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          photoId,
          text: commment,
          userId: userData._id,
        }),
      });

      if (response.ok) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function checkIfSaved(photoId: string) {
  try {
    const response = await fetch(`/api/saved?id=${photoId}`);
    if (!response.ok) return false;

    const data = await response.json();
    return data?.data?.saved ?? false;
  } catch (error) {
    console.error("Error checking saved:", error);
    return false;
  }
}

export async function toggleSavePhoto(photoId: string) {
  try {
    const response = await fetch("/api/saved", {
      method: "POST",
      body: JSON.stringify({ postId: photoId }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return { success: false, saved: false };

    const data = await response.json();
    return { success: true, saved: data?.data?.saved ?? false };
  } catch (error) {
    console.error("Error toggling save:", error);
    return { success: false, saved: false };
  }
}
