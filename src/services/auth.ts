import { authClient } from "@/lib/auth-client";
import { BASE_URL } from "@/lib/env";

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

export async function getUserData() {
  try {
    const response = await fetch("/api/user", { method: "GET" });
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
