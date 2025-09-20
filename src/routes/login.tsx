import { createFileRoute } from "@tanstack/react-router";
import { account } from "../lib/appwrite";
import { OAuthProvider } from "appwrite";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  async function loginWithGoogle() {
    try {
      account.createOAuth2Session({
        provider: OAuthProvider.Google,
        success: `${import.meta.env.VITE_DOMAIN_NAME}`,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className="bg-neutral-200 p-2 w-64 h-[50vh] rounded-xl">
        {/* google login  */}
        <div
          className="bg-white p-1 rounded-xl h-9 flex justify-center items-center gap-4 cursor-pointer"
          onClick={loginWithGoogle}
        >
          <img src="/google.png" alt="logo" className="h-[90%]" />
          <span className="font-bold text-neutral-700">Login With Google</span>
        </div>
      </div>
    </div>
  );
}
