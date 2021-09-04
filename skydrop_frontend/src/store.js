import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import alertReducer from "./reducers/alertReducer";
import filesToSendReducer from "./reducers/filesToSendReducer";

const reducer = combineReducers({
  alerts: alertReducer,
  filesToSend: filesToSendReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
