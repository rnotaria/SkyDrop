import { filterDupes } from "../utils/helperFuncs";

const sendFilesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FILES":
      return filterDupes(state, action.data);
    case "REMOVE_FILE":
      return state.filter((f) => f.name !== action.data);
    case "REMOVE_ALL_FILES":
      return [];
    default:
      return state;
  }
};

export const addFiles = (newFiles) => {
  return {
    type: "ADD_FILES",
    data: newFiles,
  };
};

export const removeFile = (name) => {
  return {
    type: "REMOVE_FILE",
    data: name,
  };
};

export const removeAllFiles = () => {
  return {
    type: "REMOVE_ALL_FILES",
  };
};

export default sendFilesReducer;
