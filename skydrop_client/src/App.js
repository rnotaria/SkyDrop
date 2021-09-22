import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ModuleContainer from "./Components/ModuleContainer";
import Alert from "./Components/Alert";
import { red, green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const globalTheme = createTheme({
  palette: {
    success: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
  },
});

const lightTheme = createTheme({
  palette: {
    success: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
    restart: {
      main: "#0a1929",
      light: "#FFFFFF",
      dark: "#465161",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
});

const darkTheme = createTheme({
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
  },
});

function App() {
  return (
    <Container>
      <ThemeProvider theme={darkTheme}>
        <Navbar />
        <ModuleByRoute />
        <Alert />
      </ThemeProvider>
    </Container>
  );
}

function ModuleByRoute() {
  return (
    <Switch>
      <Route path="/receive/:id">
        <ModuleContainer open={1} />
      </Route>
      <Route path="/receive">
        <ModuleContainer open={1} />
      </Route>
      <Route path="/send">
        <ModuleContainer open={0} />
      </Route>
      <Route path="/">
        <Redirect to="/send" />
      </Route>
    </Switch>
  );
}

export default App;
