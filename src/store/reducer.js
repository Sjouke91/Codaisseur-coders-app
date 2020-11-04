// src/store/reducer.js
import { combineReducers } from "redux";
import feedReducer from "./feed/reducer";
// import someFeatureReducer from "./someFeature/reducer";

const reducer = combineReducers({
  feed: feedReducer,
});

export default reducer;
