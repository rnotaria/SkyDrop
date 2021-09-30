import React from "react";
import { useStore, useDispatch } from "react-redux";
import { resetAll, toggleTheme } from "../reducers/dataReducer";
import { resetSend } from "../reducers/sendFilesReducer";
import { resetReceive } from "../reducers/receiveFilesReducer";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import { styled } from "@mui/material/styles";

const Spacer = styled("div")`
  flex-grow: 1;
`;

const StyledAppBar = styled(AppBar)(
  ({ theme }) => `
  position: static;
  user-select: none;
  background: ${theme.palette.navbar.primary};
  border-bottom: 1px solid ${theme.palette.border.primary};
  `
);

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
    <StyledAppBar>
      <Toolbar variant="dense">
        <SkyDrop goHome={goHome} />
        <Spacer />
        <Home goHome={goHome} />
        <Theme />
        <GitHub />
        <Report />
      </Toolbar>
    </StyledAppBar>
  );
}

function SkyDrop({ goHome }) {
  return (
    <Typography
      variant="h6"
      component="div"
      style={{ cursor: "pointer" }}
      onClick={goHome}
      color="text.primary"
    >
      SkyDrop
    </Typography>
  );
}

function Home({ goHome }) {
  return (
    <Tooltip title={"Home"} arrow>
      <IconButton size="large" onClick={goHome}>
        <HomeIcon />
      </IconButton>
    </Tooltip>
  );
}

function Theme() {
  const store = useStore();
  const dispatch = useDispatch();
  const mode = store.getState().data.theme;

  return (
    <Tooltip title={"Toggle theme"} arrow>
      <IconButton size="large" onClick={() => dispatch(toggleTheme())}>
        {mode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

function GitHub() {
  return (
    <Tooltip title={"View source code"} arrow>
      <IconButton
        size="large"
        onClick={() => {
          window.open("https://github.com/rnotaria/SkyDrop");
        }}
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  );
}

function Report() {
  return (
    <Tooltip title={"Report a bug"} arrow>
      <IconButton
        size="large"
        onClick={() => {
          window.open("https://github.com/rnotaria/SkyDrop/issues");
        }}
      >
        <BugReportIcon />
      </IconButton>
    </Tooltip>
  );
}

export default Navbar;