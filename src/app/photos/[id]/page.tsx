"use client";
import InfiniteScroll from "@/components/InfiniteScroll";
import LoadingPage from "@/components/Loader";
import { authClient } from "@/lib/auth-client";
import { getPhotoData } from "@/services/photo";
import { SinglePhotoType } from "@/types";
import { getUserInitials } from "@/utils/getUserInitials";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SinglePhotoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [photo, setPhoto] = useState<SinglePhotoType | null>(null);
  const [commentInput, setCommentInput] = useState<string>("");
  const { data: session } = authClient.useSession();
  const [num, setNum] = useState<number>(1);

  async function dataHandler() {
    setLoading(true);
    const data = await getPhotoData(id);
    if (data) {
      setPhoto(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    dataHandler();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setPhoto((prev) =>
      prev
        ? {
            ...prev,
            comments: [
              ...prev.comments,
              {
                _id: num.toString(),
                photoId: photo?._id || "",
                text: commentInput,
                user: session?.user.id || "",
              },
            ],
          }
        : prev,
    );
    setCommentInput("");
    setNum((prev) => prev + 1);
  };

  // handle save button click
  async function saved() {}

  if (!photo) {
    return (
      <div className="flex h-[90vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-red-500">Photo Not Found</h1>
        <p className="mt-2 text-gray-600">{"We couldn’t find this photo."}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-auto w-full items-center justify-center p-2 sm:h-[90vh] md:p-5">
        <div className="flex h-[100%] w-full flex-col items-center justify-center gap-2 sm:flex-row sm:gap-0 md:w-[50%]">
          {/*  image */}
          <div className="flex h-full w-full items-center justify-center rounded-xl border-neutral-400 sm:w-1/2 sm:overflow-hidden sm:rounded-r-none sm:border sm:border-r-0">
            <Image
              src={photo.url}
              alt={photo.title}
              width={600}
              height={600}
              className="h-full w-full rounded-xl object-contain sm:w-auto sm:rounded-none"
            />
          </div>
          {/*  information  */}
          <div className="flex h-full w-full flex-col items-start justify-start rounded-xl border border-neutral-400 sm:w-1/2 sm:rounded-l-none sm:border-l">
            {/*  owner info */}
            <div className="flex h-16 w-full items-center justify-between border-b border-b-neutral-400 px-2">
              <span>
                {typeof photo.user !== "string" && (
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/profile/${photo.user.userId}`}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-sm font-semibold md:h-10 md:w-10">
                        {photo.user.image.trim() === "" ? (
                          getUserInitials(photo.user.name)
                        ) : (
                          <Image
                            alt={photo.user.name}
                            src={photo.user.image}
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <span className="text-sm font-medium md:text-base">
                        {photo.user.name}
                      </span>
                    </Link>
                  </div>
                )}
              </span>
              {/*   */}
              <span
                className="cursor-pointer rounded-xl bg-[#da0625] px-3 py-1 text-lg font-medium text-white"
                onClick={saved}
              >
                Save
              </span>
            </div>
            {/* other info */}
            <div className="relative flex h-full w-full justify-start">
              <div className="flex h-full w-full flex-col items-start justify-start px-3 pb-14">
                {/* title description and tags */}
                <div className="flex flex-col py-2">
                  <h3 className="text-lg font-bold text-neutral-800">
                    {photo.title}
                  </h3>
                  <p className="text-sm break-words">{photo.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {photo.tags.map((val, idx) => (
                      <span
                        key={val + idx}
                        className="rounded-md px-1 text-xs text-gray-600"
                      >
                        {"# "}
                        {val}
                      </span>
                    ))}
                  </div>
                </div>

                {/* comments (fixed scrollable section) */}
                <div className="mt-3 w-full flex-1">
                  <div className="h-full max-h-[55vh] space-y-3 overflow-y-auto">
                    {/* comment */}
                    <div className="flex w-full flex-col items-start gap-2">
                      {photo.comments.length > 0 ? (
                        photo.comments.map((val) => {
                          // check if user is object or string
                          const isCurrentUser =
                            (typeof val.user === "string" &&
                              val.user === session?.user?.id) ||
                            (typeof val.user !== "string" &&
                              val.user.userId === session?.user?.id);

                          const userName =
                            typeof val.user === "string"
                              ? (session?.user?.name ?? "User")
                              : (val.user.name ?? "User");

                          const userImage =
                            typeof val.user === "string"
                              ? (session?.user?.image ?? "/default-avatar.png")
                              : (val.user.image ?? "/default-avatar.png");

                          return (
                            <div
                              key={val._id}
                              className="flex items-start gap-2"
                            >
                              <Link
                                href={
                                  isCurrentUser
                                    ? `/profile/${session?.user?.id}`
                                    : `/profile/${typeof val.user !== "string" ? val.user.userId : ""}`
                                }
                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-xs font-medium text-black"
                              >
                                {userImage.trim() === "" ? (
                                  getUserInitials(userName)
                                ) : (
                                  <Image
                                    alt={userName}
                                    src={userImage}
                                    width={100}
                                    height={100}
                                    className="h-full w-full object-cover"
                                  />
                                )}
                              </Link>

                              <p className="max-w-[85%] rounded-2xl bg-gray-100 px-4 py-2 text-sm break-words text-gray-800">
                                {val.text}
                              </p>
                            </div>
                          );
                        })
                      ) : (
                        <span className="flex h-20 w-full items-center justify-center text-sm text-gray-500">
                          No comments yet. Be the first!
                        </span>
                      )}
                      {/*  */}
                    </div>
                  </div>
                </div>
              </div>

              {/* input box (fixed at bottom) */}
              <div className="absolute bottom-0 z-20 flex h-14 w-full items-center justify-between overflow-hidden rounded-xl border-t border-neutral-300 bg-white/90 px-3 backdrop-blur-sm">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddComment();
                  }}
                  className="h-10 w-[85%] rounded-full border border-neutral-300 px-4 text-sm outline-none focus:ring-1 focus:ring-neutral-400"
                />
                <button
                  className="ml-2 rounded-full bg-[#da0625] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#b9051e]"
                  onClick={handleAddComment}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto p-2 lg:w-[80%] lg:p-0">
        <InfiniteScroll />
      </div>
    </>
  );
};

export default SinglePhotoPage;
