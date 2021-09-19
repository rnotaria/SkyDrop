import React from "react";
import { useDispatch } from "react-redux";
import { resetSendAddress } from "../../reducers/dataReducer";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function RestartButton() {
  const dispatch = useDispatch();

  return (
    <Button
      style={{ margin: "24px", marginBottom: "48px" }}
      variant="contained"
      endIcon={<RestartAltIcon />}
      onClick={() => dispatch(resetSendAddress())}
    >
      Restart
    </Button>
  );
}

export default RestartButton;
