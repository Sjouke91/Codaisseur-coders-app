import axios from "axios";
import { API_URL } from "../../config";

export function startLoading() {
  return {
    type: "START_LOADING",
  };
}

export function postsFetched(morePosts) {
  return {
    type: "POST_FETCHED",
    payload: morePosts,
  };
}

export async function fetchNext5Posts(dispatch, getState) {
  const data = getState();
  console.log("data", data.feed.posts.length);

  dispatch(startLoading());

  try {
    const res = await axios.get(
      `${API_URL}/posts?offset=${data.feed.posts.length}&limit=5`
    );

    const morePosts = res.data.rows;

    dispatch(postsFetched(morePosts));
  } catch (e) {
    console.log("this is error:", e.message);
  }
}
