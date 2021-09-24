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
    case "ADD_RECEIVE_FILES":
      return {
        ...state,
        files: action.data,
      };
    case "RESET_RECEIVE":
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
    type: "ADD_RECEIVE_FILES",
    data: newFiles,
  };
};

export const resetReceive = () => {
  return {
    type: "RESET_RECEIVE",
  };
};

export default receiveFilesReducer;
