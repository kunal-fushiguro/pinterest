"use client";

import LoadingPage from "@/components/Loader";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !data) {
      router.replace("/");
    }
  }, [data, isPending, router]);

  if (isPending) {
    return <LoadingPage />;
  }

  if (data) {
    return <>{children}</>;
  }
  return null;
};

export default CreateLayout;
