"use client";
import { Inter,League_Spartan } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
const league = League_Spartan({weight:"400",subsets:["latin"]});
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={league.className} >
        {/* Wrap the entire content with SessionProvider */}
        {/* <SessionProvider > */}
          {/* <StoreProvider> */}
            <ThemeProvider theme={theme}>
            <Toaster position="top-center" />{children}</ThemeProvider>
          {/* </StoreProvider> */}
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
