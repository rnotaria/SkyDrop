import React, { useState } from "react";
import

function useAlert() {
  const [type, setType] = useState();


  return [setType, alert]
}

export default useAlert;
