import React, { useState } from "react";
import FetchButton from "./FetchButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { wordMap } from "../../utils/wordMap";
import InputField from "./InputField";

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

function AddressForm() {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);

  return (
    <Container>
      <Title />
      <InputContainer>
        <InputField
          label={"Word 1"}
          value={value1}
          handleChange={(_e, newV) => setValue1(newV)}
        />
        <InputField
          label={"Word 2"}
          value={value2}
          handleChange={(_e, newV) => setValue2(newV)}
        />
        <InputField
          label={"Word 3"}
          value={value3}
          handleChange={(_e, newV) => setValue3(newV)}
        />
        <InputField
          label={"Word 4"}
          value={value4}
          handleChange={(_e, newV) => setValue4(newV)}
        />
      </InputContainer>
      <FetchButton />
    </Container>
  );
}

export default AddressForm;
