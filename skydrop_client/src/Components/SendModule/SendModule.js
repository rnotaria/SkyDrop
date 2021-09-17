import React from "react";
import { useStore } from "react-redux";
import FileSystem from "./FileSystem";
import Address from "./Address";

function SendModule() {
  const store = useStore();
  const files = store.getState().sendFiles;
  const address = store.getState().data.sendAddress;

  return (
    <React.Fragment>
      <FileSystem files={files} />
      <Address address={address} />
    </React.Fragment>
  );
}

export default SendModule;
