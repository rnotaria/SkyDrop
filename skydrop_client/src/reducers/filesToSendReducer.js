import { filterDupes } from "../utils/helperFuncs";

const filesToSendReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FILES_TO_SEND":
      return filterDupes(state, action.data);
    case "REMOVE_FILE_TO_SEND":
      return state.filter((f) => f.name !== action.data);
    case "REMOVE_ALL_FILES_TO_SEND":
      return [];
    default:
      return state;
  }
};

export const addFilesToSend = (newFiles) => {
  return {
    type: "ADD_FILES_TO_SEND",
    data: newFiles,
  };
};

export const removeFileToSend = (name) => {
  return {
    type: "REMOVE_FILE_TO_SEND",
    data: name,
  };
};

export const removeAllFilesToSend = () => {
  return {
    type: "REMOVE_ALL_FILES_TO_SEND",
  };
};

export default filesToSendReducer;
