import React from "react";
import { useDispatch } from "react-redux";
import { setReceiveWords } from "../../reducers/dataReducer";
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

function AddressForm({ words }) {
  const dispatch = useDispatch();
  return (
    <Container>
      <Title />
      <InputContainer>
        <InputField
          label={"Word 1"}
          value={words[0]}
          handleChange={(_e, newV) => dispatch(setReceiveWords(newV, 0))}
          focus={!words[0]}
        />
        <InputField
          label={"Word 2"}
          value={words[1]}
          handleChange={(_e, newV) => dispatch(setReceiveWords(newV, 1))}
          focus={words[0] && !words[1]}
        />
        <InputField
          label={"Word 3"}
          value={words[2]}
          handleChange={(_e, newV) => dispatch(setReceiveWords(newV, 2))}
          focus={words[0] && words[1] && !words[2]}
        />
        <InputField
          label={"Word 4"}
          value={words[3]}
          handleChange={(_e, newV) => dispatch(setReceiveWords(newV, 3))}
          focus={words[0] && words[1] && words[2] && !words[3]}
        />
      </InputContainer>
      <FetchButton
        disabled={!(words[0] && words[1] && words[2] && words[3])}
        words={words}
      />
    </Container>
  );
}

export default AddressForm;
