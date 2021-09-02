import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import FileList from "./FileList";
import DropFilesHere from "./DropFilesHere";
import { addNewFiles } from "../../utils/helperFuncs";

const Container = styled.div`
  position: relative;
  margin-top: 24px;
  width: 80%;
  height: 50%;
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

export default FileSystem;
