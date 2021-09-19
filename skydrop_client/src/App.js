import { Switch, Route } from "react-router-dom";
import ModuleContainer from "./Components/ModuleContainer";
import Alert from "./Components/Alert";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <Container>
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
    </Container>
  );
}

export default App;
