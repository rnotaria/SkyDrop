import React, { useState } from "react";
import QRCode from "qrcode.react";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";

const QRContainer = styled.div`
  margin: 24px;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;

function QR({ url }) {
  const [display, setDisplay] = useState("Click to copy");

  const handleClick = () => {
    navigator.clipboard.writeText(url);
    setDisplay("Copied!");
  };

  const handleClose = () => {
    setTimeout(() => {
      setDisplay("Click to copy");
    }, 250);
  };

  return (
    <Tooltip
      title={display}
      arrow
      leaveDelay={250}
      onClick={handleClick}
      onClose={handleClose}
    >
      <QRContainer>
        <QRCode value={url} renderAs="svg" />
      </QRContainer>
    </Tooltip>
  );
}

export default QR;
