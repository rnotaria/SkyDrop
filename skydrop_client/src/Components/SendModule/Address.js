import React from "react";
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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function Address({ active, setActive }) {
  const classes = useStyles();

  return (
    <Slide in={active} direction="up">
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
            <TextWrapper>4. zebra</TextWrapper>
          </Typography>
        </TextContainer>
        <Button
          style={{ margin: "24px" }}
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<LoopIcon />}
          onClick={() => setActive(false)}
        >
          Restart
        </Button>
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
