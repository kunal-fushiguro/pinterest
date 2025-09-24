"use client";
import { getUserData } from "@/services/auth";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getUserData();
  }, []);
  return <div>ProfilePage : {id}</div>;
};

export default ProfilePage;
