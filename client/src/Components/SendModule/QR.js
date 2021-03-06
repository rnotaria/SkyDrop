import React, { useState } from "react";
import QRCode from "qrcode.react";
import Tooltip from "@mui/material/Tooltip";
import { styled, useTheme } from "@mui/material/styles";

const QRContainer = styled("div")(
  ({ theme }) => `
  margin: 24px;
  width: 50%;
  max-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${theme.palette.border.primary};
  border-radius: 4px;
  padding: 8px;

  svg {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`
);

function QR({ url }) {
  const theme = useTheme();
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
        <QRCode
          value={url}
          renderAs="svg"
          bgColor={theme.palette.background.first}
          fgColor={theme.palette.text.secondary}
        />
      </QRContainer>
    </Tooltip>
  );
}

export default QR;
