import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import alertReducer from "./reducers/alertReducer";
import filesToSendReducer from "./reducers/filesToSendReducer";
import receiveFilesReducer from "./reducers/receiveFilesReducer";

const reducer = combineReducers({
  alerts: alertReducer,
  filesToSend: filesToSendReducer,
  receiveFiles: receiveFilesReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
