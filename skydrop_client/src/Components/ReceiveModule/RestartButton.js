import React from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../reducers/receiveFilesReducer";
import Button from "@mui/material/Button";
import LoopIcon from "@mui/icons-material/Loop";

function RestartButton() {
  const dispatch = useDispatch();

  return (
    <Button
      style={{ margin: "8px", marginBottom: "48px" }}
      variant="contained"
      startIcon={<LoopIcon />}
      onClick={() => dispatch(reset())}
    >
      Restart
    </Button>
  );
}

export default RestartButton;
