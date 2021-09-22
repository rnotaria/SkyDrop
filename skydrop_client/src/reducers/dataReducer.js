const initialState = {
  sendAddress: null,
  receiveWords: [null, null, null, null],
  theme: true,
};

const sendFilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEND_ADDRESS":
      return {
        ...state,
        sendAddress: action.data,
      };
    case "RESET_SEND_ADDRESS":
      return {
        ...state,
        sendAddress: null,
      };
    case "SET_RECEIVE_WORDS":
      const newWords = [...state.receiveWords];
      newWords[action.data.index] = action.data.word;
      return {
        ...state,
        receiveWords: newWords,
      };
    case "SET_ALL_RECEIVE_WORDS":
      return {
        ...state,
        receiveWords: action.data,
      };
    case "RESET_RECEIVE_WORDS":
      return {
        ...state,
        receiveWords: [null, null, null, null],
      };
    case "RESET_ALL":
      return {
        ...state,
        sendAddress: initialState.sendAddress,
        receiveWords: initialState.receiveWords,
      };
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: !state.theme,
      };
    default:
      return state;
  }
};

export const setSendAddress = (address) => {
  return {
    type: "SET_SEND_ADDRESS",
    data: address,
  };
};

export const resetSendAddress = () => {
  return {
    type: "RESET_SEND_ADDRESS",
  };
};

export const setReceiveWords = (word, index) => {
  return {
    type: "SET_RECEIVE_WORDS",
    data: { word, index },
  };
};

export const setAllReceiveWords = (words) => {
  return {
    type: "SET_ALL_RECEIVE_WORDS",
    data: words,
  };
};

export const resetReceiveWords = () => {
  return {
    type: "RESET_RECEIVE_WORDS",
  };
};

export const resetAll = () => {
  return {
    type: "RESET_ALL",
  };
};

export const toggleTheme = () => {
  return {
    type: "TOGGLE_THEME",
  };
};

export default sendFilesReducer;
