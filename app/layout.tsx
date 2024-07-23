"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

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
            <ThemeProvider theme={theme}>
            <Toaster position="top-center" />{children}</ThemeProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
