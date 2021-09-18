import React from "react";
import { useStore } from "react-redux";
import AddressForm from "./AddressForm";
import FileSystem from "./FileSystem";

function ReceiveModule() {
  const store = useStore();
  const files = store.getState().receiveFiles;
  const words = store.getState().data.receiveWords;

  return (
    <React.Fragment>
      <AddressForm words={words} />
      <FileSystem files={files} />
    </React.Fragment>
  );
}

export default ReceiveModule;
