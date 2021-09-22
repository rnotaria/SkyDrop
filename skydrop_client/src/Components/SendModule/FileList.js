import React from "react";
import { useDispatch } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { removeFile } from "../../reducers/sendFilesReducer";
import { convertToMB, sanitizeName } from "../../utils/helperFuncs";
import Collapse from "@mui/material/Collapse";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const StyledListItem = styled(ListItem)(
  ({ theme }) => `
  &:hover {
    background: ${theme.palette.background.third};
  }
`
);

const AddFilesButton = styled(Fab)(
  ({ theme }) => `
  position: sticky;
  bottom: 16px;
  left: 16px;
  color: white;
  background: ${theme.palette.mode === "light" ? green[500] : green[700]};
  &:hover {
    background: ${theme.palette.mode === "light" ? green[700] : green[500]};
  }
`
);

function FileList({ files, openFileDialog }) {
  const dispatch = useDispatch();

  const removeFileByName = (name) => {
    dispatch(removeFile(name));
  };

  return (
    <React.Fragment>
      <List dense={true} style={{ marginTop: "-8px" }}>
        <TransitionGroup>
          {files.map((file) => (
            <Collapse key={file.name}>
              <File file={file} removeFileByName={removeFileByName} />
              <Divider variant="fullWidth" component="li" light={true} />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
      <Tooltip title={"Add file"} arrow>
        <AddFilesButton onClick={openFileDialog}>
          <AddIcon />
        </AddFilesButton>
      </Tooltip>
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
        primaryTypographyProps={{ color: "text.primary" }}
        secondary={convertToMB(file.size).toFixed(2) + " MB"}
        secondaryTypographyProps={{ color: "text.secondary" }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => removeFileByName(file.name)}>
          <Tooltip title={"Remove"} arrow>
            <DeleteIcon color="error" />
          </Tooltip>
        </IconButton>
      </ListItemSecondaryAction>
    </StyledListItem>
  );
}

export default FileList;
