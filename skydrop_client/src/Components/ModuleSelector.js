import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  tabs: {
    backgroundColor: "#F5F5F5",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "#E5E5E5",
    },
  },
}));

function ModuleSelector({ value, handleChangeValue }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={1}>
        <Tabs
          value={value}
          onChange={handleChangeValue}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Send" className={classes.tabs} />
          <Tab label="Receive" className={classes.tabs} />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default ModuleSelector;
