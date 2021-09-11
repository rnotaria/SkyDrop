import React, { useState } from "react";
import FileSystem from "./FileSystem";
import ProgressBar from "./ProgressBar";
import SendButton from "./SendButton";
import Address from "./Address";
import { getTotalSize, convertToMB } from "../../utils/helperFuncs";
import constants from "../../utils/constants";
import { useStore } from "react-redux";

function SendModule() {
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState(null);

  const store = useStore();
  const files = store.getState().filesToSend;
  const size = getTotalSize(files);

  const sizeProgressProps = {
    title: "Size",
    label:
      convertToMB(size).toFixed(2) +
      "/" +
      convertToMB(constants.MAX_UPLOAD_SIZE).toFixed(2) +
      " MB",
    value: (size / constants.MAX_UPLOAD_SIZE) * 100,
  };

  const fileCountProgressProps = {
    title: "File Count",
    label: files.length + "/" + constants.MAX_NUM_OF_FILES,
    value: (files.length / constants.MAX_NUM_OF_FILES) * 100,
  };

  return (
    <React.Fragment>
      <FileSystem files={files} />
      <ProgressBar {...sizeProgressProps} />
      <ProgressBar {...fileCountProgressProps} />
      <SendButton
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
