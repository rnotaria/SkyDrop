import React from "react";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import { styled as muiStyled } from "@mui/material/styles";
import { saveAs } from "file-saver";

const StyledButton = muiStyled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#03C03C"),
  backgroundColor: "#03C03C",
  "&:hover": {
    backgroundColor: "#00B02C",
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
