import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      main: "#000000",
      first: "#0a1929",
      second: "#121212",
      third: "#222222",
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
