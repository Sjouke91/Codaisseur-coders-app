import axios from "axios";

export function startLoading() {
  console.log("got here 2");
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
  console.log("i got here 1");

  const data = getState();

  const API_URL = `https://codaisseur-coders-network.herokuapp.com`;
  dispatch(startLoading());
  console.log("this is state", data);

  try {
    const res = await axios.get(
      `${API_URL}/posts?offset=${data.feed.posts.length}&limit=5`
    );

    const morePosts = res.data.rows;

    dispatch(postsFetched(morePosts));
    console.log("this is moreposts", morePosts);
  } catch (e) {
    console.log("this is error:", e.message);
  }
}
