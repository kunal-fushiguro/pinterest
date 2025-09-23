"use client";
import { getCurrentUser, signOut } from "@/services/auth";
import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  //    sign out
  async function signOutUser() {
    const response = await signOut();
    if (response) {
      await updateUser();
      redirect("/");
    }
  }

  async function updateUser() {
    const data = await getCurrentUser();
    setUser(data);
  }

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-white px-4 py-2 shadow-sm md:px-6 md:py-2">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Pinterest Logo"
          width={36}
          height={36}
          className="rounded-lg"
        />
        <span className="ml-2 hidden text-lg font-bold text-gray-800 sm:block md:text-xl">
          Pinterest
        </span>
      </Link>

      {user ? (
        <div className="flex items-center justify-center gap-4">
          <Link
            href={`/profile/${user.user.id}`}
            className="flex h-[32px] w-[32px] items-center gap-2 rounded-full bg-neutral-700 transition hover:text-red-500"
          >
            {/* <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-full"
              /> */}
            {/* <span>{user.name}</span> */}
          </Link>
          <button
            onClick={signOutUser}
            className="cursor-pointer rounded-md border border-gray-300 px-3 py-1 text-center font-medium text-gray-700 transition hover:bg-gray-100 sm:px-3 sm:py-1"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/auth/signup"
            className="rounded-md bg-red-500 px-3 py-1 text-center font-medium text-white transition hover:bg-red-600 sm:px-3 sm:py-1"
          >
            Sign up
          </Link>
          <Link
            href="/auth/signin"
            className="rounded-md border border-gray-300 px-3 py-1 text-center font-medium text-gray-700 transition hover:bg-gray-100 sm:px-3 sm:py-1"
          >
            Sign in
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
