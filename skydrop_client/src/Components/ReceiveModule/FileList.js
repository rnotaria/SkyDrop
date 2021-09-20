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
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import GetAppIcon from "@mui/icons-material/GetApp";
import { green } from "@mui/material/colors";
import { styled as muiStyled } from "@mui/material/styles";

const StyledListItem = muiStyled(ListItem)({
  "&:hover": {
    backgroundColor: "#F5F5F5",
  },
});

function FileList({ files }) {
  const downloadFile = (name) => {
    const file = files.find((f) => f.name === name);
    saveAs(file);
  };

  return (
    <List dense={true}>
      {files.map((file) => (
        <React.Fragment key={file.name}>
          <StyledListItem>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={sanitizeName(file.name)}
              secondary={convertToMB(file.size).toFixed(2) + " MB"}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => downloadFile(file.name)}>
                <GetAppIcon style={{ color: green[500] }} />
              </IconButton>
            </ListItemSecondaryAction>
          </StyledListItem>
          <Divider variant="fullWidth" component="li" light={true} />
        </React.Fragment>
      ))}
    </List>
  );
}

export default FileList;
