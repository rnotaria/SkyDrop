import React from "react";
import { useDispatch } from "react-redux";
import FileList from "./FileList";
import { reset } from "../../reducers/receiveFilesReducer";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";
import DownloadAll from "./DownloadAll";
import Slide from "@material-ui/core/Slide";

const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: white;

  z-index: 0;
`;

const FileListContainer = styled.div`
  position: relative;
  margin-top: 24px;
  width: 80%;
  flex: 1 1 auto;
  overflow-y: auto;
  border: 1px solid #aaaaaa;
  background-color: white;
  margin-bottom: 24px;
  user-select: none;
`;

function FileSystem({ files, isActive, close }) {
  return (
    <Slide in={isActive} direction="up">
      <Container>
        <FileListContainer>
          <FileList files={files.files} />
        </FileListContainer>
        <DownloadAll zipFile={files.zipFile} />
        <Restart close={close} />
      </Container>
    </Slide>
  );
}

function Restart({ close }) {
  const dispatch = useDispatch();

  const onClose = () => {
    close();
    dispatch(reset());
  };

  return (
    <Button
      style={{ margin: "8px", marginBottom: "48px" }}
      variant="contained"
      color="default"
      startIcon={<LoopIcon />}
      onClick={onClose}
    >
      Restart
    </Button>
  );
}

export default FileSystem;
