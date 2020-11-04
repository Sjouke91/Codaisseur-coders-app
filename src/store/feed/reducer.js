const initialState = {
  loading: true,
  posts: [],
};

export default (state = initialState, { type, payload }) => {
  console.log("this is payload", payload);
  switch (type) {
    case "START_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "POST_FETCHED": {
      return {
        loading: false,
        posts: [...state.posts, ...payload],
      };
    }
    default:
      return state;
  }
};
