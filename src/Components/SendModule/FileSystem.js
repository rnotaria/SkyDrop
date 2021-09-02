import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { addNewFiles } from "../../utils/helperFuncs";
import FileList from "./FileList";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";

// Need to use styled component because Material-Ui Box does not support pointer: cursor?
const Container = styled.div`
  position: relative;
  margin-top: 24px;
  width: 80%;
  height: 60%;
  border: 1px solid #aaaaaa;
  background-color: white;
  margin-bottom: 24px;
  user-select: none;
  transition: 0.5s;
  ${(props) => (props.isDragActive ? { filter: "brightness(70%)" } : null)};
`;

const FileListContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const DropFilesHereContainer = styled.div`
  position: absolute;
  z-index: 10;
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
      <DropFilesHere isDragActive={isDragActive} />
      <FileListContainer>
        <FileList files={files} setFiles={setFiles} openFileDialog={open} />
      </FileListContainer>
    </Container>
  );
}

function DropFilesHere({ isDragActive }) {
  if (!isDragActive) return null;
  return (
    <DropFilesHereContainer>
      <Zoom in={isDragActive} timeout={{ enter: 250, exit: 250 }}>
        <Typography variant="h5" style={{ color: "#aaa" }}>
          Drop files here
        </Typography>
      </Zoom>
    </DropFilesHereContainer>
  );
}

export default FileSystem;
