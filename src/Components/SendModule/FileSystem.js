import React, { useState, useCallback } from "react";
import Alert from "../Alert";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { addNewFiles } from "../../utils/helperFuncs";

// Need to use styled component because Material-Ui Box does not support pointer: cursor?
const FileSystemContainer = styled.div`
  margin-top: 24px;
  width: 80%;
  height: 40%;
  cursor: pointer;
  border: 1px solid #aaaaaa;
  border-radius: 4px;
  filter: brightness(100%);
  background-color: white;
  transition: 0.3s;

  &:hover {
    filter: brightness(90%);
    transition: 0.3s;
  }
`;

function FileSystem() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState();

  console.log(files);

  const handleSetError = (e) => {
    setError(e);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(addNewFiles(files, acceptedFiles, handleSetError));
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    onDrop,
  });

  return (
    <React.Fragment>
      <FileSystemContainer {...getRootProps()}>
        <input {...getInputProps()} />
        hi
      </FileSystemContainer>
      <Alert error={error} handleSetError={handleSetError} />
    </React.Fragment>
  );
}

export default FileSystem;
