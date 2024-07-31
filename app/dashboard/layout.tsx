"use client";
import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { useGetLoginMutation } from "../Services/userService";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isLogin = useSelector(
    (state: RootState) => state.profile.isLogin
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
