import React, { useState } from "react";
import FetchButton from "./FetchButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styled from "styled-components";
import { wordMap } from "../../utils/wordMap";

const wordList = wordMap.keys();

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  margin-bottom: 48px;
`;

function AddressForm() {
  return (
    <Container>
      <Title />
      <InputContainer>
        <InputField />
        <InputField />
        <InputField />
        <InputField />
      </InputContainer>
      <FetchButton />
    </Container>
  );
}

function Title() {
  return (
    <Typography component={"span"} variant="h5" color="textSecondary">
      <Box
        letterSpacing={2}
        fontWeight="fontWeightBold"
        style={{ userSelect: "none" }}
      >
        ADDRESS
      </Box>
    </Typography>
  );
}

function InputField() {
  return (
    <Autocomplete
      style={{ width: 250, marginBottom: "12px" }}
      options={wordList}
      autoHighlight
      renderInput={(params) => (
        <TextField
          {...params}
          label="Word 1"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default AddressForm;
