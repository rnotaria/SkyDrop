import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { addNewFiles, removeFile } from "../../utils/helperFuncs";

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
  margin-bottom: 24px;

  &:hover {
    filter: brightness(90%);
    transition: 0.3s;
  }
`;

function FileSystem({ files, setFiles, setError }) {
  //#region Dropzone
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(addNewFiles([...files], acceptedFiles, setError));
    },
    [files, setFiles, setError]
  );

  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    onDrop,
  });
  //#endregion

  return (
    <FileSystemContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {files.map((f) => (
        <div key={f.name}>
          <button onClick={() => setFiles(removeFile(files, f.name))}>
            {f.name}
          </button>
        </div>
      ))}
    </FileSystemContainer>
  );
}

export default FileSystem;
