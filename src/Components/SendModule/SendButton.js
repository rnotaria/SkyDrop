import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/SendRounded";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function SendButton() {
  const classes = useStyles();

  return (
    <Box style={{ margin: "24px" }}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Box>
  );
}

export default SendButton;
