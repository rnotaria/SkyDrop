import React from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../reducers/receiveFilesReducer";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function RestartButton() {
  const dispatch = useDispatch();

  return (
    <Button
      style={{ margin: "8px", marginBottom: "48px" }}
      variant="contained"
      endIcon={<RestartAltIcon />}
      onClick={() => dispatch(reset())}
    >
      Restart
    </Button>
  );
}

export default RestartButton;
