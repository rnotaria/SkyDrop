import React from "react";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

function FetchButton({ disabled }) {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      color="primary"
      endIcon={<SearchIcon />}
    >
      Fetch
    </Button>
  );
}

export default FetchButton;
