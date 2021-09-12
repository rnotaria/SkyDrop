import React from "react";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import receiveService from "../../services/receiveService";
import { getAddress } from "../../utils/addressGenerator";
import { useDispatch } from "react-redux";
import { addressNotFound, generalError } from "../../reducers/alertReducer";
import { getZipFromResponse } from "../../utils/fileUtils";
import { addZip } from "../../reducers/receiveFilesReducer";

function FetchButton({ disabled, words, openFileSystem }) {
  const dispatch = useDispatch();
  const address = getAddress(words);

  const fetch = () => {
    receiveService
      .fetchData(address)
      .then((res) => {
        const zipFile = getZipFromResponse(res);
        dispatch(addZip(zipFile));
        openFileSystem();
      })
      .catch((error) => {
        // TODO handle errors
        if (error.response && error.response.status === 400) {
          dispatch(addressNotFound());
        } else {
          dispatch(generalError());
        }
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
