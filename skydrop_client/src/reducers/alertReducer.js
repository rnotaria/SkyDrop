import constants from "../utils/constants";
import { convertToMB } from "../utils/helperFuncs";

const alertReducer = (state = null, action) => {
  switch (action.type) {
    case "DUPLICATE_FILE_NAME":
      return { ...action.data };
    case "SIZE_TOO_LARGE":
      return { ...action.data };
    case "TOO_MANY_FILES":
      return { ...action.data };
    case "GENERAL_ERROR":
      return { ...action.data };
    case "RESET":
      return null;
    default:
      return state;
  }
};

export const duplicateFileError = () => {
  return {
    type: "DUPLICATE_FILE_NAME",
    data: {
      message: "File names must be unique!",
      severity: "error",
    },
  };
};

export const sizeTooLarge = () => {
  const maxSize = convertToMB(constants.MAX_UPLOAD_SIZE);
  return {
    type: "SIZE_TOO_LARGE",
    data: {
      message: "Total size cannot exceed " + maxSize + " MB!",
      severity: "error",
    },
  };
};

export const tooManyFiles = () => {
  return {
    type: "TOO_MANY_FILES",
    data: {
      message:
        "The max number of files you can send is " +
        constants.MAX_NUM_OF_FILES +
        "!",
      severity: "error",
    },
  };
};

export const generalError = () => {
  return {
    type: "GENERAL_ERROR",
    data: {
      message: "An error has occured",
      severity: "error",
    },
  };
};

export const test = () => {
  return {
    type: "TEST",
    data: {
      message: "TEST!",
      severity: "error",
    },
  };
};

export const reset = () => {
  return {
    type: "RESET",
  };
};

export default alertReducer;
