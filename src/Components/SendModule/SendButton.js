import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/SendRounded";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { test } from "../../reducers/alertReducer";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function SendButton() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Box style={{ margin: "24px" }}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
        onClick={() => dispatch(test())}
      >
        Send
      </Button>
    </Box>
  );
}

export default SendButton;
