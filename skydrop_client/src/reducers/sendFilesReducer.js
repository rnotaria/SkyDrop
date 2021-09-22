import { filterDupes } from "../utils/helperFuncs";

const sendFilesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FILES":
      return filterDupes(state, action.data);
    case "REMOVE_FILE":
      return state.filter((f) => f.name !== action.data);
    case "RESET_SEND":
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

export const resetSend = () => {
  return {
    type: "RESET_SEND",
  };
};

export default sendFilesReducer;
