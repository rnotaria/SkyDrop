import React from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import { withStyles } from "@material-ui/core/styles";

const DownloadAllButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#03C03C"),
    backgroundColor: "#03C03C",
    "&:hover": {
      backgroundColor: "#00B02C",
    },
  },
}))(Button);

function DownloadAll() {
  return (
    <DownloadAllButton
      style={{ margin: "8px" }}
      variant="contained"
      color="primary"
      startIcon={<GetAppIcon />}
    >
      Download All
    </DownloadAllButton>
  );
}

export default DownloadAll;
