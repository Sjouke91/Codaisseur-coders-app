// src/store/reducer.js
import { combineReducers } from "redux";
import feedReducer from "./feed/reducer";
import postPageSliceReducer from "./postPage/reducer";

const reducer = combineReducers({
  feed: feedReducer,
  postPage: postPageSliceReducer,
});

export default reducer;
