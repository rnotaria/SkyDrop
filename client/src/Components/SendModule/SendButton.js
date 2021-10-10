import React, { useState } from "react";
import { useDispatch } from "react-redux";
import sendService from "../../services/sendService";
import constants from "../../utils/constants";
import { getTotalSize } from "../../utils/helperFuncs";
import {
  noFiles,
  sizeTooLarge,
  tooManyFiles,
  generalError,
  filesSent,
  rateLimit,
} from "../../reducers/alertReducer";
import { resetSend } from "../../reducers/sendFilesReducer";
import { setSendAddress } from "../../reducers/dataReducer";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/SendRounded";

function SendButton({ files }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const send = () => {
    if (files.length === 0) {
      dispatch(noFiles());
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
        dispatch(filesSent());
        dispatch(setSendAddress(res.data.Address));
        setLoading(false);
        setTimeout(() => {
          dispatch(resetSend());
        }, 500);
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          dispatch(rateLimit);
        } else {
          dispatch(generalError());
        }
        setLoading(false);
        return;
      });
  };

  return (
    <LoadingButton
      style={{ margin: "24px" }}
      variant="contained"
      endIcon={<SendIcon />}
      onClick={send}
      loading={loading}
      loadingPosition="end"
    >
      Send
    </LoadingButton>
  );
}

export default SendButton;
