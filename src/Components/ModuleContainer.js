import React, { useState } from "react";
import SendModule from "./SendModule/SendModule";
import ReceiveModule from "./ReceiveModule/ReceiveModule";
import TabPanel from "./TabPanel";
import styled from "styled-components";
import styles from "../styles/styles.module.css";
import Box from "@material-ui/core/Box";

// const styles = {
//   boxShadow: 1,
//   // width: "500px",
//   height: "100%",
// };

const Container = styled.div`
  width: 500px;
  background: beige;
`;

function ModuleContainer() {
  const [value, setValue] = useState(0);

  const handleChangeValue = (e, newValue) => {
    setValue(newValue);
  };

  const module = value === 0 ? <SendModule /> : <ReceiveModule />;

  return (
    <div className={styles.moduleContainer}>
      <TabPanel value={value} handleChangeValue={handleChangeValue} />
      <Box>{module}</Box>
    </div>
  );
}

export default ModuleContainer;
