import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import SendModule from "./Components/SendModule/SendModule";
import ReceiveModule from "./Components/ReceiveModule/ReceiveModule";

function App() {
  return (
    <Switch>
      <Route path="/send">
        <SendModule />
      </Route>
      <Route path="/receive">
        <ReceiveModule />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
