import React from "react";
import FileList from "./FileList";
import RestartButton from "./RestartButton";
import DownloadAllButton from "./DownloadAllButton";
import Slide from "@material-ui/core/Slide";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 0;
`;

const FileListContainer = styled.div`
  position: relative;
  width: 80%;
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid #aaaaaa;
  background-color: white;
  flex: 1 1 auto;
  overflow-y: auto;
  user-select: none;
`;

function FileSystem({ files }) {
  return (
    <Slide in={files.files.length > 0} direction="up">
      <Container>
        <FileListContainer>
          <FileList files={files.files} />
        </FileListContainer>
        <DownloadAllButton zipFile={files.zipFile} />
        <RestartButton />
      </Container>
    </Slide>
  );
}

export default FileSystem;
