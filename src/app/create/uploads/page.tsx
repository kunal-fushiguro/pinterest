"use client";

import InputBox from "@/components/InputBox";
import { uploadImage } from "@/lib/appwrite";
import { authClient } from "@/lib/auth-client";
import { uploadPhoto } from "@/services/photo";
import {
  validateFile,
  validateTitle,
  validateDescription,
} from "@/utils/validation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, DragEvent, useMemo } from "react";

const UploadNewPhotoPage = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const [isFileError, setIsFileError] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string>("");

  const [isTitleError, setIsTitleError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string>("");

  const [isDescriptionError, setIsDescriptionError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<string>("");

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  async function handleUpload() {
    const fileValid = validateFile(file, setIsFileError, setFileError);
    const titleValid = validateTitle(title, setIsTitleError, setTitleError);
    const descriptionValid = validateDescription(
      description,
      setIsDescriptionError,
      setDescriptionError,
    );

    if (!fileValid || !titleValid || !descriptionValid) return;

    setLoading(true);
    setDisable(true);
    try {
      const ImageUrl = await uploadImage(file);
      if (ImageUrl === null) {
        console.error("Error While Uploading Image");
        return;
      }
      const isPhotoUploaded = await uploadPhoto(
        title,
        description,
        tags.split(","),
        ImageUrl,
      );

      if (isPhotoUploaded) {
        router.push(`/profile/${session?.user.id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setDisable(false);
    }
  }

  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center px-4">
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 rounded-2xl bg-white p-6 md:grid-cols-2">
        {/* Left Section - Drag & Drop + Preview */}
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-neutral-400 p-6 text-center transition hover:border-red-400"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!file ? (
            <>
              <p className="text-sm text-neutral-600">
                Drag & drop your photo here or click to upload
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Choose File
              </label>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover shadow-md"
                />
              )}
              <p className="text-sm text-neutral-700">{file.name}</p>
              <button
                onClick={() => setFile(null)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
          {isFileError && <p className="text-sm text-red-500">{fileError}</p>}
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-col gap-4">
          <InputBox
            input={title}
            setInput={setTitle}
            title="Title"
            placeHolderText="Photo title"
            type="text"
            error={isTitleError}
            errorMsg={titleError}
          />

          <InputBox
            input={description}
            setInput={setDescription}
            title="Description"
            placeHolderText="Photo description"
            type="text"
            error={isDescriptionError}
            errorMsg={descriptionError}
          />

          <InputBox
            input={tags}
            setInput={setTags}
            title="Tags"
            placeHolderText="e.g. travel, sunset"
            type="text"
            error={false}
            errorMsg=""
          />

          <button
            onClick={handleUpload}
            disabled={disable}
            className="mt-4 w-full rounded-lg bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            {loading ? (
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadNewPhotoPage;
