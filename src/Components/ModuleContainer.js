import React, { useState } from "react";
import SendModule from "./SendModule/SendModule";
import ReceiveModule from "./ReceiveModule/ReceiveModule";
import TabPanel from "./TabPanel";
import Box from "@material-ui/core/Box";

const containerStyle = {
  width: "40%",
  height: "80%",
  display: "flex",
  flexDirection: "column",
};

const contentStyle = {
  height: "calc(100% - 100px)", // account for TabPanel
  padding: 1,
  boxShadow: 2,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function ModuleContainer() {
  const [value, setValue] = useState(0);

  const handleChangeValue = (e, newValue) => {
    setValue(newValue);
  };

  const module = value === 0 ? <SendModule /> : <ReceiveModule />;

  return (
    <Box {...containerStyle}>
      <TabPanel value={value} handleChangeValue={handleChangeValue} />
      <Box {...contentStyle}>{module}</Box>
    </Box>
  );
}

export default ModuleContainer;
