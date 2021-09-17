import React from "react";
import { useDispatch } from "react-redux";
import { resetSendAddress } from "../../reducers/dataReducer";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";

function RestartButton() {
  const dispatch = useDispatch();
  return (
    <Button
      style={{ margin: "24px", marginBottom: "48px" }}
      variant="contained"
      color="default"
      startIcon={<LoopIcon />}
      onClick={() => dispatch(resetSendAddress())}
    >
      Restart
    </Button>
  );
}

export default RestartButton;
