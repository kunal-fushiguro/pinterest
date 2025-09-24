import { Client, ID, Storage } from "appwrite";
import {
  NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID,
} from "./env";

const client = new Client()
  .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const storage = new Storage(client);
const BUCKETID = "68d37ea7003df1fc808e";

export async function uploadImage(file: File): Promise<string | null> {
  try {
    const response = await storage.createFile({
      bucketId: BUCKETID,
      fileId: ID.unique(),
      file: file,
    });

    const getFileUrl = await storage.getFileDownload({
      bucketId: BUCKETID,
      fileId: response.$id,
    });

    return getFileUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}
