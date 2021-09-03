import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import FileList from "./FileList";
import DropFilesHere from "./DropFilesHere";
import { containsDupes } from "../../utils/helperFuncs";
import { useDispatch } from "react-redux";
import { duplicateFileError } from "../../reducers/alertReducer";
import { addFilesToSend } from "../../reducers/filesToSendReducer";

const Container = styled.div`
  position: relative;
  margin-top: 24px;
  width: 80%;
  flex: 1 1 auto;
  overflow-y: auto;
  border: 1px solid #aaaaaa;
  background-color: white;
  margin-bottom: 24px;
  user-select: none;
  transition: 0.5s;
  ${(props) => (props.isDragActive ? { filter: "brightness(70%)" } : null)};
`;

const FileListContainer = styled.div``;

function FileSystem({ files }) {
  const dispatch = useDispatch();

  //#region Dropzone
  const onDrop = useCallback(
    (newFiles) => {
      if (containsDupes(files, newFiles)) {
        dispatch(duplicateFileError());
      }
      dispatch(addFilesToSend(newFiles));
    },
    [files, dispatch]
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
        <FileList files={files} openFileDialog={open} />
      </FileListContainer>
    </Container>
  );
}

export default FileSystem;
