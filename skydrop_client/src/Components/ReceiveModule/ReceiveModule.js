import React, { useState } from "react";
import AddressForm from "./AddressForm";
import FileSystem from "./FileSystem";
import Slide from "@material-ui/core/Slide";

function ReceiveModule() {
  const [showFileSystem, setShowFileSystem] = useState(false);
  return (
    <React.Fragment>
      <AddressForm />
      <Slide in={false} direction="up">
        <FileSystem />
      </Slide>
    </React.Fragment>
  );
}

export default ReceiveModule;
