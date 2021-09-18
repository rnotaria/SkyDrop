import React, { useState, useEffect } from "react";
import Zoom from "@mui/material/Zoom";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function DropFilesHere({ isDragActive }) {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    if (isDragActive) {
      setDisplay(true);
    } else if (!isDragActive) {
      setTimeout(() => {
        setDisplay(false);
      }, 250);
    }
  }, [display, isDragActive]);

  if (!display) return null;
  return (
    <Container>
      <Zoom in={isDragActive} timeout={{ enter: 250, exit: 250 }}>
        <Typography variant="h5" style={{ color: "#aaa" }}>
          Drop files here
        </Typography>
      </Zoom>
    </Container>
  );
}

export default DropFilesHere;
