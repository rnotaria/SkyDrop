import React, { useState } from "react";
import { useStore } from "react-redux";
import AddressForm from "./AddressForm";
import FileSystem from "./FileSystem";

function ReceiveModule() {
  const [showFileSystem, setShowFileSystem] = useState(false);

  const store = useStore();
  const files = store.getState().receiveFiles;

  return (
    <React.Fragment>
      <AddressForm openFileSystem={() => setShowFileSystem(true)} />
      <FileSystem
        files={files}
        isActive={showFileSystem}
        close={() => setShowFileSystem(false)}
      />
    </React.Fragment>
  );
}

export default ReceiveModule;
