import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SendModule from "./SendModule/SendModule";
import ReceiveModule from "./ReceiveModule/ReceiveModule";
import ModuleSelector from "./ModuleSelector";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Container = styled("div")(
  ({ theme }) => `
  margin: 48px;
  position: relative;
  min-height: 600px;
  min-width: 371px;
  height: 60vh;
  width: 37.1vh;

  display: flex;
  flex-direction: column;
`
);

const boxStyle = {
  position: "absolute",
  height: "calc(100% - 48px)", // account for TabPanel
  width: "100%",
  marginTop: "48px",
  boxShadow: 3,
  bgcolor: "background.first",
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
  const history = useHistory();

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
    history.push(newValue === 0 ? "/send" : "/receive");
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
