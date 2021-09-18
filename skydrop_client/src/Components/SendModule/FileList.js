import React from "react";
import { useDispatch } from "react-redux";
import { removeFile } from "../../reducers/sendFilesReducer";
import { convertToMB, sanitizeName } from "../../utils/helperFuncs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { styled as muiStyled } from "@mui/material/styles";

function AddFile({ openFileDialog }) {
  return (
    <React.Fragment>
      <ListItem
        button
        style={{ alignItems: "center", justifyContent: "center" }}
        onClick={openFileDialog}
      >
        <ListItemAvatar style={{ minWidth: 0 }}>
          <Avatar style={{ background: "#03C03C" }}>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
      </ListItem>
      <Divider variant="fullWidth" component="li" light={true} />
    </React.Fragment>
  );
}

const StyledListItem = muiStyled(ListItem)({
  "&:hover": {
    backgroundColor: "#F5F5F5",
  },
});

function FileList({ files, openFileDialog }) {
  const dispatch = useDispatch();

  const removeFileByName = (name) => {
    setTimeout(() => {
      dispatch(removeFile(name));
    }, 350);
  };

  return (
    <List dense={true}>
      <AddFile openFileDialog={openFileDialog} />
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
              <IconButton
                edge="end"
                onClick={() => removeFileByName(file.name)}
              >
                <DeleteIcon color="error" />
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
