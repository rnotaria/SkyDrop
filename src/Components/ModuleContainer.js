import React, { useState } from "react";
import SendModule from "./SendModule/SendModule";
import ReceiveModule from "./ReceiveModule/ReceiveModule";
import TabPanel from "./TabPanel";
import Box from "@material-ui/core/Box";

const moduleContainerStyle = {
  minWidth: "400px",
  width: "40vw",
  height: "60vh",
  display: "flex",
  flexDirection: "column",
};

const moduleContentStyle = {
  boxShadow: 1,
  bgcolor: "background.paper",
  padding: 1,
  flexGrow: 1,
};

function ModuleContainer() {
  const [value, setValue] = useState(0);

  const handleChangeValue = (e, newValue) => {
    setValue(newValue);
  };

  const module = value === 0 ? <SendModule /> : <ReceiveModule />;

  return (
    <Box {...moduleContainerStyle}>
      <TabPanel value={value} handleChangeValue={handleChangeValue} />
      <Box {...moduleContentStyle}>{module}</Box>
    </Box>
  );
}

export default ModuleContainer;
