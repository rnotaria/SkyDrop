import { getWords } from "../utils/addressGenerator";

const dataReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return { ...state, address: action.data };
    case "RESET":
      return null;
    default:
      return state;
  }
};

export const setAddress = (address) => {
  return {
    type: "SET_ADDRESS",
    data: getWords(address),
  };
};

export const reset = () => {
  return {
    type: "RESET",
  };
};

export default dataReducer;
