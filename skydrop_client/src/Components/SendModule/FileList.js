import React from "react";
import { useDispatch } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { removeFile } from "../../reducers/sendFilesReducer";
import { convertToMB, sanitizeName } from "../../utils/helperFuncs";
import Collapse from "@mui/material/Collapse";
import Fab from "@mui/material/Fab";
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
import { green } from "@mui/material/colors";
import { styled as muiStyled } from "@mui/material/styles";

const StyledListItem = muiStyled(ListItem)({
  "&:hover": {
    backgroundColor: "#F5F5F5",
  },
});

const StyledFab = muiStyled(Fab)(() => ({
  position: "sticky",
  bottom: 16,
  left: 16,
  color: "white",
  backgroundColor: green[500],
  "&:hover": {
    backgroundColor: green[700],
  },
}));

function FileList({ files, openFileDialog }) {
  const dispatch = useDispatch();

  const removeFileByName = (name) => {
    dispatch(removeFile(name));
  };

  return (
    <React.Fragment>
      <List dense={true}>
        <TransitionGroup>
          {files.map((file) => (
            <Collapse key={file.name}>
              <File file={file} removeFileByName={removeFileByName} />
              <Divider variant="fullWidth" component="li" light={true} />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
      <StyledFab onClick={openFileDialog}>
        <AddIcon />
      </StyledFab>
    </React.Fragment>
  );
}

function File({ file, removeFileByName }) {
  return (
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
        <IconButton edge="end" onClick={() => removeFileByName(file.name)}>
          <DeleteIcon color="error" />
        </IconButton>
      </ListItemSecondaryAction>
    </StyledListItem>
  );
}

export default FileList;
