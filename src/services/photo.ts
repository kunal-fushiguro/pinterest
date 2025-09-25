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
