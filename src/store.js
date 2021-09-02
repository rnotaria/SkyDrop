import { createStore, combineReducers } from "redux";
import alertReducer from "./reducers/alertReducer";

const reducer = combineReducers({
  alerts: alertReducer,
});

const store = createStore(reducer);

export default store;
