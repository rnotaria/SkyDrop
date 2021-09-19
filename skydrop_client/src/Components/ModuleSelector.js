import React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled as muiStyled } from "@mui/material/styles";
import styled from "styled-components";

const Container = styled.div`
  width: "100%";
`;

const StyledTab = muiStyled(Tab)({
  backgroundColor: "#F5F5F5",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: "#E5E5E5",
  },
});

function ModuleSelector({ value, handleChangeValue }) {
  return (
    <Container>
      <AppBar position="static" color="default" elevation={1}>
        <Tabs
          value={value}
          onChange={handleChangeValue}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <StyledTab label="Send" />
          <StyledTab label="Receive" />
        </Tabs>
      </AppBar>
    </Container>
  );
}

export default ModuleSelector;
