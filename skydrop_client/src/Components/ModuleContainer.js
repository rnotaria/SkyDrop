import React, { useState, useEffect } from "react";
import SendModule from "./SendModule/SendModule";
import ReceiveModule from "./ReceiveModule/ReceiveModule";
import ModuleSelector from "./ModuleSelector";
import Box from "@mui/material/Box";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  min-height: 600px;
  min-width: 371px;
  height: 60vh;
  width: 37.1vh;

  display: flex;
  flex-direction: column;
`;

const boxStyle = {
  position: "absolute",
  height: "calc(100% - 48px)", // account for TabPanel
  width: "100%",
  marginTop: "48px",
  boxShadow: 2,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 0,
  overflow: "hidden",
};

function ModuleContainer({ open }) {
  const [value, setValue] = useState(open);
  const [openSend, setOpenSend] = useState(false);
  const [openReceive, setOpenReceive] = useState(false);

  useEffect(() => {
    if (value === 0) {
      setOpenReceive(false);
      setOpenSend(true);
    } else {
      setOpenSend(false);
      setOpenReceive(true);
    }
  }, [value, setOpenSend, setOpenReceive]);

  const handleChangeValue = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <ModuleSelector value={value} handleChangeValue={handleChangeValue} />
      <Box {...boxStyle}>
        <SendModule open={openSend} />
        <ReceiveModule open={openReceive} />
      </Box>
    </Container>
  );
}

export default ModuleContainer;
