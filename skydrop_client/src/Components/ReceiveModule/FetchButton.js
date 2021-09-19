import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addZip, addFiles } from "../../reducers/receiveFilesReducer";
import { resetReceiveWords } from "../../reducers/dataReducer";
import { addressNotFound, generalError } from "../../reducers/alertReducer";
import { getZipFromResponse, getFilesFromZip } from "../../utils/fileUtils";
import receiveService from "../../services/receiveService";
import { getAddress } from "../../utils/addressGenerator";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";

function FetchButton({ disabled, words }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const address = getAddress(words);

  const fetch = () => {
    setLoading(true);
    receiveService
      .fetchData(address)
      .then((res) => {
        dispatch(resetReceiveWords());
        const zipFile = getZipFromResponse(res);
        dispatch(addZip(zipFile));
        getFilesFromZip(zipFile).then((files) => {
          dispatch(addFiles(files));
          setLoading(false);
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          dispatch(addressNotFound());
        } else {
          dispatch(generalError());
        }
        setLoading(false);
        return;
      });
  };

  return (
    <LoadingButton
      style={{ marginBottom: "24px" }}
      disabled={disabled}
      variant="contained"
      endIcon={<SearchIcon />}
      onClick={fetch}
      loading={loading}
      loadingPosition="end"
    >
      Fetch
    </LoadingButton>
  );
}

export default FetchButton;
