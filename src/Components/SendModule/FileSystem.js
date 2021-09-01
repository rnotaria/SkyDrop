import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { addNewFiles } from "../../utils/helperFuncs";
import FileList from "./FileList";

// Need to use styled component because Material-Ui Box does not support pointer: cursor?
const FileSystemContainer = styled.div`
  margin-top: 24px;
  width: 80%;
  height: 50%;
  border: 1px solid #aaaaaa;
  filter: brightness(100%);
  background-color: white;
  transition: 0.3s;
  margin-bottom: 24px;
  overflow-y: auto;
  user-select: none;
`;

function FileSystem({ files, setFiles, setError }) {
  //#region Dropzone
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(addNewFiles([...files], acceptedFiles, setError));
    },
    [files, setFiles, setError]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop,
  });
  //#endregion

  return (
    <FileSystemContainer {...getRootProps()}>
      <input {...getInputProps()} />
      <FileList files={files} setFiles={setFiles} openFileDialog={open} />
    </FileSystemContainer>
  );
}

export default FileSystem;
