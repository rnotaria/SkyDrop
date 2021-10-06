import React from "react";
import { useDispatch } from "react-redux";
import { resetSendAddress } from "../../reducers/dataReducer";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { blueGrey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

function RestartButton() {
  const dispatch = useDispatch();

  const StyledButton = styled(Button)(
    ({ theme }) => `
    color: white;
    background: ${
      theme.palette.mode === "light" ? blueGrey[500] : blueGrey[700]
    };
    &:hover {
      background: ${
        theme.palette.mode === "light" ? blueGrey[700] : blueGrey[900]
      };
    }
  
    `
  );
  return (
    <StyledButton
      style={{ margin: "8px", marginBottom: "48px" }}
      variant="contained"
      endIcon={<RestartAltIcon />}
      onClick={() => dispatch(resetSendAddress())}
    >
      Restart
    </StyledButton>
  );
}

export default RestartButton;
