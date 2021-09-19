import React from "react";
import { getWords } from "../../utils/addressGenerator";
import sampleQR from "../../utils/sampleQR.png";
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
  margin: -8px;
`;

const QRContainer = styled.div`
  user-select: none;
  width: 80%;
  overflow: hidden;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const TextContainer = styled.div`
  margin: 24px;
`;

const Address = React.forwardRef(({ address }, ref) => {
  const words = address ? getWords(address) : ["", "", "", ""];

  return (
    <Container ref={ref}>
      <QRContainer>
        <img src={sampleQR} alt="QR" />
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
