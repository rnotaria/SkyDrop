import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import alertReducer from "./reducers/alertReducer";
import dataReducer from "./reducers/dataReducer";
import sendFilesReducer from "./reducers/sendFilesReducer";
import receiveFilesReducer from "./reducers/receiveFilesReducer";

const reducer = combineReducers({
  alerts: alertReducer,
  data: dataReducer,
  sendFiles: sendFilesReducer,
  receiveFiles: receiveFilesReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
