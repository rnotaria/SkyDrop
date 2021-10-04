import React, { useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useStore } from "react-redux";
import { useDispatch } from "react-redux";
import { setAllReceiveWords } from "../../reducers/dataReducer";
import { getWords } from "../../utils/addressGenerator";
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
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const history = useHistory();
  const urlParams = useParams().id;

  useEffect(() => {
    if (urlParams) {
      history.push("/receive");
      dispatch(setAllReceiveWords(getWords(urlParams)));
    }
  }, [urlParams, history, dispatch]);

  const files = store.getState().receiveFiles;
  const words = store.getState().data.receiveWords;

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
