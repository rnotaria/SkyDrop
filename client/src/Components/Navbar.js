import React, { useState } from "react";
import { useStore, useDispatch } from "react-redux";
import { resetAll, toggleTheme } from "../reducers/dataReducer";
import { resetSend } from "../reducers/sendFilesReducer";
import { resetReceive } from "../reducers/receiveFilesReducer";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
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
  const useMenu = useMediaQuery("(max-width: 450px)");

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
        {useMenu ? <NavMenu goHome={goHome} /> : <NavToolbar goHome={goHome} />}
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

function NavToolbar({ goHome }) {
  return (
    <React.Fragment>
      <Home onClick={goHome} />
      <Theme />
      <Help />
      <GitHub />
      <Report />
    </React.Fragment>
  );
}

function NavMenu({ goHome }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const homeOnClick = () => {
    handleClose();
    goHome();
  };

  return (
    <React.Fragment>
      <Tooltip title={"Open menu"} arrow>
        <IconButton size="large" onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Home onClick={homeOnClick} menu={true} />
        <Theme onClick={handleClose} menu={true} />
        <Help onClick={handleClose} menu={true} />
        <GitHub onClick={handleClose} menu={true} />
        <Report onClick={handleClose} menu={true} />
      </Menu>
    </React.Fragment>
  );
}

function Home({ onClick, menu = false }) {
  if (menu) {
    return (
      <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem onClick={onClick}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
      </NavLink>
    );
  }

  return (
    <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <Tooltip title={"Home"} arrow>
        <IconButton size="large" onClick={onClick}>
          <HomeIcon />
        </IconButton>
      </Tooltip>
    </NavLink>
  );
}

function Theme({ onClick, menu = false }) {
  const store = useStore();
  const dispatch = useDispatch();
  const mode = store.getState().data.theme;

  const handleClick = () => {
    if (onClick) onClick();
    dispatch(toggleTheme());
  };

  if (menu) {
    return (
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          {mode ? <LightModeIcon /> : <DarkModeIcon />}
        </ListItemIcon>
        <ListItemText>Toggle theme</ListItemText>
      </MenuItem>
    );
  }

  return (
    <Tooltip title={"Toggle theme"} arrow>
      <IconButton size="large" onClick={handleClick}>
        {mode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

function Help({ onClick, menu = false }) {
  if (menu) {
    return (
      <a
        href="https://github.com/rnotaria/SkyDrop#demo"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={onClick}>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText>Help</ListItemText>
        </MenuItem>
      </a>
    );
  }

  return (
    <a
      href="https://github.com/rnotaria/SkyDrop#demo"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Tooltip title={"Help"} arrow>
        <IconButton size="large">
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </a>
  );
}

function GitHub({ onClick, menu = false }) {
  if (menu) {
    return (
      <a
        href="https://github.com/rnotaria/SkyDrop"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={onClick}>
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText>View source code</ListItemText>
        </MenuItem>
      </a>
    );
  }

  return (
    <a
      href="https://github.com/rnotaria/SkyDrop"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Tooltip title={"View source code"} arrow>
        <IconButton size="large">
          <GitHubIcon />
        </IconButton>
      </Tooltip>
    </a>
  );
}

function Report({ onClick, menu = false }) {
  if (menu) {
    return (
      <a
        href="https://github.com/rnotaria/SkyDrop/issues"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={onClick}>
          <ListItemIcon>
            <BugReportIcon />
          </ListItemIcon>
          <ListItemText>Report a bug</ListItemText>
        </MenuItem>
      </a>
    );
  }

  return (
    <a
      href="https://github.com/rnotaria/SkyDrop/issues"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Tooltip title={"Report a bug"} arrow>
        <IconButton size="large">
          <BugReportIcon />
        </IconButton>
      </Tooltip>
    </a>
  );
}

export default Navbar;
