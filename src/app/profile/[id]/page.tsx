"use client";

import LoadingPage from "@/components/Loader";
import { getUserData } from "@/services/auth";
import { UserPageType } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUserInitials } from "@/utils/getUserInitials";
import Tabs from "@/components/Tabs";
import Link from "next/link";
import { Plus } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserPageType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = authClient.useSession();

  // tabs
  const data = ["Uploads", "Collections"];
  const [tab, setTab] = useState(data[0]);

  async function dataHandler() {
    setLoading(true);
    const data = await getUserData(id);
    if (data) {
      setUser(data);
    }
    setLoading(false);
  }

  console.log("User Data :", session);

  useEffect(() => {
    dataHandler();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return (
      <div className="flex h-[90vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-red-500">User Not Found</h1>
        <p className="mt-2 text-gray-600">{"We couldn’t find this profile."}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-start gap-6 p-4 md:p-5">
      {/* User Info Section */}
      <div className="flex w-full max-w-4xl flex-col items-center gap-6 rounded-2xl bg-white p-6 md:flex-row">
        {/* Profile Image or Initials */}
        <div className="flex-shrink-0">
          {user.image && user.image.trim() !== "" ? (
            <Image
              src={user.image}
              alt={user.name}
              width={200}
              height={200}
              className="h-24 w-24 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-2xl font-semibold text-black">
              {getUserInitials(user.name)}
            </div>
          )}
        </div>
        {/* User Details */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="w-full max-w-4xl">
        {/* switching tabs */}
        <Tabs data={data} selectedTabs={tab} setSelectedTabs={setTab} />
      </div>
      <div
        className={`w-full max-w-4xl ${
          tab === data[0] && user.uploads.length > 0 && "columns-[300px]"
        } ${tab === data[1] && user.collections.length > 0 && "columns-[300px]"}`}
      >
        {/* Show Create button only for the logged-in user */}
        {session?.user.id === id && tab === data[0] && (
          <Link
            href={`/create/${tab.toLocaleLowerCase()}`}
            className="mb-4 flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-400 bg-neutral-50 p-4 text-center transition hover:border-neutral-600 hover:bg-neutral-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200">
              <Plus className="h-6 w-6 text-neutral-700" />
            </div>
            <p className="text-sm font-medium text-neutral-700">
              Create New {tab}
            </p>
          </Link>
        )}

        {/* Uploads Section */}
        {tab === data[0] &&
          user.uploads.map((val) => (
            <Link href={`/photos/${val._id}`} key={val.title}>
              <Image
                width={500}
                height={500}
                className="mb-4 w-full rounded-xl"
                alt={"p" + val.title}
                src={val.url}
              />
            </Link>
          ))}

        {/* collections sections */}
        {tab === data[1] &&
          user.collections.map((val) => (
            <Link href={`/photos/${val._id}`} key={val.title}>
              <Image
                width={500}
                height={500}
                className="mb-4 w-full rounded-xl"
                alt={"p" + val.title}
                src={val.url}
              />
            </Link>
          ))}
        {/* No Collections and Uploads */}
        {tab === data[0] && user.uploads.length <= 0 && !session && (
          <p className="mt-6 text-center text-sm text-neutral-500">
            No uploads yet.
          </p>
        )}
        {tab === data[1] && user.collections.length <= 0 && !session && (
          <p className="mt-6 text-center text-sm text-neutral-500">
            No collections yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
