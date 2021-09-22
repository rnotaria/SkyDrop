import React from "react";
import { useDispatch } from "react-redux";
import { resetAll } from "../reducers/dataReducer";
import { resetSend } from "../reducers/sendFilesReducer";
import { resetReceive } from "../reducers/receiveFilesReducer";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import styled from "styled-components";

const Spacer = styled.div`
  flex-grow: 1;
`;

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const goHome = () => {
    history.push("/");
    dispatch(resetAll());
    dispatch(resetSend());
    dispatch(resetReceive());
  };

  return (
    <AppBar
      position="static"
      style={{ userSelect: "none", background: "#64748B" }}
    >
      <Toolbar variant="dense">
        <SkyDrop goHome={goHome} />
        <Spacer />
        <Home goHome={goHome} />
        <Help />
        <GitHub />
        <Report />
      </Toolbar>
    </AppBar>
  );
}

function SkyDrop({ goHome }) {
  return (
    <Typography
      variant="h6"
      component="div"
      style={{ cursor: "pointer" }}
      onClick={goHome}
    >
      SkyDrop
    </Typography>
  );
}

function Home({ goHome }) {
  return (
    <Tooltip title={"Home"} arrow>
      <IconButton size="large" color="inherit" onClick={goHome}>
        <HomeIcon />
      </IconButton>
    </Tooltip>
  );
}

function Help() {
  return (
    <Tooltip title={"Help"} arrow>
      <IconButton size="large" color="inherit">
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
}

function GitHub() {
  return (
    <Tooltip title={"View source code"} arrow>
      <IconButton
        size="large"
        color="inherit"
        // onClick={() => {
        //   window.open("https://www.google.com");
        // }}
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  );
}

function Report() {
  return (
    <Tooltip title={"Report a bug"} arrow>
      <IconButton size="large" color="inherit">
        <BugReportIcon />
      </IconButton>
    </Tooltip>
  );
}

export default Navbar;
