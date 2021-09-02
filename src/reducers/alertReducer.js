const alertReducer = (state = "test", action) => {
  switch (action.type) {
    case "DUPLICATE_FILE_NAME":
      return { ...action.data };
    case "TEST":
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
