import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import alertReducer from "./reducers/alertReducer";
import sendFilesReducer from "./reducers/sendFilesReducer";
import receiveFilesReducer from "./reducers/receiveFilesReducer";

const reducer = combineReducers({
  alerts: alertReducer,
  sendFiles: sendFilesReducer,
  receiveFiles: receiveFilesReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
