"use client";
import { useParams } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  return <div>ProfilePage : {id}</div>;
};

export default ProfilePage;
