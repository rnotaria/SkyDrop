import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/SendRounded";
import { makeStyles } from "@material-ui/core/styles";
import { getTotalSize } from "../../utils/helperFuncs";
import constants from "../../utils/constants";
import { useDispatch } from "react-redux";
import {
  missingFiles,
  sizeTooLarge,
  tooManyFiles,
} from "../../reducers/alertReducer";
import sendService from "../../services/sendService";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function SendButton({ files }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const send = () => {
    sendService.testGet().then((res) => {
      console.log(res);
    });

    if (files.length < 1) {
      dispatch(missingFiles());
      return;
    }

    const size = getTotalSize(files);
    if (size > constants.MAX_UPLOAD_SIZE) {
      dispatch(sizeTooLarge());
      return;
    }

    if (files.length > constants.MAX_NUM_OF_FILES) {
      dispatch(tooManyFiles());
      return;
    }
  };

  return (
    <Box style={{ margin: "24px" }}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
        onClick={send}
      >
        Send
      </Button>
    </Box>
  );
}

export default SendButton;
