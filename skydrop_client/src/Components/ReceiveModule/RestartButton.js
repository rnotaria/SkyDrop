import React from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../reducers/receiveFilesReducer";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";

function RestartButton() {
  const dispatch = useDispatch();

  return (
    <Button
      style={{ margin: "8px", marginBottom: "48px" }}
      variant="contained"
      color="default"
      startIcon={<LoopIcon />}
      onClick={() => dispatch(reset())}
    >
      Restart
    </Button>
  );
}

export default RestartButton;
