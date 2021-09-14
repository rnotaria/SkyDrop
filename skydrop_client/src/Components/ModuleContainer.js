import React, { useState } from "react";
import SendModule from "./SendModule/SendModule";
import ReceiveModule from "./ReceiveModule/ReceiveModule";
import ModuleSelector from "./ModuleSelector";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

const Container = styled.div`
  min-height: 600px;
  min-width: 400px;
  width: 61.8vh;
  height: 80vh;
  max-width: 80vw;
  display: flex;
  flex-direction: column;
`;

const contentStyle = {
  position: "relative",
  height: "calc(100% - 65px)", // account for TabPanel
  padding: 1,
  boxShadow: 2,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function ModuleContainer() {
  const [value, setValue] = useState(0);

  const handleChangeValue = (_e, newValue) => {
    setValue(newValue);
  };

  const module = value === 0 ? <SendModule /> : <ReceiveModule />;

  return (
    <Container>
      <ModuleSelector value={value} handleChangeValue={handleChangeValue} />
      <Box {...contentStyle}>{module}</Box>
    </Container>
  );
}

export default ModuleContainer;
