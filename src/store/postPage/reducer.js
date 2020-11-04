const initialState = {
  loading: true,
  post: null,
  comments: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOAD_ARTICLE":
      return { ...state, loading: true };
    case "FETCHED_ARTICLE":
      return {
        loading: false,
        post: payload.post,
        comments: payload.comments,
      };

    default:
      return state;
  }
};
