"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#196C6C",
    },
    secondary: {
      main: "#040616",
    },
  },
  typography: {
    fontFamily:"League Spartan",
    h1: {
      fontSize: "2.2rem",
      fontWeight: 540,
      lineHeight: "63px",
      letterSpacing: "0.02em",
      color: "#040616",
      textAlign: "center",
    },
    h2: {
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "22px",
    },
    h3: {
      fontSize: "13px",
      fontWeight: 500,
      lineHeight: "22px",
    },
    h4: {
      fontSize: "13px",
      fontWeight: 400,
      lineHeight: "22px",
    },
    body1: {
      fontSize: "18px",
      fontWeight: 550,
      lineHeight: "28px",
    },
  },
});
