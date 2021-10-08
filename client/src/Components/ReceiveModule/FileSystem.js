import React, { useState } from "react";
import FileList from "./FileList";
import ImagePreview from "./ImagePreview";
import RestartButton from "./RestartButton";
import DownloadAllButton from "./DownloadAllButton";
import { styled } from "@mui/material/styles";

const Container = styled("div")(
  ({ theme }) => `
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
);

const FileListContainer = styled("div")(
  ({ theme }) => `
  background: ${theme.palette.background.second};
  border: 1px solid ${theme.palette.border.primary};
  position: relative;
  width: 80%;
  margin-top: 24px;
  margin-bottom: 24px;
  flex: 1 1 auto;
  overflow-y: auto;
  user-select: none;
`
);

const FileSystem = React.forwardRef(({ files }, ref) => {
  const [image, setImage] = useState(null);

  return (
    <Container ref={ref}>
      <FileListContainer>
        <FileList files={files.files} setImage={setImage} />
        <ImagePreview image={image} resetImage={() => setImage(null)} />
      </FileListContainer>
      <DownloadAllButton zipFile={files.zipFile} />
      <RestartButton />
    </Container>
  );
});

export default FileSystem;
