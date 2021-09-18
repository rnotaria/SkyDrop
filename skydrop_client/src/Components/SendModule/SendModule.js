import React, { useRef } from "react";
import { useStore } from "react-redux";
import FileSystem from "./FileSystem";
import Address from "./Address";
import Slide from "@mui/material/Slide";
import styled from "styled-components";

const ModuleContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flexdirection: column;
  alignitems: center;
  overflow: hidden;
`;

function SendModule() {
  const store = useStore();
  const files = store.getState().sendFiles;
  const address = store.getState().data.sendAddress;

  const containerRef = useRef(null);

  return (
    <ModuleContainer ref={containerRef}>
      <Slide
        in={address ? false : true}
        direction="right"
        container={containerRef.current}
      >
        <FileSystem files={files} />
      </Slide>
      <Slide
        in={address ? true : false}
        direction="right"
        container={containerRef.current}
      >
        <Address address={address} />
      </Slide>
    </ModuleContainer>
  );
}

export default SendModule;
