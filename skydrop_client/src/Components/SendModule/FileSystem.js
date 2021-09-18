import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import FileList from "./FileList";
import DropFilesHere from "./DropFilesHere";
import ProgressBar from "./ProgressBar";
import SendButton from "./SendButton";
import constants from "../../utils/constants";
import {
  containsDupes,
  getTotalSize,
  convertToMB,
} from "../../utils/helperFuncs";
import { duplicateFileError } from "../../reducers/alertReducer";
import { addFiles } from "../../reducers/sendFilesReducer";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;
`;

const DragDropContainer = styled.div`
  position: relative;
  width: 80%;
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid #aaaaaa;
  background-color: white;
  flex: 1 1 auto;
  user-select: none;
  overflow-y: auto;

  transition: 0.5s;
  ${(props) => (props.isDragActive ? { filter: "brightness(70%)" } : null)};
`;

const FileListContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  user-select: none;
`;

const FileSystem = React.forwardRef(({ files }, ref) => {
  const dispatch = useDispatch();

  //#region react-dropzone
  const onDrop = useCallback(
    (newFiles) => {
      if (containsDupes(files, newFiles)) {
        dispatch(duplicateFileError());
      }
      dispatch(addFiles(newFiles));
    },
    [files, dispatch]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    onDrop,
  });
  //#endregion

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
    <Container ref={ref}>
      <DragDropContainer isDragActive={isDragActive} {...getRootProps()}>
        <input {...getInputProps()} />
        <DropFilesHere isDragActive={isDragActive} />
        <FileListContainer>
          <FileList files={files} openFileDialog={open} />
        </FileListContainer>
      </DragDropContainer>
      <ProgressBar {...sizeProgressProps} />
      <ProgressBar {...fileCountProgressProps} />
      <SendButton files={files} />
    </Container>
  );
});

export default FileSystem;
