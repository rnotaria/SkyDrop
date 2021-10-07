import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SendModule from "./SendModule/SendModule";
import ReceiveModule from "./ReceiveModule/ReceiveModule";
import ModuleSelector from "./ModuleSelector";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";

// Keep height/width golden ratio
const Container = styled("div")(
  ({ theme }) => `
  border: 1px solid ${theme.palette.border.primary};
  margin: 48px;
  position: relative;
  min-height: 600px;
  min-width: 371px;
  height: 60vh;
  width: 37.1vh;
  max-width: 100vw;

  display: flex;
  flex-direction: column;
`
);

const MobileContainer = styled("div")(
  ({ theme }) => `
  border: 1px solid ${theme.palette.border.primary};
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
);

const StyledBox = styled(Box)(
  ({ theme }) => `
  position: absolute;
  height: calc(100% - 48px); // account for TabPanel
  width: 100%;
  margin-top: 48px;
  background: ${theme.palette.background.first};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 0;
  box-shadow: ${theme.shadows[4]}
  `
);

function ModuleContainer({ open }) {
  const [value, setValue] = useState(open);
  const [openSend, setOpenSend] = useState(false);
  const [openReceive, setOpenReceive] = useState(false);
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 450px), (max-height: 700px)");

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

  return isMobile ? (
    <MobileContainer>
      <ModuleSelector value={value} handleChangeValue={handleChangeValue} />
      <StyledBox>
        <SendModule open={openSend} />
        <ReceiveModule open={openReceive} />
      </StyledBox>
    </MobileContainer>
  ) : (
    <Container>
      <ModuleSelector value={value} handleChangeValue={handleChangeValue} />
      <StyledBox>
        <SendModule open={openSend} />
        <ReceiveModule open={openReceive} />
      </StyledBox>
    </Container>
  );
}

export default ModuleContainer;
