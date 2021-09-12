const receiveFilesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ZIP":
      return {
        ...state,
        zipFile: action.data,
      };
    case "ADD_FILEs":
      return {
        ...state,
        files: [...state.files, ...action.data],
      };
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
    type: "ADD_FILE",
    data: newFiles,
  };
};

export default receiveFilesReducer;
