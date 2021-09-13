import React, { useState } from "react";
import { useDispatch } from "react-redux";
import sendService from "../../services/sendService";
import constants from "../../utils/constants";
import { getTotalSize } from "../../utils/helperFuncs";
import {
  sizeTooLarge,
  tooManyFiles,
  generalError,
} from "../../reducers/alertReducer";
import { removeAllFilesToSend } from "../../reducers/filesToSendReducer";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/SendRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  margin: 24px;
  display: flex;
  align-items: center;
`;

function SendButton({ files, setAddress, openAddress }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const send = () => {
    const size = getTotalSize(files);
    if (size > constants.MAX_UPLOAD_SIZE) {
      dispatch(sizeTooLarge());
      return;
    }

    if (files.length > constants.MAX_NUM_OF_FILES) {
      dispatch(tooManyFiles());
      return;
    }

    setLoading(true);
    sendService
      .send(files)
      .then((res) => {
        setAddress(res.data.Address);
        openAddress();
        setLoading(false);
        setTimeout(() => {
          dispatch(removeAllFilesToSend());
        }, 500);
      })
      .catch((e) => {
        dispatch(generalError());
        setLoading(false);
        return;
      });
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          disabled={files.length === 0}
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={send}
        >
          Send
        </Button>
      )}
    </Container>
  );
}

export default SendButton;
