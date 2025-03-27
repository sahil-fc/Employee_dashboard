"use client";
import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { userStore } from "@/lib/persistedStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
     const {
        isLogin,
      } = userStore();
  useLayoutEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
  }, [isLogin]);
  return (
    <>

    {children}
    </>
  );
}
