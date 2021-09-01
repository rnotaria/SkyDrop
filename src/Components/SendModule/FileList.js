import React from "react";
import { convertToMB, removeFile } from "../../utils/helperFuncs";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

function AddFile({ openFileDialog }) {
  return (
    <React.Fragment>
      <ListItem
        button
        style={{ alignItems: "center", justifyContent: "center" }}
        onClick={() => {
          openFileDialog();
        }}
      >
        <ListItemAvatar style={{ minWidth: 0 }}>
          <Avatar style={{ background: "#32de84" }}>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
      </ListItem>
      <Divider variant="fullWidth" component="li" light={true} />
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
  },
});

function FileList({ files, setFiles, openFileDialog }) {
  const classes = useStyles();

  return (
    <List dense={true}>
      <AddFile openFileDialog={openFileDialog} />
      {files.map((file) => (
        <React.Fragment key={file.name}>
          <ListItem className={classes.root}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={file.name}
              secondary={convertToMB(file.size).toFixed(2) + " MB"}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  setFiles(removeFile(files, file.name));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="fullWidth" component="li" light={true} />
        </React.Fragment>
      ))}
    </List>
  );
}

export default FileList;
