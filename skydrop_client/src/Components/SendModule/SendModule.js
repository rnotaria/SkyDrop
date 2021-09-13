import React, { useState } from "react";
import { useStore } from "react-redux";
import FileSystem from "./FileSystem";
import Address from "./Address";

function SendModule() {
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState(null);

  const store = useStore();
  const files = store.getState().sendFiles;

  return (
    <React.Fragment>
      <FileSystem
        files={files}
        openAddress={() => setShowAddress(true)}
        setAddress={(v) => setAddress(v)}
      />
      <Address
        address={address}
        isActive={showAddress}
        close={() => setShowAddress(false)}
      />
    </React.Fragment>
  );
}

export default SendModule;
