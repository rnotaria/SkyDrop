const initialState = {
  zipFile: null,
  files: [],
};

const receiveFilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ZIP":
      return {
        ...state,
        zipFile: action.data,
      };
    case "ADD_FILES":
      return {
        ...state,
        files: action.data,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const addZip = (zipFile) => {
  return {
    type: "ADD_ZIP",
    data: zipFile,
  };
};

export const addFiles = (newFiles) => {
  return {
    type: "ADD_FILES",
    data: newFiles,
  };
};

export const reset = () => {
  return {
    type: "RESET",
  };
};

export default receiveFilesReducer;
