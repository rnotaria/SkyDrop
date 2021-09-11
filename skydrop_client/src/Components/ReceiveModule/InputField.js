import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { wordList } from "./AddressForm";

function InputField({ label, value, handleChange }) {
  return (
    <Autocomplete
      style={{ width: 250, marginBottom: "12px" }}
      value={value}
      onChange={handleChange}
      options={wordList}
      autoHighlight
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default InputField;
