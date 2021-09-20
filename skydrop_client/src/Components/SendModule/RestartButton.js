import React from "react";
import { useDispatch } from "react-redux";
import { resetSendAddress } from "../../reducers/dataReducer";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { styled as muiStyled } from "@mui/material/styles";

function RestartButton() {
  const dispatch = useDispatch();

  const StyledButton = muiStyled(Button)(() => ({
    color: "white",
    backgroundColor: "#64748B",
    "&:hover": {
      backgroundColor: "#465161",
    },
  }));

  return (
    <StyledButton
      style={{ margin: "24px", marginBottom: "48px" }}
      variant="contained"
      endIcon={<RestartAltIcon />}
      onClick={() => dispatch(resetSendAddress())}
    >
      Restart
    </StyledButton>
  );
}

export default RestartButton;
