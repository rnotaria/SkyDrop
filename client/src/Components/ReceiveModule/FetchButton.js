import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addZip, addFiles } from "../../reducers/receiveFilesReducer";
import { resetReceiveWords } from "../../reducers/dataReducer";
import {
  addressNotFound,
  generalError,
  filesRetreived,
  receiveFormIncomplete,
  rateLimit,
} from "../../reducers/alertReducer";
import { getZipFromResponse, getFilesFromZip } from "../../utils/fileUtils";
import receiveService from "../../services/receiveService";
import { getAddress } from "../../utils/addressGenerator";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";

function FetchButton({ words }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const address = getAddress(words);

  const fetch = () => {
    if (words.includes(null)) {
      dispatch(receiveFormIncomplete());
      return;
    }

    setLoading(true);
    receiveService
      .fetchData(address)
      .then((res) => {
        dispatch(filesRetreived());
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
        } else if (error.response.status === 429) {
          dispatch(rateLimit);
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
