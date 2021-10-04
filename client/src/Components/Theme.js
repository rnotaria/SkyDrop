import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { lightMode, darkMode } from "../utils/themes";

function Theme({ children }) {
  const store = useStore();
  const mode = store.getState().data.theme;

  useEffect(() => {
    document.body.style.backgroundColor = mode
      ? darkMode.palette.background.main
      : lightMode.palette.background.main;
  }, [mode]);

  return (
    <ThemeProvider theme={mode ? darkMode : lightMode}>
      {children}
    </ThemeProvider>
  );
}

export default Theme;
