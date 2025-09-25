"use client";
import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
    </div>
  );
};

export default LoadingPage;
