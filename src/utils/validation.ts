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
