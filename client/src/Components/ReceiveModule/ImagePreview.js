import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

// For some reason, fade out doesn't work with Mui styled but styled-components works...?
const ImageContainer = styled.div`
  position: fixed;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  max-width: 50vw;
  max-height: 50vh;
  user-select: none;

  img {
    max-width: 50vw;
    max-height: 50vh;
    object-fit: contain;
  }
`;

function ImagePreview({ image, resetImage }) {
  const [open, setOpen] = useState(false);
  const delay = 500;

  useEffect(() => {
    if (image) {
      setOpen(true);
    }
  }, [image]);

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      resetImage();
    }, delay);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: delay,
      }}
    >
      <Fade in={open} timeout={{ enter: delay, exit: delay }}>
        <ImageContainer>
          <img src={image ? URL.createObjectURL(image) : ""} alt="file" />
        </ImageContainer>
      </Fade>
    </Modal>
  );
}

export default ImagePreview;
