import { createStore, combineReducers } from "redux";
import alertReducer from "./reducers/alertReducer";
import filesToSendReducer from "./reducers/filesToSendReducer";

const reducer = combineReducers({
  alerts: alertReducer,
  filesToSend: filesToSendReducer,
});

const store = createStore(reducer);

export default store;
