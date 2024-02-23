import { combineReducers, createStore } from "redux";
import { customeReducer } from "./customReducers";

const rootReducer = combineReducers({
  customers: customeReducer,
});

export const store = createStore(rootReducer);
