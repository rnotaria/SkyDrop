import React from "react";
import QR from "./QR";
import { getWords } from "../../utils/addressGenerator";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";
import RestartButton from "./RestartButton";

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  margin: 16px;
`;

const Address = React.forwardRef(({ address }, ref) => {
  const words = address ? getWords(address) : ["", "", "", ""];
  const receiveUrl = window.location.origin + "/receive/" + address;

  return (
    <Container ref={ref}>
      <QR url={receiveUrl} />
      <hr style={{ width: "80%" }} />
      <TextContainer>
        <Typography component={"span"} variant="h5" color="text.secondary">
          <Box
            letterSpacing={2}
            fontWeight="fontWeightBold"
            style={{ userSelect: "none" }}
          >
            ADDRESS
          </Box>
        </Typography>
        <Typography component={"span"} variant="body2" color="text.secondary">
          {words.map((w, i) => (
            <WordWrapper key={i}>
              {i + 1}. {w}
            </WordWrapper>
          ))}
        </Typography>
      </TextContainer>
      <RestartButton />
    </Container>
  );
});

function WordWrapper({ children }) {
  return (
    <Box
      mx={2}
      fontSize="h6.fontSize"
      fontWeight="fontWeightBold"
      textAlign="left"
    >
      {children}
    </Box>
  );
}

export default Address;
