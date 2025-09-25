import { authClient } from "@/lib/auth-client";
import { ApiGetUserResponse } from "@/types";

export async function signOut(): Promise<boolean> {
  try {
    await authClient.signOut();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const { data: session, error } = await authClient.getSession();
    if (error) {
      console.error(error);
      return null;
    }

    return session;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function loginWithGoogle() {
  try {
    await authClient.signIn.social({
      provider: "google",
    });
    return true;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserData(id: string) {
  try {
    const response = await fetch(`/api/user?id=${id}`, { method: "GET" });
    const data: ApiGetUserResponse = await response.json();
    if (response.ok) {
      return data.data;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
