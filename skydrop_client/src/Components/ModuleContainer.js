import React, { useState } from "react";
import SendModule from "./SendModule/SendModule";
import ReceiveModule from "./ReceiveModule/ReceiveModule";
import ModuleSelector from "./ModuleSelector";
import Box from "@material-ui/core/Box";

const containerStyle = {
  minHeight: "500px",
  minWidth: "400px",
  width: "40vw",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
};

const contentStyle = {
  position: "relative",
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
      <ModuleSelector value={value} handleChangeValue={handleChangeValue} />
      <Box {...contentStyle}>{module}</Box>
    </Box>
  );
}

export default ModuleContainer;
