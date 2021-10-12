import React from "react";
import { useStore, useDispatch } from "react-redux";
import { resetAll, toggleTheme } from "../reducers/dataReducer";
import { resetSend } from "../reducers/sendFilesReducer";
import { resetReceive } from "../reducers/receiveFilesReducer";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import logo from "../utils/logo.png";
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

  const goHome = () => {
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
        <Help />
        <GitHub />
        {/* <Report /> */}
      </Toolbar>
    </StyledAppBar>
  );
}

function SkyDrop({ goHome }) {
  return (
    <NavLink to="/" style={{ textDecoration: "none", display: "flex" }}>
      <img
        src={logo}
        alt="logo"
        width="20"
        height="25"
        style={{ paddingTop: "4px", paddingRight: "4px" }}
      />
      <Typography
        variant="h6"
        component="div"
        style={{ cursor: "pointer" }}
        color="text.primary"
        onClick={goHome}
      >
        SkyDrop
      </Typography>
    </NavLink>
  );
}

function Home({ goHome }) {
  return (
    <NavLink to="/" style={{ textDecoration: "none" }}>
      <Tooltip title={"Home"} arrow>
        <IconButton size="large" onClick={goHome}>
          <HomeIcon />
        </IconButton>
      </Tooltip>
    </NavLink>
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

function Help() {
  return (
    <a
      href="https://github.com/rnotaria/SkyDrop#demo"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Tooltip title={"Help"} arrow>
        <IconButton size="large">
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </a>
  );
}

function GitHub() {
  return (
    <a
      href="https://github.com/rnotaria/SkyDrop"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Tooltip title={"View source code"} arrow>
        <IconButton size="large">
          <GitHubIcon />
        </IconButton>
      </Tooltip>
    </a>
  );
}

// function Report() {
//   return (
//     <a
//       href="https://github.com/rnotaria/SkyDrop/issues"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <Tooltip title={"Report a bug"} arrow>
//         <IconButton size="large">
//           <BugReportIcon />
//         </IconButton>
//       </Tooltip>
//     </a>
//   );
// }

export default Navbar;
