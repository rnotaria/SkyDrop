import React from "react";
import FileList from "./FileList";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";
import DownloadAll from "./DownloadAll";

const tempFileList = [{ name: "file1", size: 11485760 }];

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

function FileSystem() {
  return (
    <React.Fragment>
      <FileListContainer>
        <FileList files={tempFileList} />
      </FileListContainer>
      <DownloadAll />
      <Restart />
    </React.Fragment>
  );
}

function Restart({ close }) {
  return (
    <Button
      style={{ margin: "8px", marginBottom: "48px" }}
      variant="contained"
      color="default"
      startIcon={<LoopIcon />}
    >
      Restart
    </Button>
  );
}

export default FileSystem;
