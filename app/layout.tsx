"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });
import { NavBar } from "./components/navbar";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { SessionProvider, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/router";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className} style={{fontFamily:"League Spartan"}}>
        {/* Wrap the entire content with SessionProvider */}
        <SessionProvider >
          <StoreProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
