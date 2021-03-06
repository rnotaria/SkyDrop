import React from "react";
import { useDispatch } from "react-redux";
import { setReceiveWords } from "../../reducers/dataReducer";
import FetchButton from "./FetchButton";
import InputField from "./InputField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Title() {
  return (
    <Typography component={"span"} variant="h5" color="text.secondary">
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

const AddressForm = React.forwardRef(({ words }, ref) => {
  const dispatch = useDispatch();

  return (
    <Container ref={ref}>
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
      <FetchButton words={words} />
    </Container>
  );
});

export default AddressForm;
