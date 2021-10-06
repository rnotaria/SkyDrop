import React, { useRef } from "react";
import { useStore } from "react-redux";
import FileSystem from "./FileSystem";
import Address from "./Address";
import Slide from "@mui/material/Slide";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: ${(props) =>
    props.open ? 1 : 0}; // Need to render in front of receive module
  overflow: hidden; // For sliding animation when switching modules
`;

function SendModule({ open }) {
  const store = useStore();
  const files = store.getState().sendFiles;
  const address = store.getState().data.sendAddress;

  const containerRef = useRef(null);

  return (
    <Container open={open}>
      <Slide
        in={!address && open ? true : false}
        direction="right"
        container={containerRef.current}
        mountOnEnter
        unmountOnExit
      >
        <FileSystem files={files} />
      </Slide>
      <Slide
        in={address && open ? true : false}
        direction="right"
        container={containerRef.current}
        mountOnEnter
        unmountOnExit
      >
        <Address address={address} />
      </Slide>
    </Container>
  );
}

export default SendModule;
