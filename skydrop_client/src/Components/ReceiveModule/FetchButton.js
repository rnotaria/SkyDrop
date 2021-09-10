import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

function FetchButton() {
  return (
    <Button variant="contained" color="primary" endIcon={<SearchIcon />}>
      Fetch
    </Button>
  );
}

export default FetchButton;
