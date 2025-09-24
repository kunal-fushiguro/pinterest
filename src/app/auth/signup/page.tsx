"use client";
import InputBox from "@/components/auth/InputBox";
import { authClient } from "@/lib/auth-client";
import { loginWithGoogle } from "@/services/auth";
import {
  validateLoginEmail,
  validateLoginPassword,
  validateUsername,
} from "@/utils/validation";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const SignUpPage = () => {
  // Input states
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Error handling states
  const [isUserNameError, setIsUserNameError] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<string>("");

  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");

  async function signUpUser() {
    try {
      const name = validateUsername(
        userName,
        setIsUserNameError,
        setUserNameError,
      );
      const emailValid = validateLoginEmail(
        email,
        setIsEmailError,
        setEmailError,
      );
      const passwordValid = validateLoginPassword(
        password,
        setIsPasswordError,
        setPasswordError,
      );

      if (!emailValid || !passwordValid || !name) return;
      const { data, error } = await authClient.signUp.email({
        name: userName,
        email: email,
        password: password,
      });

      if (error) {
        if (error.status === 422) {
          setIsEmailError(true);
          setEmailError("Email is Already In Use");
        }
        console.error(error);
        return;
      }

      console.log(data);
      redirect("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100 px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            width={48}
            height={48}
            src="/logo.png"
            alt="logo"
            className="h-12 w-12"
          />
          <span className="text-center text-2xl font-bold text-neutral-800">
            Welcome to Pinterest
          </span>
        </div>
        <div className="flex w-full flex-col gap-4">
          <InputBox
            input={userName}
            setInput={setUserName}
            title="Username"
            placeHolderText="Username"
            type="text"
            error={isUserNameError}
            errorMsg={userNameError}
          />
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
          <button
            onClick={signUpUser}
            className="w-full rounded-lg bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            Sign In
          </button>
        </div>
        <div className="flex w-full items-center gap-2">
          <span className="h-px flex-1 bg-neutral-300"></span>
          <span className="text-sm font-medium text-neutral-600">OR</span>
          <span className="h-px flex-1 bg-neutral-300"></span>
        </div>
        <div
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-neutral-300 bg-white py-2.5 transition hover:bg-neutral-50"
          onClick={loginWithGoogle}
        >
          <Image
            src="/google.png"
            alt="logo"
            width={20}
            height={20}
            className="h-5"
          />
          <span className="text-sm font-medium text-neutral-700">
            Continue with Google
          </span>
        </div>
        <div className="text-sm text-neutral-700">
          Already a member?
          <Link
            href="/auth/signin"
            className="font-semibold text-red-500 hover:underline"
          >
            {" "}
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
