import React from "react";
import { useStore } from "react-redux";
import AddressForm from "./AddressForm";
import FileSystem from "./FileSystem";

function ReceiveModule() {
  const store = useStore();
  const files = store.getState().receiveFiles;

  return (
    <React.Fragment>
      <AddressForm />
      <FileSystem files={files} />
    </React.Fragment>
  );
}

export default ReceiveModule;
