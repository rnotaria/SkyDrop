import { createTheme } from "@mui/material/styles";
import { red, green } from "@mui/material/colors";

export const lightMode = createTheme({
  palette: {
    mode: "light",
    success: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
    background: {
      main: "#FFFFFF",
      first: "#ffffff",
      second: "#f3f6f9",
      third: "#d7dce1",
    },
    tab: {
      primary: "#f3f6f9",
      secondary: "#d7dce1",
    },
    navbar: {
      primary: "#eaeef3",
    },
    border: {
      primary: "#d9dee3",
    },
  },
});

export const darkMode = createTheme({
  palette: {
    mode: "dark",
    background: {
      main: "#000000",
      first: "#0a1929",
      second: "#121212",
      third: "#1e1e1e",
    },
    tab: {
      primary: "#121212",
      secondary: "#1e1e1e",
    },
    navbar: {
      primary: "#091929",
    },
    border: {
      primary: "#1c4671",
    },
  },
});
