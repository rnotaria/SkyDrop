import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ModuleContainer from "./Components/ModuleContainer";
import Alert from "./Components/Alert";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./utils/themes";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Navbar />
        <ModuleByRoute />
        <Alert />
      </Container>
    </ThemeProvider>
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
