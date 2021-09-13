import React, { useState } from "react";
import FetchButton from "./FetchButton";
import InputField from "./InputField";
import { wordMap } from "../../utils/wordMap";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

export const wordList = wordMap.keys();

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 60px;
`;

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

function AddressForm({ openFileSystem }) {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const words = [value1, value2, value3, value4];

  return (
    <Container>
      <Title />
      <InputContainer>
        <InputField
          label={"Word 1"}
          value={value1}
          handleChange={(_e, newV) => setValue1(newV)}
          focus={!value1}
        />
        <InputField
          label={"Word 2"}
          value={value2}
          handleChange={(_e, newV) => setValue2(newV)}
          focus={value1 && !value2}
        />
        <InputField
          label={"Word 3"}
          value={value3}
          handleChange={(_e, newV) => setValue3(newV)}
          focus={value1 && value2 && !value3}
        />
        <InputField
          label={"Word 4"}
          value={value4}
          handleChange={(_e, newV) => setValue4(newV)}
          focus={value1 && value2 && value3 && !value4}
        />
      </InputContainer>
      <FetchButton
        disabled={!(value1 && value2 && value3 && value4)}
        words={words}
        openFileSystem={openFileSystem}
      />
    </Container>
  );
}

export default AddressForm;
