import React from "react";
import { useDispatch } from "react-redux";
import { resetSendAddress } from "../../reducers/dataReducer";
import Button from "@mui/material/Button";
import LoopIcon from "@mui/icons-material/Loop";

function RestartButton() {
  const dispatch = useDispatch();
  return (
    <Button
      style={{ margin: "24px", marginBottom: "48px" }}
      variant="contained"
      startIcon={<LoopIcon />}
      onClick={() => dispatch(resetSendAddress())}
    >
      Restart
    </Button>
  );
}

export default RestartButton;
