import React from "react";
import sampleQR from "../../utils/sampleQR.png";
import styled from "styled-components";
import Collapse from "@material-ui/core/Collapse";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QRContainer = styled.div`
  width: 80%;
  overflow: hidden;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const TextContainer = styled.div`
  margin: 50px;
`;

function Address() {
  return (
    <Slide in={true} direction="up">
      <Container>
        <QRContainer>
          <img src={sampleQR} alt="QR" />{" "}
        </QRContainer>
        <hr style={{ width: "80%" }} />
        <TextContainer>
          <Typography component={"span"}>
            <Box
              letterSpacing={2}
              fontFamily="sans-serif"
              textAlign="center"
              fontSize="h5.fontSize"
              fontWeight="fontWeightBold"
            >
              Address
            </Box>
          </Typography>
          <Typography variant="h4">
            <TextWrapper>1. weather</TextWrapper>
            <TextWrapper>2. volume</TextWrapper>
            <TextWrapper>3. stadium</TextWrapper>
          </Typography>
        </TextContainer>
      </Container>
    </Slide>
  );
}

function TextWrapper({ children }) {
  return (
    <Box
      fontFamily="sans-serif"
      m={1}
      fontSize="h6.fontSize"
      fontWeight="fontWeightBold"
      textAlign="left"
    >
      {children}
    </Box>
  );
}

export default Address;
