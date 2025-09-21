import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { account } from "../lib/appwrite";
import { OAuthProvider } from "appwrite";
import { useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { validateLoginEmail, validateLoginPassword } from "../utils/validation";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const navigate = useNavigate();

  // login with email and password
  async function login() {
    try {
      const emailValid = validateLoginEmail(
        email,
        setIsEmailError,
        setEmailError
      );
      const passwordValid = validateLoginPassword(
        password,
        setIsPasswordError,
        setPasswordError
      );

      if (!emailValid || !passwordValid) return;

      const response = await account.createEmailPasswordSession({
        email: email,
        password: password,
      });

      if (response) {
        navigate({ to: "/" });
      }
    } catch (error) {
      console.error(error);
    }
  }

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
    <div className="w-full h-[90vh] flex justify-center items-center bg-neutral-100 px-4">
      <div className="bg-white shadow-lg p-6 w-full max-w-sm rounded-2xl flex flex-col items-center gap-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-12 h-12" />
          <span className="font-bold text-2xl text-center text-neutral-800">
            Welcome back to Pinterest
          </span>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <InputBox
            input={email}
            setInput={setEmail}
            title="Email Address"
            placeHolderText="Email"
            type="email"
            error={isEmailError}
            errorMsg={emailError}
          />
          <InputBox
            input={password}
            setInput={setPassword}
            title="Password"
            placeHolderText="Password"
            type="password"
            error={isPasswordError}
            errorMsg={passwordError}
          />
          <Button
            onCLick={login}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer"
          >
            Login
          </Button>
        </div>
        <div className="flex items-center w-full gap-2">
          <span className="flex-1 h-px bg-neutral-300"></span>
          <span className="text-sm font-medium text-neutral-600">OR</span>
          <span className="flex-1 h-px bg-neutral-300"></span>
        </div>
        <div
          className="bg-white border border-neutral-300 w-full py-2.5 rounded-lg flex justify-center items-center gap-3 cursor-pointer hover:bg-neutral-50 transition"
          onClick={loginWithGoogle}
        >
          <img src="/google.png" alt="logo" className="h-5" />
          <span className="font-medium text-sm text-neutral-700">
            Continue with Google
          </span>
        </div>
        <div className="text-sm text-neutral-700">
          <Link
            to="/signup"
            className="font-semibold text-red-500 hover:underline"
          >
            Not on Pinterest yet? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
