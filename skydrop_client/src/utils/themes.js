import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red, green } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      first: "#091929",
      second: "#001e3c",
      third: "#132f4c",
    },
    tab: {
      primary: "#121212",
      secondary: "#1e1e1e",
    },
    border: {
      primary: "#1c4671",
    },
  },
});
