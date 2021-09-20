import React from "react";
import { getWords } from "../../utils/addressGenerator";
import QRCode from "qrcode.react";
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
  background: white;
`;

const QRContainer = styled.div`
  height: 80%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 80%;
    height: 80%;
  }
`;

const TextContainer = styled.div`
  margin: 24px;
`;

const Address = React.forwardRef(({ address }, ref) => {
  const words = address ? getWords(address) : ["", "", "", ""];
  const qrCode = window.location.origin + "/receive/" + address;

  return (
    <Container ref={ref}>
      <QRContainer>
        <QRCode value={qrCode} renderAs="svg" />
      </QRContainer>
      <hr style={{ width: "80%" }} />
      <TextContainer>
        <Typography component={"span"} variant="h5" color="textSecondary">
          <Box
            letterSpacing={2}
            fontWeight="fontWeightBold"
            style={{ userSelect: "none" }}
          >
            ADDRESS
          </Box>
        </Typography>
        <Typography component={"span"} variant="body2" color="textSecondary">
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
