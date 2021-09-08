import ModuleContainer from "./Components/ModuleContainer";
import styles from "./styles/styles.module.css";
import Alert from "./Components/Alert";

function App() {
  return (
    <div className={styles.centeredDiv}>
      <ModuleContainer />
      <Alert />
    </div>
  );
}

export default App;
