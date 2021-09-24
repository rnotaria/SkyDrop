import React, { useState, useMemo } from "react";
import { wordList } from "../../utils/wordMap";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filterOptions = createFilterOptions({
  matchFrom: "start",
});

function InputField({ label, value, handleChange, focus }) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // To prevent opening autocomplete for all inputfields when switching tabs
  const initialValue = useMemo(
    () => value,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleInputChange = (_e, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue !== initialValue && newInputValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <Autocomplete
      autoHighlight // Highlights the first option in the rendered list
      autoSelect // selects highlighted entry when blurred
      blurOnSelect // Blurs text field when selecting an option
      filterOptions={filterOptions} // Filters by alphabetical order
      forcePopupIcon={false}
      open={open} // opens only when input>0 for better performance
      onClose={() => setOpen(false)}
      // # # # # # # # # # # # # # # # # # # # # # # # #
      style={{ width: 250, marginBottom: "12px" }}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={wordList}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{ ...params.inputProps }}
          inputRef={(input) => input && focus && input.focus()}
        />
      )}
    />
  );
}

export default InputField;
