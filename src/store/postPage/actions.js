import axios from "axios";
import { API_URL } from "../../config";

export function startLoadingPost() {
  return {
    type: "LOAD_ARTICLE",
  };
}

export function postFullyFetched(data) {
  return {
    type: "FETCHED_ARTICLE",
    payload: data,
  };
}

export function fetchPost(id) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoadingPost());

    const [postResponse, commentsResponse] = await Promise.all([
      axios.get(`${API_URL}/posts/${id}`),
      axios.get(`${API_URL}/posts/${id}/comments`),
    ]);

    dispatch(
      postFullyFetched({
        post: postResponse.data,
        comments: commentsResponse.data,
      })
    );
  };
}

export function addComment(comment, id) {
  return async function thunk(dispatch, getState) {
    const jwt = getState().auth.accessToken;
    console.log("jwt", jwt);
    console.log("comment", comment);

    await axios.post(
      `${API_URL}/posts/${id}/comments`,
      {
        text: comment.message,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  };
}
