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
import { removeAllFiles } from "../../reducers/sendFilesReducer";
import { setSendAddress } from "../../reducers/dataReducer";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/SendRounded";

function SendButton({ files }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
        dispatch(setSendAddress(res.data.Address));
        setLoading(false);
        setTimeout(() => {
          dispatch(removeAllFiles());
        }, 500);
      })
      .catch((_e) => {
        dispatch(generalError());
        setLoading(false);
        return;
      });
  };

  return (
    <LoadingButton
      style={{ margin: "24px" }}
      disabled={files.length === 0}
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
