import React from "react";
import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import { green } from "@mui/material/colors";
import { styled as muiStyled } from "@mui/material/styles";

const StyledButton = muiStyled(Button)(() => ({
  color: "white",
  backgroundColor: green[500],
  "&:hover": {
    backgroundColor: green[700],
  },
}));

function DownloadAllButton({ zipFile }) {
  return (
    <StyledButton
      style={{ margin: "8px" }}
      variant="contained"
      color="primary"
      startIcon={<GetAppIcon />}
      onClick={() => saveAs(zipFile)}
    >
      Download All
    </StyledButton>
  );
}

export default DownloadAllButton;
