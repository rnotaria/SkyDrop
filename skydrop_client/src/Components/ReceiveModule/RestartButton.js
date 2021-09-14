import React from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../reducers/receiveFilesReducer";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";

function RestartButton({ close }) {
  const dispatch = useDispatch();

  const onClose = () => {
    close();
    dispatch(reset());
  };

  return (
    <Button
      style={{ margin: "8px", marginBottom: "48px" }}
      variant="contained"
      color="default"
      startIcon={<LoopIcon />}
      onClick={onClose}
    >
      Restart
    </Button>
  );
}

export default RestartButton;
