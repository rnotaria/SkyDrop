import React from "react";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import receiveService from "../../services/receiveService";

function FetchButton({ disabled }) {
  const fetch = () => {
    receiveService
      .receive()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Button
      variant="contained"
      disabled={disabled}
      color="primary"
      endIcon={<SearchIcon />}
      onClick={fetch}
    >
      Fetch
    </Button>
  );
}

export default FetchButton;
