import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { addNewFiles } from "../../utils/helperFuncs";
import FileList from "./FileList";

// Need to use styled component because Material-Ui Box does not support pointer: cursor?
const Container = styled.div`
  position: relative;
  margin-top: 24px;
  width: 80%;
  height: 60%;
  border: 1px solid #aaaaaa;
  background-color: white;
  margin-bottom: 24px;
  overflow-y: auto;
  user-select: none;
  transition: 0.3s;
  ${(props) => (props.isDragActive ? { filter: "brightness(90%)" } : null)};
`;

const Inner = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const DropFilesHere = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FileSystem({ files, setFiles, setError }) {
  //#region Dropzone
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(addNewFiles([...files], acceptedFiles, setError));
    },
    [files, setFiles, setError]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    onDrop,
  });
  //#endregion

  return (
    <Container isDragActive={isDragActive} {...getRootProps()}>
      <input {...getInputProps()} />
      <FileList files={files} setFiles={setFiles} openFileDialog={open} />
    </Container>
  );
}

// function DropFilesHere() {
//   return <DropFilesHereContainer>Drop Files Here</DropFilesHereContainer>;
// }

export default FileSystem;
