"use client";
import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { NavBar } from "../components/navbar";

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
    console.log(isLogin)  
    if (!isLogin) {
      router.push("/");
    }
  }, [isLogin]);
  return (
    <>
    {children}
    <NavBar/>
    </>
  );
}
