import React from "react";
import { getWords } from "../../utils/addressGenerator";
import sampleQR from "../../utils/sampleQR.png";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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

function Address({ address }) {
  const words = getWords(address);

  return (
    <Slide in={address ? true : false} direction="up">
      <Container>
        <QRContainer>
          <img src={sampleQR} alt="QR" />{" "}
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
    </Slide>
  );
}

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
