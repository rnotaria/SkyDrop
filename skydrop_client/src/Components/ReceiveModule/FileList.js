import React from "react";
import { convertToMB, sanitizeName } from "../../utils/helperFuncs";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import GetAppIcon from "@material-ui/icons/GetApp";
import { makeStyles } from "@material-ui/core/styles";
import { saveAs } from "file-saver";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
  },
});

function FileList({ files }) {
  const classes = useStyles();

  const downloadFile = (name) => {
    const file = files.find((f) => f.name === name);
    saveAs(file);
  };

  return (
    <List dense={true}>
      {files.map((file) => (
        <React.Fragment key={file.name}>
          <ListItem className={classes.root}>
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
                <GetAppIcon style={{ color: "#03C03C" }} />
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
