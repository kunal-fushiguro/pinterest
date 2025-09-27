import { ApiGetPhotoResponse, ApiResponseHomePage } from "@/types";

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
