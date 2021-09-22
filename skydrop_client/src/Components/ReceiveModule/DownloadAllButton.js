import React from "react";
import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import { green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(
  ({ theme }) => `
  color: white;
  background: ${theme.palette.mode === "light" ? green[500] : green[700]};
  &:hover {
    background: ${theme.palette.mode === "light" ? green[700] : green[900]};
  }

  `
);

function DownloadAllButton({ zipFile }) {
  return (
    <StyledButton
      style={{ margin: "8px" }}
      variant="contained"
      startIcon={<GetAppIcon />}
      onClick={() => saveAs(zipFile)}
    >
      Download All
    </StyledButton>
  );
}

export default DownloadAllButton;
