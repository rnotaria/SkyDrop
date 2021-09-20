import { Switch, Route } from "react-router-dom";
import ModuleContainer from "./Components/ModuleContainer";
import Alert from "./Components/Alert";
import { red, green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
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

function App() {
  return (
    <Container>
      <ThemeProvider theme={globalTheme}>
        <Switch>
          <Route path="/receive/:id">
            <ModuleContainer open={1} />
          </Route>
          <Route path="/receive/">
            <ModuleContainer open={1} />
          </Route>
          <Route path="/">
            <ModuleContainer open={0} />
          </Route>
        </Switch>
        <Alert />
      </ThemeProvider>
    </Container>
  );
}

export default App;
