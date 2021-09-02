import React, { useState, useEffect } from "react";
import FileSystem from "./FileSystem";
import ProgressBar from "../ProgressBar";
import Alert from "../Alert";
import { getTotalSize, convertToMB } from "../../utils/helperFuncs";
import constants from "../../utils/constants";
import SendButton from "./SendButton";

function SendModule() {
  const [files, setFiles] = useState([]);
  const [size, setSize] = useState(0);
  const [error, setError] = useState();

  useEffect(() => {
    setSize(getTotalSize([...files]));
  }, [files, size]);

  const handleSetFiles = (e) => {
    setFiles(e);
  };

  const handleSetError = (e) => {
    setError(e);
  };

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
      <FileSystem
        files={files}
        setFiles={handleSetFiles}
        setError={handleSetError}
      />
      <Alert error={error} handleSetError={handleSetError} />
      <ProgressBar {...sizeProgressProps} />
      <ProgressBar {...fileCountProgressProps} />
      <SendButton />
    </React.Fragment>
  );
}

export default SendModule;
