"use client";

import { Nunito_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: nunitoSans.style.fontFamily,
  },
});

export default theme;
