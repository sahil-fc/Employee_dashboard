"use client";
import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isLogin = useSelector(
    (state: RootState) => state.profileReducer.isLogin
  );
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
