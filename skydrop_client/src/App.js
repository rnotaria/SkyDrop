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
      <ModuleContainer />
      <Alert />
    </Container>
  );
}

export default App;
