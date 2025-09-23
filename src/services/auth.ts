import { authClient } from "@/lib/auth-client";

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
    const data = await authClient.signIn.social({
      provider: "google",
    });
    return true;
  } catch (error) {
    console.error(error);
  }
}
