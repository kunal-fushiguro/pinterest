import { Client, ID, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("68d37cb60020b1fc799f");

const storage = new Storage(client);
const BUCKETID = "68d37ea7003df1fc808e";

export async function uploadImage(file: File | null): Promise<string | null> {
  try {
    if (!file) {
      return null;
    }

    const response = await storage.createFile(BUCKETID, ID.unique(), file);

    const getFileUrl = storage.getFileDownload(BUCKETID, response.$id);

    return getFileUrl;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}
