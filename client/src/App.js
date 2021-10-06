import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Theme from "./Components/Theme";
import Navbar from "./Components/Navbar";
import ModuleContainer from "./Components/ModuleContainer";
import Alert from "./Components/Alert";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <Theme>
      <Container>
        <Navbar />
        <ModuleByRoute />
        <Alert />
      </Container>
    </Theme>
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
