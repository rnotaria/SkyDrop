import React from "react";
import { convertToMB, sanitizeName } from "../../utils/helperFuncs";
import { saveAs } from "file-saver";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import GetAppIcon from "@mui/icons-material/GetApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { green, lightBlue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const StyledListItem = styled(ListItem)(
  ({ theme }) => `
  &:hover {
    background: ${theme.palette.background.third};
  }
`
);

function FileList({ files }) {
  const downloadFile = (name) => {
    const file = files.find((f) => f.name === name);
    saveAs(file);
  };

  return (
    <List dense={true} style={{ marginTop: "-8px" }}>
      {files.map((file) => (
        <React.Fragment key={file.name}>
          <File file={file} downloadFile={downloadFile} />
          <Divider variant="fullWidth" component="li" light={true} />
        </React.Fragment>
      ))}
    </List>
  );
}

function File({ file, downloadFile, isImage = false }) {
  return (
    <StyledListItem>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={sanitizeName(file.name)}
        primaryTypographyProps={{ color: "text.primary" }}
        secondary={convertToMB(file.size).toFixed(2) + " MB"}
        secondaryTypographyProps={{ color: "text.secondary" }}
      />
      <ListItemSecondaryAction>
        {isImage ? (
          <IconButton edge="end" style={{ marginRight: "0px" }}>
            <Tooltip title={"View Image"} arrow>
              <VisibilityIcon style={{ color: lightBlue[500] }} />
            </Tooltip>
          </IconButton>
        ) : null}
        <IconButton edge="end" onClick={() => downloadFile(file.name)}>
          <Tooltip title={"Download"} arrow>
            <GetAppIcon style={{ color: green[500] }} />
          </Tooltip>
        </IconButton>
      </ListItemSecondaryAction>
    </StyledListItem>
  );
}

export default FileList;
