"use client";
import LoadingPage from "@/components/Loader";
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

  if (!photo) {
    return (
      <div className="flex h-[90vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-red-500">Photo Not Found</h1>
        <p className="mt-2 text-gray-600">{"We couldn’t find this photo."}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-start gap-6 p-4 md:p-8">
      <div className="flex h-auto w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:h-[85vh] md:w-[90%] md:flex-row">
        {/* Photo Section */}
        <div className="flex h-[50vh] w-full items-center justify-center bg-black/5 md:h-full md:w-[65%]">
          <Image
            src={photo.url}
            alt={photo.title}
            width={600}
            height={600}
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Right Section  */}
        <div className="flex h-full w-full flex-col md:w-[35%]">
          {/* Top bar with user */}
          {typeof photo.user !== "string" && (
            <div className="flex items-center gap-3 p-3">
              <Link
                href={`/profile/${photo.user.userId}`}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300 text-sm font-semibold md:h-12 md:w-12">
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

          {/* Description + Tags */}
          <div className="p-4 text-sm text-neutral-700">
            <h3 className="text-lg font-bold text-neutral-800 md:text-xl">
              {photo.title}
            </h3>
            <p className="break-words">{photo.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {photo.tags.map((val, idx) => (
                <span
                  key={val + idx}
                  className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                >
                  #{val}
                </span>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Scrollable comments */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {photo.comments.length > 0 ? (
                photo.comments.map((cmt, idx) => (
                  <div key={idx} className="flex w-full items-start gap-2">
                    {/* Placeholder avatar */}
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-300" />
                    <p className="max-w-[85%] rounded-lg bg-gray-100 px-3 py-2 text-sm break-words text-gray-800">
                      {cmt}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet.</p>
              )}
            </div>

            {/* Input box */}
            <div className="flex flex-col items-center gap-2 bg-gray-50 p-3 md:flex-row">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="w-full rounded-full border border-neutral-400 px-4 py-2 text-sm outline-none md:w-[80%]"
              />
              <button
                className={`h-full w-full rounded-full border border-neutral-400 bg-red-500 px-4 py-2 text-sm font-semibold md:w-[20%] ${
                  commentInput.trim() ? "text-white" : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (!commentInput.trim()) return;
                  setPhoto((prev) =>
                    prev
                      ? { ...prev, comments: [...prev.comments, commentInput] }
                      : prev,
                  );
                  setCommentInput("");
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePhotoPage;
