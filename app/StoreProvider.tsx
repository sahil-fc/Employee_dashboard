"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import React from "react";
import { persistStore } from "redux-persist";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        {children}
  );
}
