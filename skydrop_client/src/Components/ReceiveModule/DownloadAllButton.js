import React from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import { withStyles } from "@material-ui/core/styles";
import { saveAs } from "file-saver";

const DownloadAll = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#03C03C"),
    backgroundColor: "#03C03C",
    "&:hover": {
      backgroundColor: "#00B02C",
    },
  },
}))(Button);

function DownloadAllButton({ zipFile }) {
  return (
    <DownloadAll
      style={{ margin: "8px" }}
      variant="contained"
      color="primary"
      startIcon={<GetAppIcon />}
      onClick={() => saveAs(zipFile)}
    >
      Download All
    </DownloadAll>
  );
}

export default DownloadAllButton;
