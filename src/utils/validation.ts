import { Dispatch, SetStateAction } from "react";

export function validateLoginEmail(
  email: string,
  setIsError: Dispatch<SetStateAction<boolean>>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
) {
  if (!email) {
    setIsError(true);
    setErrorMsg("Email is required");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setIsError(true);
    setErrorMsg("Please enter a valid email address");
    return false;
  }
  setIsError(false);
  setErrorMsg("");
  return true;
}

export function validateLoginPassword(
  password: string,
  setIsError: Dispatch<SetStateAction<boolean>>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
) {
  if (!password) {
    setIsError(true);
    setErrorMsg("Password is required");
    return false;
  }
  if (password.length < 6) {
    setIsError(true);
    setErrorMsg("Password must be at least 6 characters long");
    return false;
  }
  setIsError(false);
  setErrorMsg("");
  return true;
}

export function validateUsername(
  username: string,
  setIsError: Dispatch<SetStateAction<boolean>>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
) {
  if (!username) {
    setIsError(true);
    setErrorMsg("Username is required");
    return false;
  }
  if (username.length < 3) {
    setIsError(true);
    setErrorMsg("Username must be at least 3 characters long");
    return false;
  }
  if (username.length > 20) {
    setIsError(true);
    setErrorMsg("Username must be less than 20 characters long");
    return false;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    setIsError(true);
    setErrorMsg("Username can only contain letters, numbers, and underscores");
    return false;
  }
  setIsError(false);
  setErrorMsg("");
  return true;
}

export function validateFile(
  file: File | null,
  setIsError: Dispatch<SetStateAction<boolean>>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
) {
  if (!file) {
    setIsError(true);
    setErrorMsg("File is required");
    return false;
  }
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    setIsError(true);
    setErrorMsg("Only JPG, PNG, or WEBP images allowed");
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    setIsError(true);
    setErrorMsg("File size must be under 5MB");
    return false;
  }
  setIsError(false);
  setErrorMsg("");
  return true;
}

// Title validation
export function validateTitle(
  title: string,
  setIsError: Dispatch<SetStateAction<boolean>>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
) {
  if (!title) {
    setIsError(true);
    setErrorMsg("Title is required");
    return false;
  }
  if (title.length < 3) {
    setIsError(true);
    setErrorMsg("Title must be at least 3 characters");
    return false;
  }
  setIsError(false);
  setErrorMsg("");
  return true;
}

// Description validation
export function validateDescription(
  description: string,
  setIsError: Dispatch<SetStateAction<boolean>>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
) {
  if (!description) {
    setIsError(true);
    setErrorMsg("Description is required");
    return false;
  }
  if (description.length < 10) {
    setIsError(true);
    setErrorMsg("Description must be at least 10 characters");
    return false;
  }
  setIsError(false);
  setErrorMsg("");
  return true;
}
