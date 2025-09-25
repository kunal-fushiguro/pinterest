"use client";

import { authClient } from "@/lib/auth-client";
import { signOut } from "@/services/auth";
import { getUserInitials } from "@/utils/getUserInitials";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // handle sign out
  async function signOutUser() {
    const response = await signOut();
    if (response) {
      router.replace("/");
    }
  }

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

      {isPending ? (
        <span className="text-sm text-gray-500">Loading...</span>
      ) : session ? (
        <div className="flex items-center justify-center gap-4">
          <Link
            href={`/profile/${session.user.id}`}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-neutral-700"
          >
            {session.user.image && (
              <Image
                src={session.user?.image}
                alt={session.user.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            {!session.user.image && (
              <span className="text-sm font-medium text-white">
                {getUserInitials(session.user.name)}
              </span>
            )}
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
