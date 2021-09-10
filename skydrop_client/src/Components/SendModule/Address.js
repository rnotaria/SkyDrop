import React from "react";
import { getWords } from "../../utils/addressGenerator";
import sampleQR from "../../utils/sampleQR.png";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";
import { makeStyles } from "@material-ui/core/styles";

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

function Address({ address, isActive, close }) {
  const words = getWords(address);

  return (
    <Slide in={isActive} direction="up">
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
        <Restart close={close} />
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

function Restart({ close }) {
  return (
    <Button
      style={{ margin: "24px", marginBottom: "48px" }}
      variant="contained"
      color="default"
      startIcon={<LoopIcon />}
      onClick={() => close()}
    >
      Restart
    </Button>
  );
}

export default Address;
