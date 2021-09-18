import React from "react";
import { useStore } from "react-redux";
import FileSystem from "./FileSystem";
import Address from "./Address";
import Slide from "@mui/material/Slide";

function SendModule() {
  const store = useStore();
  const files = store.getState().sendFiles;
  const address = store.getState().data.sendAddress;

  return (
    // <Slide in={false} direction="right">
    <React.Fragment>
      <FileSystem files={files} />
      <Address address={address} />
    </React.Fragment>

    //</Slide>
  );
}

export default SendModule;
