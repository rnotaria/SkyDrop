import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addZip, addFiles } from "../../reducers/receiveFilesReducer";
import { addressNotFound, generalError } from "../../reducers/alertReducer";
import { getZipFromResponse, getFilesFromZip } from "../../utils/fileUtils";
import receiveService from "../../services/receiveService";
import { getAddress } from "../../utils/addressGenerator";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
`;

function FetchButton({ disabled, words, openFileSystem }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const address = getAddress(words);

  const fetch = () => {
    setLoading(true);
    receiveService
      .fetchData(address)
      .then((res) => {
        const zipFile = getZipFromResponse(res);
        dispatch(addZip(zipFile));
        getFilesFromZip(zipFile).then((files) => {
          dispatch(addFiles(files));
          openFileSystem();
          setLoading(false);
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          dispatch(addressNotFound());
        } else {
          dispatch(generalError());
        }
        setLoading(false);
        return;
      });
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          disabled={disabled}
          color="primary"
          endIcon={<SearchIcon />}
          onClick={fetch}
        >
          Fetch
        </Button>
      )}
    </Container>
  );
}

export default FetchButton;
