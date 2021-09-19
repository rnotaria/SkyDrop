import React, { useRef } from "react";
import { useStore } from "react-redux";
import AddressForm from "./AddressForm";
import FileSystem from "./FileSystem";
import Slide from "@mui/material/Slide";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;
function ReceiveModule({ open }) {
  const store = useStore();
  const files = store.getState().receiveFiles;
  const words = store.getState().data.receiveWords;

  const containerRef = useRef(null);

  return (
    <Container>
      <Slide
        in={files.files.length <= 0 && open ? true : false}
        direction="left"
        container={containerRef.current}
        mountOnEnter
        unmountOnExit
      >
        <AddressForm words={words} />
      </Slide>
      <Slide
        in={files.files.length > 0 && open ? true : false}
        direction="left"
        container={containerRef.current}
        mountOnEnter
        unmountOnExit
      >
        <FileSystem files={files} />
      </Slide>
    </Container>
  );
}

export default ReceiveModule;
