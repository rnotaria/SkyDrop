const initialState = {
  sendAddress: null,
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
    case "SET_RECEIVE_ADDRESS":
      return {
        ...state,
        receiveAddress: action.data,
      };
    case "RESET_RECEIVE_ADDRESS":
      return {
        ...state,
        receiveAddress: null,
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

export default sendFilesReducer;
