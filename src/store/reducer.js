// src/store/reducer.js
import { combineReducers } from "redux";
import feedReducer from "./feed/reducer";
import postPageSliceReducer from "./postPage/reducer";
import authSliceReducer from "./Auth/reducer";

const reducer = combineReducers({
  feed: feedReducer,
  postPage: postPageSliceReducer,
  auth: authSliceReducer,
});

export default reducer;
