import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/SendRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { getTotalSize } from "../../utils/helperFuncs";
import constants from "../../utils/constants";
import { useDispatch } from "react-redux";
import {
  missingFiles,
  sizeTooLarge,
  tooManyFiles,
  generalError,
} from "../../reducers/alertReducer";
import { removeAllFilesToSend } from "../../reducers/filesToSendReducer";
import sendService from "../../services/sendService";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function SendButton({ files, setAddress, openAddress }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const send = () => {
    if (files.length < 1) {
      dispatch(missingFiles());
      return;
    }

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
        // setTimeout(() => {
        //   dispatch(removeAllFilesToSend());
        // }, 500);
      })
      .catch((e) => {
        dispatch(generalError());
        setLoading(false);
        return;
      });
  };

  return (
    <Box
      style={{
        height: "50px",
        margin: "24px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
          onClick={send}
        >
          Send
        </Button>
      )}
    </Box>
  );
}

export default SendButton;
