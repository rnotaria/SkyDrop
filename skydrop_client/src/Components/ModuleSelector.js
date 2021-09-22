import React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

const Container = styled("div")(`
  width: "100%";
`);

const StyledTab = styled(Tab)(
  ({ theme }) => `
  transition: 0.2s;
  border-bottom: 1px solid ${theme.palette.border.primary};
  background: ${theme.palette.tab.primary};
  &:hover {
    background: ${theme.palette.tab.secondary};
  }
`
);

function ModuleSelector({ value, handleChangeValue }) {
  return (
    <Container>
      <AppBar position="static" color="default" elevation={4}>
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
